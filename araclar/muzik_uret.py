#!/usr/bin/env python3
"""muzik_uret.py — Ücretsiz, yerel, telifsiz alt müzik: ağır, karanlık bir drone (kodla sentez).

Kullanım:  python3 araclar/muzik_uret.py bolumler/001-karabasan [--sure 32] [--kok 55]
Çıktı   :  <bolum>/ses/muzik.wav  (tepe -6 dBFS; miksajda konuşmanın çok altına indirilir)
Yapı    :  kök + beşli + küçük üçlünün yavaş titreşen sinüsleri, filtrelenmiş gürültü "nefesi", 2 sn giriş/çıkış.
"""
import json, sys
from pathlib import Path
import numpy as np
from ses_ortak import SR, yaz

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    d = Path(sys.argv[1])
    a = sys.argv
    sure = float(a[a.index("--sure") + 1]) if "--sure" in a else json.loads((d / "zaman.json").read_text())["toplam"] / 30
    kok = float(a[a.index("--kok") + 1]) if "--kok" in a else 55.0
    t = np.arange(int(sure * SR)) / SR
    x = np.zeros_like(t)
    for oran, g, hz in [(1, 1.0, 0.07), (1.5, 0.5, 0.05), (1.2, 0.35, 0.11), (2, 0.25, 0.09), (0.5, 0.6, 0.04)]:
        x += g * np.sin(2 * np.pi * kok * oran * t + 0.8 * np.sin(2 * np.pi * hz * t)) * (0.75 + 0.25 * np.sin(2 * np.pi * hz * 0.7 * t + oran))
    rng = np.random.default_rng(7)
    g = rng.standard_normal(len(t))
    k = int(SR * 0.004); g = np.convolve(g, np.ones(k) / k, mode="same")  # kaba alçak geçiren
    x += 0.8 * g * (0.5 + 0.5 * np.sin(2 * np.pi * 0.13 * t))
    zarf = np.minimum(1, np.minimum(t / 2.0, (sure - t) / 2.0)).clip(0, 1)
    x *= zarf
    st = np.stack([x, np.roll(x, int(0.012 * SR))], axis=1)
    st = st / np.abs(st).max() * 10 ** (-6 / 20)
    (d / "ses").mkdir(exist_ok=True)
    yaz(d / "ses/muzik.wav", st)
    print(f"Yazıldı: {d}/ses/muzik.wav · {sure:.1f} sn · kök {kok} Hz")

if __name__ == "__main__":
    main()
