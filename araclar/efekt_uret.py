#!/usr/bin/env python3
"""efekt_uret.py — bolum.json'daki efekt tariflerini üretir, baştaki sessizliği kırpar, sessiz çıkanı yakalar (ElevenLabs, ÜCRETLİ).

Kullanım:
  python3 araclar/efekt_uret.py bolumler/001-karabasan                  # maliyet tahmini (harcama yok)
  python3 araclar/efekt_uret.py bolumler/001-karabasan --onay           # eksik efektleri üret
  python3 araclar/efekt_uret.py bolumler/001-karabasan --onay --yeniden kapi   # tek efekti yeniden üret
  python3 araclar/efekt_uret.py bolumler/001-karabasan --kirp           # yalnız ham dosyaları yeniden kırp (ücretsiz)
Çıktı : <efekt_klasoru>/ham/<ad>.mp3, <efekt_klasoru>/<ad>.wav (kırpılmış, tepe -1 dBFS), rapor.json
        efekt_klasoru varsayılan ses/efekt; seride bolum.json → "efekt_klasoru": "../ortak/efekt" (paylaşılan, aynı ad bir kez üretilir)
Kurallar: başlangıç = ilk 5 ms pencerenin tepe zarfın %10'unu (-20 dB) aştığı an, 5 ms önü bırakılır.
          Tepe < -35 dBFS ya da RMS < -45 dBFS → "neredeyse sessiz": tarifi değiştirip yeniden üret.
"""
import json, sys
from pathlib import Path
import numpy as np
from ses_ortak import SR, api, db, kredi, oku, tepe_db, yaz, zarf

KREDI_SN = 40  # en kötü durum tahmini (resmî sayfa 11-40 arası belirsiz; gerçek harcama ölçülür)

def kirp(ham, hedef):
    x = oku(ham)
    tepe = tepe_db(x); rms = db(np.sqrt((x ** 2).mean()))
    z, n = zarf(x)
    esik = z.max() * 0.10
    i = int(np.argmax(z > esik))
    bas = max(0, i * n - int(0.005 * SR))
    y = x[bas:]
    son = len(y)
    zz, _ = zarf(y)
    kuyruk = np.where(zz > zz.max() * 0.003)[0]
    if len(kuyruk): son = min(len(y), (kuyruk[-1] + 1) * n + int(0.05 * SR))
    y = y[:son]
    fade = min(len(y), int(0.03 * SR)); y[-fade:] *= np.linspace(1, 0, fade)[:, None]
    if np.abs(y).max() > 0: y = y / np.abs(y).max() * 10 ** (-1 / 20)
    yaz(hedef, y)
    return {"kirpilan_ms": round(bas / SR * 1000, 1), "sure_sn": round(len(y) / SR, 2), "ham_tepe_db": round(tepe, 1),
            "ham_rms_db": round(rms, 1), "sessiz": bool(tepe < -35 or rms < -45)}

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    d = Path(sys.argv[1]); b = json.loads((d / "bolum.json").read_text())
    ek = d / b.get("efekt_klasoru", "ses/efekt")  # seride ortak klasör: aynı efekt bir kez üretilir
    ham_k = ek / "ham"; ham_k.mkdir(parents=True, exist_ok=True)
    tekil = {}
    for e in b["efektler"]: tekil.setdefault(e["ad"], e)
    b["efektler"] = list(tekil.values())
    yeniden = sys.argv[sys.argv.index("--yeniden") + 1:] if "--yeniden" in sys.argv else []
    eksik = [e for e in b["efektler"] if e["ad"] in yeniden or not (ham_k / f"{e['ad']}.mp3").exists()]
    tahmin = sum(e.get("sure", 2) for e in eksik) * KREDI_SN
    print(f"Üretilecek {len(eksik)} efekt · toplam {sum(e.get('sure', 2) for e in eksik):.1f} sn · en fazla ~{tahmin:.0f} kredi")
    if eksik and "--onay" in sys.argv:
        once, limit = kredi()
        for e in eksik:
            mp3 = api("/v1/sound-generation?output_format=mp3_44100_128",
                      {"text": e["tarif"], "duration_seconds": e.get("sure", 2), "prompt_influence": 0.6}, ham=True)
            (ham_k / f"{e['ad']}.mp3").write_bytes(mp3); print("  üretildi:", e["ad"])
        sonra, _ = kredi()
        print(f"Harcanan {sonra - once} kredi · kalan {limit - sonra}/{limit}")
    elif eksik and "--kirp" not in sys.argv:
        print("Harcama yapılmadı. Onaydan sonra --onay ile çalıştır.")
    rapor = {}
    for e in b["efektler"]:
        h = ham_k / f"{e['ad']}.mp3"
        if h.exists():
            rapor[e["ad"]] = kirp(h, ek / f"{e['ad']}.wav")
            r = rapor[e["ad"]]
            print(f"  {e['ad']:12s} kırpılan {r['kirpilan_ms']:6.1f} ms · {r['sure_sn']:.2f} sn · ham tepe {r['ham_tepe_db']} dB" + ("  ⚠ NEREDEYSE SESSİZ: tarifi değiştir" if r["sessiz"] else ""))
    (ek / "rapor.json").write_text(json.dumps(rapor, ensure_ascii=False, indent=1))
    if any(r["sessiz"] for r in rapor.values()): sys.exit(1)

if __name__ == "__main__":
    main()
