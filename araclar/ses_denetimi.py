#!/usr/bin/env python3
"""ses_denetimi.py — "Yalnız efekt" render'ı: efektleri zaman.json'daki karelere yerleştirir ve her efektin
GERÇEKTE hangi saniyede yükseldiğini ölçer. Görsel olay karesiyle fark > 1 kare ise HATA.

Kullanım:  python3 araclar/ses_denetimi.py bolumler/001-karabasan
Çıktı   :  <bolum>/ses/yalniz-efekt.wav, <bolum>/ses/denetim.json ; ekrana tablo
Ölçüm   :  Her yerleşim, aynı yerleştirme koduyla TEK BAŞINA bir ize render edilir; [kare-0,5 sn, kare+1,5 sn]
           penceresinde 5 ms RMS zarfının kendi tepesinin %10'unu (-20 dB) ilk aştığı an = başlangıç.
           (Ayrı render: üst üste binen efektler ve tekrarlar ölçümü bozmaz.) Ayrıca tam "yalnız efekt" izi yazılır.
"""
import json, sys
from pathlib import Path
import numpy as np
from ses_ortak import SR, oku, tepe_db, yaz, zarf

FPS = 30

def efekt_izi(d, z, uzunluk):
    iz = np.zeros((uzunluk, 2), np.float32); onbellek = {}
    for e in z["efektler"]:
        if e["dosya"] not in onbellek: onbellek[e["dosya"]] = oku(d / e["dosya"])
        x = onbellek[e["dosya"]] * 10 ** (e["db"] / 20)
        a = int(round(e["kare"] / FPS * SR)); b = min(uzunluk, a + len(x))
        if a < uzunluk: iz[a:b] += x[: b - a]
    return iz

def baslangic(iz, kare):
    a = max(0, int((kare / FPS - 0.5) * SR)); b = min(len(iz), int((kare / FPS + 1.5) * SR))
    z, n = zarf(iz[a:b])
    if not len(z) or z.max() <= 0: return None
    return (a + int(np.argmax(z > z.max() * 0.10)) * n) / SR

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    d = Path(sys.argv[1]); z = json.loads((d / "zaman.json").read_text())
    uzunluk = int(z["toplam"] / FPS * SR) + SR
    iz = efekt_izi(d, z, uzunluk)
    yaz(d / "ses/yalniz-efekt.wav", iz)
    satirlar, hata = [], 0
    print(f"{'efekt':12s} {'olay kare':>9s} {'ölçülen':>9s} {'fark':>6s}  durum")
    for e in z["efektler"]:
        tek = efekt_izi(d, {"efektler": [e]}, uzunluk)
        t = baslangic(tek, e["kare"])
        fark = None if t is None else round(t * FPS - e["kare"], 2)
        ok = fark is not None and abs(fark) <= 1.0
        hata += not ok
        satirlar.append({"ad": e["ad"], "kare": e["kare"], "sn": round(e["kare"] / FPS, 3), "olculen_sn": None if t is None else round(t, 3), "fark_kare": fark, "gecti": ok})
        print(f"{e['ad']:12s} {e['kare']:9d} {('-' if t is None else f'{t*FPS:9.1f}'):>9s} {('-' if fark is None else f'{fark:+.1f}'):>6s}  {'GEÇTİ' if ok else 'KALDI'}")
    sonuc = {"efekt_turu": len({e['ad'] for e in z['efektler']}), "yerlesim": len(z["efektler"]), "tepe_db": round(tepe_db(iz), 1), "satirlar": satirlar, "kalan": hata}
    (d / "ses/denetim.json").write_text(json.dumps(sonuc, ensure_ascii=False, indent=1))
    print(f"{sonuc['efekt_turu']} efekt türü, {len(satirlar)} yerleşim · kalan {hata}")
    if not 5 <= sonuc["efekt_turu"] <= 8: print("UYARI: efekt türü 5-8 arası olmalı")
    sys.exit(1 if hata else 0)

if __name__ == "__main__":
    main()
