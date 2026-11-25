#!/usr/bin/env python3
"""seslendir.py — Senaryoyu kanal sesleriyle seslendirir, kelime zamanlarını kaydeder (ElevenLabs, ÜCRETLİ).

Kullanım:
  python3 araclar/seslendir.py bolumler/001-karabasan            # yalnız maliyet tahmini (harcama yok)
  python3 araclar/seslendir.py bolumler/001-karabasan --onay     # kullanıcı onayından sonra üret
İki kanal sesi (kullanıcı kararı 25.11.2026): sakin/bilgi cümleleri "anlatici" (Emrullah), gerilimli cümleler
"gerilim" (Emin). bolum.json → ses.sesler (rol → voice_id, hız…) ve ses.cumle_sesleri (her cümlenin rolü).
Art arda aynı roldeki cümleler TEK istekte seslendirilir (tonlama tutarlı; komşu metin previous/next_text ile verilir).
Parçalar ses/parcalar/'da önbelleklenir: metin ve ayar değişmeyen parça yeniden üretilmez (kredi harcanmaz).
Çıktı : ses/anlatim.wav + ses/anlatim.json (birleşik karakter hizalaması). Parçalar konuşma seviyesine eşitlenir,
        aralarına 0,40 sn boşluk konur. Harcanan kredi ölçülür.
Sonra: anlatim_duzenle.py → bolum_hazirla.py
"""
import base64, hashlib, json, sys
from pathlib import Path
import numpy as np
from ses_ortak import SR, api, kredi, oku, yaz, zarf

BOSLUK = 0.40

def ayarlar(b):
    s = b["ses"]
    if "sesler" not in s:  # eski tek sesli biçim
        return {"tek": s}, ["tek"] * len(b["cumleler"]), s["model"]
    return s["sesler"], s["cumle_sesleri"], s["model"]

def gruplar(b):
    sesler, roller, model = ayarlar(b)
    assert len(roller) == len(b["cumleler"]), "cumle_sesleri cümle sayısıyla aynı olmalı"
    out = []
    for i, (c, r) in enumerate(zip(b["cumleler"], roller)):
        if out and out[-1]["rol"] == r: out[-1]["cumleler"].append(i)
        else: out.append({"rol": r, "cumleler": [i]})
    for g in out:
        g["metin"] = " ".join(b["cumleler"][i] for i in g["cumleler"])
        g["ayar"] = sesler[g["rol"]]
        g["anahtar"] = hashlib.sha1(json.dumps([g["metin"], g["ayar"].get("voice_id"), g["ayar"].get("hiz"), g["ayar"].get("stability"),
                                                 g["ayar"].get("style"), model], ensure_ascii=False).encode()).hexdigest()[:12]
    return out, model

def parca_yolu(d, g):
    return d / "ses/parcalar" / f"{g['cumleler'][0]:02d}-{g['rol']}-{g['anahtar']}"

def konusma_rms(x):
    z, _ = zarf(x, 20)
    aktif = z[z > z.max() * 0.1]
    return float(np.sqrt((aktif ** 2).mean())) if len(aktif) else 1e-6

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    d = Path(sys.argv[1]); b = json.loads((d / "bolum.json").read_text())
    gr, model = gruplar(b)
    (d / "ses/parcalar").mkdir(parents=True, exist_ok=True)
    eksik = [g for g in gr if not parca_yolu(d, g).with_suffix(".mp3").exists()]
    carpan = 1 if model in ("eleven_multilingual_v2", "eleven_v3", "eleven_v4") else 0.5
    for g in gr:
        print(f"  {g['rol']:9s} cümle {g['cumleler']} · {len(g['metin'])} karakter · {'önbellekte' if g not in eksik else 'üretilecek'}")
    print(f"Üretilecek {sum(len(g['metin']) for g in eksik)} karakter · tahmini {sum(len(g['metin']) for g in eksik) * carpan:.0f} kredi")
    if eksik and "--onay" not in sys.argv: print("Harcama yapılmadı. Onaydan sonra --onay ile çalıştır."); return
    if eksik:
        once, limit = kredi()
        for g in eksik:
            i0, i1 = g["cumleler"][0], g["cumleler"][-1]; a = g["ayar"]
            govde = {"text": g["metin"], "model_id": model, "language_code": "tr",
                     "previous_text": " ".join(b["cumleler"][:i0])[-300:] or None, "next_text": " ".join(b["cumleler"][i1 + 1:])[:300] or None,
                     "voice_settings": {"stability": a.get("stability", 0.5), "similarity_boost": a.get("similarity_boost", 0.75),
                                        "style": a.get("style", 0.2), "speed": a.get("hiz", 1.0)}}
            govde = {k: v for k, v in govde.items() if v is not None}
            r = api(f"/v1/text-to-speech/{a['voice_id']}/with-timestamps?output_format=mp3_44100_128", govde)
            p = parca_yolu(d, g)
            p.with_suffix(".mp3").write_bytes(base64.b64decode(r["audio_base64"]))
            p.with_suffix(".json").write_text(json.dumps({"alignment": r["alignment"], "metin": g["metin"]}, ensure_ascii=False))
            print("  üretildi:", p.name)
        sonra, _ = kredi()
        print(f"Harcanan {sonra - once} kredi (sayaç gecikebilir) · kalan {limit - sonra}/{limit}")
    # birleştir
    parcalar, ch, bas, son, t = [], [], [], [], 0.0
    hedef = None
    for k, g in enumerate(gr):
        p = parca_yolu(d, g); x = oku(p.with_suffix(".mp3")); al = json.loads(p.with_suffix(".json").read_text())["alignment"]
        rms = konusma_rms(x); hedef = hedef or rms
        x = x * (hedef / rms)
        if k:
            ch.append(" "); bas.append(t); son.append(t)
            parcalar.append(np.zeros((int(BOSLUK * SR), 2), np.float32)); t += BOSLUK
        ch += al["characters"]; bas += [t + s for s in al["character_start_times_seconds"]]; son += [t + s for s in al["character_end_times_seconds"]]
        parcalar.append(x); t += len(x) / SR
    y = np.concatenate(parcalar)
    y = y / max(1e-6, np.abs(y).max()) * 10 ** (-1 / 20)
    metin = " ".join(b["cumleler"])
    assert "".join(ch) == metin, "birleşik hizalama metinle aynı değil"
    yaz(d / "ses/anlatim.wav", y)
    (d / "ses/anlatim.json").write_text(json.dumps({"alignment": {"characters": ch, "character_start_times_seconds": bas,
        "character_end_times_seconds": son}, "metin": metin, "parcalar": [{k: g[k] for k in ("rol", "cumleler", "anahtar")} for g in gr]}, ensure_ascii=False))
    print(f"Yazıldı: ses/anlatim.wav ({len(y)/SR:.2f} sn) + ses/anlatim.json · {len(gr)} parça")

if __name__ == "__main__":
    main()
