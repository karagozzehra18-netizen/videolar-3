#!/usr/bin/env python3
"""paylasim_kiti.py — Karabasan serisinin paylaşım metinlerini (profil + 5 part × 3 platform) tek kaynaktan üretir.
Kullanım: python3 bolumler/seri-karabasan/paylasim_kiti.py <html_cikti_yolu>
Çıktı  : bolumler/seri-karabasan/paylasim-metinleri.md (depoda) + kopyala düğmeli HTML sayfa (Artifact olarak yayımlanır)."""
import base64, html, io, json, sys
from pathlib import Path
from PIL import Image

S = Path(__file__).resolve().parent
SORU = {n: json.load(open(S / f"part{n}/bolum.json"))["bitis"]["soru"] for n in range(1, 6)}

PROFIL = [
  ("Instagram · Ad alanı (aramada çıkar, en fazla 30)", "Duyma Sakın · Korku Hikâyeleri", 30),
  ("Instagram · Biyografi (en fazla 150)", "Kodla çizilmiş korku hikâyeleri 🎧\nHer hikâye 5 part · Şimdi: Karabasan\nKulaklığını tak. Işığı kapatma.", 150),
  ("TikTok · Biyografi (en fazla 80)", "Kodla çizilmiş korku hikâyeleri 🎧 5 partlık seriler. Işığı kapatma.", 80),
  ("YouTube · Kanal açıklaması", "Kulaklığını tak. Işığı kapatma.\n\nDuyma Sakın'da korku hikâyeleri dakikalık partlarla anlatılır: Anadolu'nun eski anlatıları, şehir efsaneleri ve hâlâ açıklanamayan olaylar. Her sahne kodla, tek tek çizilmiş animasyon; her seri farklı bir görsel tarzda.\n\nŞimdi yayında: Karabasan (5 part). Partları sırayla izlemek için \"Karabasan\" oynatma listesine bak.\n\nHikâyelerde geçen bilgileri kaynaklarıyla veriyoruz; kesin olmayana \"anlatılır\" diyoruz. Kan, vahşet ya da gerçek kişileri hedef alan içerik yok.\n\nAbone ol, bildirimleri aç. Bir sonraki partı kaçırma.", 1000),
]

P = {
 1: dict(yt="Gece uyandın ve kımıldayamıyorsun | Karabasan Part 1",
   ozet="Sınavlardan kaçıp köydeki babaannenin evine geldin. İlk gece göğsüne bir ağırlık çöktü… ve aynada bir şey gördün.",
   ig="Gece uyandın ve kımıldayamıyorsun…\nBabaannenin evindeki ilk gece, aynada bir şey vardı."),
 2: dict(yt="Babaannen tek kelime söyledi: Karabasan | Part 2",
   ozet="Babaannen eski sandığından bir muska çıkardı. O gece koridordan biri adını fısıldadı. Ama babaannen yan odada uyuyordu.",
   ig="Babaannen tek kelime söyledi: Karabasan.\nO gece koridordan biri adını fısıldadı…"),
 3: dict(yt="Babaannenin gölgesi ayaktaydı | Karabasan Part 3",
   ozet="Koridora çıktın. Babaannen yorganına sarılmış uyuyordu. Ama duvardaki gölgesi ayaktaydı.",
   ig="Babaannen uyuyordu.\nAma duvardaki gölgesi ayaktaydı…"),
 4: dict(yt="Doktor açıkladı ama o gece onu net gördün | Karabasan Part 4",
   ozet="Doktor buna uyku felci dedi: beyin uyanır, beden bir süre rüyadaki gibi kımıldamaz. Sen de muskayı çekmeceye koydun. Sonra gece yarısı…",
   ig="Doktor buna uyku felci dedi.\nSen de muskayı çekmeceye koydun. Sonra gece yarısı…"),
 5: dict(yt="Muskayı yastığının altına kim koydu? | Karabasan Part 5 (Final)",
   ozet="Doktorun sözünü hatırladın: önce küçük bir parmak, sonra yavaş bir nefes. Ama kahvaltıda babaannen bambaşka bir şey söyledi.",
   ig="Önce küçük bir parmak, sonra yavaş bir nefes…\nAma kahvaltıda babaannen bambaşka bir şey söyledi."),
}
KAYNAK = ("Bu bir kurgudur; uyku felcine dair bilgiler kaynaklıdır:\n"
          "- Sharpless & Barber (2011), uyku felci yaygınlığı\n- Denis ve ark. (2018), uyku felciyle ilişkili etkenler\n"
          "- Türkiye'de karabasan inancı üzerine çalışmalar (Transcultural Psychiatry, 2020; Hallaç & Yıldırım)")

def metinler(n):
    p = P[n]; soru = SORU[n]
    devam = f"Part {n + 1} için takip et" if n < 5 else "Serinin tamamı profilde"
    nav = ("Seri 5 parttan oluşur; sıradaki partlar profilde ve \"Karabasan\" oynatma listesinde." if n == 1
           else f"Önceki partlar profilde ve \"Karabasan\" oynatma listesinde. Bu, {n}. part.")
    yt_ac = f"{p['ozet']}\n\n{soru} Yorumlara yaz.\n\n{nav}\n\n{KAYNAK}\n\nKulaklığını tak. Işığı kapatma. — Duyma Sakın\n\n#karabasan #korku #hikaye"
    etiket = f"karabasan, uyku felci, korku hikayesi, kısa korku, anadolu efsaneleri, babaanne, muska, gece, karabasan part {n}, duyma sakın"
    sabit = f"{soru} 👇 Cevabını yaz. ({devam})"
    ig = f"{p['ig']}\n\n{soru} Yorumlara yaz 👇\n{devam}: @duymasakin\n\nKarabasan · Part {n}/5\n\n#karabasan #korkuhikayesi #uykufelci #korku #hikaye"
    tt = f"Karabasan · Part {n}/5 — {soru} 👇 #karabasan #korkuhikayesi #uykufelci #korku #hikaye"
    return [("YouTube · Başlık (emoji ve #shorts yok)", p["yt"], 100), ("YouTube · Açıklama", yt_ac, 5000),
            ("YouTube · Etiketler", etiket, 500), ("Instagram Reels · Açıklama", ig, 2200),
            ("TikTok · Açıklama", tt, 2200), ("Sabit yorum (üç platformda)", sabit, 500)]

ADIMLAR = [
  ("Sıra", "Part 1'den başla, her güne tek part. Instagram ızgarasında en yeni en üstte durur; kapaklar bu yüzden sırayla 5 → 1 okunacak şekilde tasarlandı."),
  ("Instagram Reels", "Videoyu seç → \"Kapağı düzenle\" → \"Film rulosundan ekle\" → partın kapak.jpg dosyası. \"Profil ızgarası\" önizlemesinde 3:4 kırpımı gör; kapaklar bu kırpıma göre hazırlandı. \"Reels'i ana ızgarada göster\" açık kalsın."),
  ("YouTube Shorts", "Uygulamadan yüklerken kapak için videodan bir kare seçebilirsin; hesabında özel kapak/küçük resim seçeneği görünüyorsa kapak.jpg dosyasını seç. Beş partı \"Karabasan\" adlı bir oynatma listesine ekle."),
  ("TikTok", "\"Kapağı seç\" ekranında videodan kare seçilir; sürümüne göre \"Yükle\" seçeneği varsa kapak.jpg dosyasını kullan."),
  ("Üç platformda", "\"AI ile oluşturulmuş içerik\" etiketini açma (animasyon kodla çizildi). Yayından sonra sabit yorumu sabitle. 48 saat sonra \"izlemeye devam edenler\" oranını bana yaz, tabloya işleyeyim."),
]

def md():
    out = ["# Karabasan serisi — paylaşım metinleri\n", "Kaynak: `paylasim_kiti.py` (bu dosyayı elle değil, betikle güncelle).\n", "## Profil\n"]
    for b, t, s in PROFIL: out += [f"### {b} — {len(t)} karakter\n", f"```\n{t}\n```\n"]
    for n in range(1, 6):
        out.append(f"## Part {n}\n")
        for b, t, s in metinler(n): out += [f"### {b} — {len(t)} karakter\n", f"```\n{t}\n```\n"]
    out.append("## Yükleme adımları\n")
    for b, t in ADIMLAR: out.append(f"- **{b}:** {t}")
    return "\n".join(out) + "\n"

def kapak_uri(n):
    im = Image.open(S / f"part{n}/cikti/kapak.png").convert("RGB").resize((360, 640))
    b = io.BytesIO(); im.save(b, "JPEG", quality=80)
    return "data:image/jpeg;base64," + base64.b64encode(b.getvalue()).decode()

def kutu(baslik, metin, sinir, kid):
    uz = len(metin); asim = uz > sinir
    return (f'<div class="kutu"><div class="kb"><span class="ad">{html.escape(baslik)}</span>'
            f'<span class="say{" asim" if asim else ""}">{uz} / {sinir}</span>'
            f'<button class="kop" data-k="{kid}" type="button">Kopyala</button></div>'
            f'<pre id="{kid}">{html.escape(metin)}</pre></div>')

def sayfa():
    kapaklar = "".join(f'<a class="kp" href="#part{n}"><img src="{kapak_uri(n)}" alt="Part {n} kapağı" width="360" height="640"></a>' for n in range(1, 6))
    profil = "".join(kutu(b, t, s, f"pr{i}") for i, (b, t, s) in enumerate(PROFIL))
    partlar = ""
    for n in range(1, 6):
        partlar += f'<section class="part" id="part{n}"><h3>Part {n} <span>{html.escape(P[n]["yt"].split(" | ")[0])}</span></h3><div class="izgara">'
        partlar += "".join(kutu(b, t, s, f"p{n}m{i}") for i, (b, t, s) in enumerate(metinler(n))) + "</div></section>"
    adim = "".join(f"<li><b>{html.escape(b)}</b> {html.escape(t)}</li>" for b, t in ADIMLAR)
    return f"""<title>Karabasan Paylaşım Kiti</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800;9..144,900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
/* VOICE everyday · IDEA kanalın gece kapakları: koyu gece zemini, kâğıt kartlar, mercan/hardal
   PICTURE beş kapak yan yana (seri ızgarası) · COLOUR gece laciverti, kâğıt, mercan, hardal
   TYPE Fraunces 900 + Inter · LAYOUT üstte kapak şeridi, altta profil metinleri ve part partları */
:root{{color-scheme:light dark;--bg:light-dark(#F4EEE2,#12142E);--kart:light-dark(#FFFFFF,#1D2147);--ink:light-dark(#22264A,#F3EEE3);--sil:light-dark(#5E6283,#B9BCD6);--cizgi:light-dark(#E2D9C8,#2F3463);--mercan:#E8573F;--hardal:#F4BE4F;--gece:#171A3D}}
:root[data-theme=light]{{color-scheme:light}}:root[data-theme=dark]{{color-scheme:dark}}
*{{box-sizing:border-box;min-width:0}}
body{{background:var(--bg);color:var(--ink);font:16px/1.55 Inter,system-ui,sans-serif;overflow-x:clip;margin:0}}
.band{{padding-block:clamp(24px,4vw,56px);padding-left:max(5vw,16px,env(safe-area-inset-left,0px));padding-right:max(5vw,16px,env(safe-area-inset-right,0px))}}
.ust{{background:var(--gece);color:#F3EEE3;margin-top:calc(-1*env(safe-area-inset-top,0px));padding-top:calc(env(safe-area-inset-top,0px) + 2.5rem)}}
.ic{{max-width:1240px;margin:0 auto}}
h1{{font:900 clamp(34px,5vw,52px)/1.05 Fraunces,Georgia,serif;letter-spacing:-.02em;margin:0 0 6px}}
h1 em{{font-style:normal;color:var(--hardal)}}
.alt{{color:#C9C2E6;margin:0 0 24px;max-width:60ch}}
.serit{{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:clamp(8px,1.5vw,18px)}}
.kp img{{display:block;width:100%;height:auto;border-radius:14px;box-shadow:0 8px 24px rgba(0,0,0,.4)}}
.kp:hover img{{outline:3px solid var(--hardal)}}
.not{{color:#B9BCD6;font-size:14px;margin:14px 0 0}}
h2{{font:900 clamp(26px,3.4vw,36px)/1.1 Fraunces,Georgia,serif;margin:0 0 16px}}
h3{{font:800 24px/1.2 Fraunces,Georgia,serif;margin:0 0 14px}}
h3 span{{font:600 15px Inter,sans-serif;color:var(--sil);margin-left:8px}}
.izgara{{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}}
.kutu{{background:var(--kart);border:1px solid var(--cizgi);border-radius:14px;padding:12px 14px 14px}}
.kb{{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}}
.ad{{font-weight:700;font-size:14px;flex:1}}
.say{{font-size:13px;color:var(--sil);white-space:nowrap}}.say.asim{{color:var(--mercan);font-weight:700}}
.kop{{font:700 14px Inter,sans-serif;background:var(--mercan);color:#fff;border:0;border-radius:10px;padding:10px 16px;min-height:44px;cursor:pointer}}
.kop.tamam{{background:#3F8077}}
pre{{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font:15px/1.5 Inter,sans-serif;background:light-dark(#FBF6EC,#151938);border-radius:10px;padding:10px 12px}}
.part{{border-top:2px solid var(--cizgi);padding-top:22px;margin-top:26px}}
ol{{padding-left:22px;margin:0}}li{{margin-bottom:10px}}
@media(max-width:700px){{.izgara{{grid-template-columns:minmax(0,1fr)}}.serit{{grid-template-columns:repeat(3,minmax(0,1fr))}}}}
</style>
<header class="band ust"><div class="ic">
<h1>Karabasan <em>paylaşım kiti</em></h1>
<p class="alt">Beş kapak, profil metinleri ve her part için YouTube, Instagram ve TikTok açıklamaları. Her kutunun düğmesine bas, metin panoya kopyalanır.</p>
<div class="serit">{kapaklar}</div>
<p class="not">Kapak dosyaları (1080×1920, kapak.jpg) sohbette gönderildi. Bir kapağa dokun, o partın metinlerine git.</p>
</div></header>
<main class="band"><div class="ic">
<h2>Profil</h2><div class="izgara">{profil}</div>
<h2 style="margin-top:40px">Partlar</h2>{partlar}
<section class="part"><h2>Yükleme adımları</h2><ol>{adim}</ol></section>
</div></main>
<script>{{
document.addEventListener('click',async e=>{{
 const b=e.target.closest('.kop'); if(!b) return;
 const t=document.getElementById(b.dataset.k).textContent;
 let ok=false;
 try{{await navigator.clipboard.writeText(t);ok=true;}}catch(_){{}}
 if(!ok){{try{{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();ok=document.execCommand('copy');a.remove();}}catch(_){{}}}}
 if(!ok){{const r=document.createRange();r.selectNodeContents(document.getElementById(b.dataset.k));const s=getSelection();s.removeAllRanges();s.addRange(r);}}
 b.textContent=ok?'Kopyalandı':'Seçildi, kopyala';b.classList.add('tamam');setTimeout(()=>{{b.textContent='Kopyala';b.classList.remove('tamam');}},1800);
}});
}}</script>
"""

if __name__ == "__main__":
    (S / "paylasim-metinleri.md").write_text(md())
    hedef = Path(sys.argv[1]) if len(sys.argv) > 1 else S / "paylasim-kiti.html"
    hedef.write_text(sayfa())
    for b, t, s in PROFIL + [x for n in range(1, 6) for x in metinler(n)]:
        if len(t) > s: print("SINIR AŞILDI:", b, len(t), ">", s)
    print("yazıldı:", S / "paylasim-metinleri.md", hedef)
