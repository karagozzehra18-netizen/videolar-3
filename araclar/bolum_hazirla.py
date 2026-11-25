#!/usr/bin/env python3
"""bolum_hazirla.py — Bölümün zaman çizelgesini kurar (senaryo → kare numaraları).

Kullanım:
  python3 araclar/bolum_hazirla.py bolumler/001-karabasan            # ses/anlatim.json (ElevenLabs hizalaması) ile
  python3 araclar/bolum_hazirla.py bolumler/001-karabasan --tahmini  # ses yokken tahmini süre (kelime ~0,42 sn)

Girdi : <bolum>/bolum.json (cümleler, olaylar, efektler) + <bolum>/ses/anlatim-duzenli.json (yoksa anlatim.json)
Çıktı : <bolum>/zaman.json  → Remotion sahnesi ve ses araçları bunu okur (tek zaman kaynağı)
Kapılar (hata varsa çıkış kodu 1):
  - sayı rakamla yazılmış mı (senaryoda rakam yasak)
  - kanca ≤7 kelime, "Bir zamanlar"/tarih ile başlamıyor
  - her olay bir kelimeye bağlanabildi mi
  - altyazı parçaları ölçülerek (Inter 800) bandın içine sığıyor mu
  - iki görsel olay arası en fazla 2,5 sn (tempo kuralı)
  - toplam süre 25-35 sn
"""
import json, re, sys, unicodedata
from pathlib import Path
from PIL import ImageFont

FPS = 30
KOK = Path(__file__).resolve().parent.parent
FONT = KOK / "marka/fontlar/Inter[opsz,wght].ttf"
ALTYAZI_BOYUT, ALTYAZI_GENISLIK, EN_FAZLA_SATIR, EN_FAZLA_KELIME = 66, 800, 2, 5
BITIS_SN, SON_BEKLEME_SN = 3.0, 0.45  # uretim/src/marka/yerlesim.ts BITIS_SN ile aynı

def tr_kucuk(s):
    return s.replace("I", "ı").replace("İ", "i").lower()

def norm(w):
    w = tr_kucuk(w)
    return "".join(c for c in w if c.isalnum() or c == "'")

def font():
    f = ImageFont.truetype(str(FONT), ALTYAZI_BOYUT)
    try:
        eks = f.get_variation_axes()
        f.set_variation_by_axes([min(max(32, a["minimum"]), a["maximum"]) if "opsz" in str(a.get("name", b"")).lower() else 800 for a in eks])
    except Exception:
        pass
    return f

def genislik(f, metin):
    return f.getlength(metin)

def kelimeler_hizalamadan(metin, hiz):
    ch, bas, son = hiz["characters"], hiz["character_start_times_seconds"], hiz["character_end_times_seconds"]
    assert "".join(ch) == metin, "hizalama metni senaryoyla aynı değil (ses yeniden üretilmeli)"
    out, i = [], 0
    for m in re.finditer(r"\S+", metin):
        a, b = m.start(), m.end() - 1
        out.append({"w": m.group(), "bas": bas[a], "son": son[b], "a": a})
    return out

def tahmini(cumleler):
    out, t = [], 0.15
    for c in cumleler:
        for w in c.split():
            d = 0.16 + 0.055 * len(w)
            out.append({"w": w, "bas": t, "son": t + d})
            t += d + (0.35 if w[-1] in ".;:?!" else 0.12 if w[-1] == "," else 0.04)
    return out

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    d = Path(sys.argv[1]); tah = "--tahmini" in sys.argv
    b = json.loads((d / "bolum.json").read_text())
    hatalar, uyarilar = [], []
    cumleler = b["cumleler"]
    metin = " ".join(cumleler)
    # --- senaryo kapıları
    if re.search(r"\d", metin): hatalar.append("Senaryoda rakam var: sayılar yazıyla yazılır.")
    kanca = cumleler[0].split()
    if len(kanca) > 7: hatalar.append(f"Kanca {len(kanca)} kelime (en fazla 7).")
    if re.match(r"(?i)\s*(bir zamanlar|\d{3,4}|yıl )", cumleler[0]): hatalar.append("Kanca 'Bir zamanlar'/tarih ile başlıyor.")
    # --- kelime zamanları
    if tah:
        kel = tahmini(cumleler); kaynak = "tahmini"
    else:
        duz = d / "ses/anlatim-duzenli.json"
        hz = json.loads((duz if duz.exists() else d / "ses/anlatim.json").read_text())
        kel = kelimeler_hizalamadan(metin, hz["alignment"]); kaynak = "elevenlabs"
    # kelimeleri cümlelere dağıt
    i = 0; cumle_kel = []
    for c in cumleler:
        n = len(c.split()); cumle_kel.append(kel[i:i + n]); i += n
    kare = lambda s: int(round(s * FPS))
    for ck in cumle_kel:
        for k in ck: k["bas_k"], k["son_k"] = kare(k["bas"]), kare(k["son"])
    konusma_son = cumle_kel[-1][-1]["son_k"]
    bitis = konusma_son + kare(SON_BEKLEME_SN)
    toplam = bitis + kare(BITIS_SN)
    cum = []
    for j, ck in enumerate(cumle_kel):
        bas = 0 if j == 0 else ck[0]["bas_k"] - 3
        son = (cumle_kel[j + 1][0]["bas_k"] - 3) if j + 1 < len(cumle_kel) else bitis
        cum.append({"metin": cumleler[j], "bas": bas, "son": son})
    # --- olaylar
    olaylar = {}
    for o in b["olaylar"]:
        hedef = norm(o["kelime"]); bulundu = None
        for k in cumle_kel[o["cumle"]]:
            if norm(k["w"]).startswith(hedef):
                bulundu = k; break
        if not bulundu:
            hatalar.append(f"Olay '{o['ad']}': '{o['kelime']}' kelimesi {o['cumle']}. cümlede yok."); continue
        olaylar[o["ad"]] = max(0, bulundu["bas_k"] + o.get("kayma", 0))
    olaylar["bitis"] = bitis
    # tempo: olaylar + cümle başları arası boşluk
    zamanlar = sorted(set(list(olaylar.values()) + [c["bas"] for c in cum]))
    for a, c in zip(zamanlar, zamanlar[1:]):
        if c - a > int(2.5 * FPS): uyarilar.append(f"Tempo: {a/FPS:.1f}-{c/FPS:.1f} sn arası {(c-a)/FPS:.1f} sn yeni görsel olay yok.")
    # --- efektler
    efektler = []
    for e in b["efektler"]:
        if e["olay"] not in olaylar: hatalar.append(f"Efekt '{e['ad']}': olay '{e['olay']}' yok."); continue
        k0 = olaylar[e["olay"]] + e.get("kayma", 0)
        tk = e.get("tekrar", {"adet": 1, "aralik": 0})
        for r in range(tk["adet"]):
            efektler.append({"ad": e["ad"], "dosya": f"ses/efekt/{e['ad']}.wav", "kare": k0 + r * tk["aralik"], "db": e.get("db", -6)})
    # --- altyazı parçaları (ölçerek)
    F = font(); parcalar = []
    for j, ck in enumerate(cumle_kel):
        grup = []
        def kapat():
            if grup: parcalar.append(list(grup)); grup.clear()
        for k in ck:
            grup.append(k)
            if len(grup) >= EN_FAZLA_KELIME or k["w"][-1] in ",;:": kapat()
        kapat()
    cikti_parca = []
    for pi, g in enumerate(parcalar):
        satirlar, satir = [[]], ""
        for k in g:
            dene = (satir + " " + k["w"]).strip()
            if genislik(F, dene) > ALTYAZI_GENISLIK and satirlar[-1]:
                satirlar.append([]); satir = k["w"]
            else:
                satir = dene
            satirlar[-1].append(k)
        for s in satirlar:
            w = genislik(F, " ".join(k["w"] for k in s))
            if w > ALTYAZI_GENISLIK: hatalar.append(f"Altyazı taşar: '{' '.join(k['w'] for k in s)}' {w:.0f}px > {ALTYAZI_GENISLIK}")
        if len(satirlar) > EN_FAZLA_SATIR: hatalar.append(f"Altyazı {len(satirlar)} satır: {' '.join(k['w'] for k in g)}")
        bas = g[0]["bas_k"] - 2
        son = (parcalar[pi + 1][0]["bas_k"] - 2) if pi + 1 < len(parcalar) else bitis
        cikti_parca.append({"bas": max(0, bas), "son": son, "kelimeler": [
            {"w": k["w"], "bas": k["bas_k"], "son": k["son_k"], "satir": si} for si, s in enumerate(satirlar) for k in s]})
    sure = toplam / FPS
    if not 25 <= sure <= 35: (uyarilar if tah else hatalar).append(f"Toplam süre {sure:.1f} sn (25-35 olmalı).")
    z = {"kaynak": kaynak, "fps": FPS, "toplam": toplam, "bitis": bitis, "cumleler": cum, "olaylar": olaylar,
         "efektler": efektler, "altyazi": cikti_parca, "kelimeler": [dict(w=k["w"], bas=k["bas_k"], son=k["son_k"]) for ck in cumle_kel for k in ck]}
    (d / "zaman.json").write_text(json.dumps(z, ensure_ascii=False, indent=1))
    print(f"zaman.json yazıldı ({kaynak}) · toplam {sure:.1f} sn · konuşma {konusma_son/FPS:.1f} sn · {len(olaylar)} olay · {len(efektler)} efekt yerleşimi · {len(cikti_parca)} altyazı parçası")
    for u in uyarilar: print("UYARI:", u)
    for h in hatalar: print("HATA:", h)
    sys.exit(1 if hatalar else 0)

if __name__ == "__main__":
    main()
