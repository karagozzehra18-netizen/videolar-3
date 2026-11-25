#!/usr/bin/env python3
"""anlatim_duzenle.py — Seslendirmedeki uzun duraklamaları kısaltır, hizalamayı da aynı oranda kaydırır (ücretsiz).

Kullanım:  python3 araclar/anlatim_duzenle.py bolumler/001-karabasan [--en-uzun 0.45]
Girdi : ses/anlatim.wav (yoksa .mp3) + ses/anlatim.json (ElevenLabs karakter hizalaması)
Çıktı : ses/anlatim-duzenli.wav + ses/anlatim-duzenli.json  (bolum_hazirla ve final_render bunları tercih eder)
Yöntem: iki kelime arasındaki boşluk --en-uzun saniyeyi geçerse fazlası boşluğun ORTASINDAN kesilir
        (20 ms çapraz geçiş); kesimden sonraki bütün karakter zamanları aynı miktarda öne alınır.
"""
import json, re, sys
from pathlib import Path
import numpy as np
from ses_ortak import SR, oku, yaz

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    d = Path(sys.argv[1]); a = sys.argv
    sinir = float(a[a.index("--en-uzun") + 1]) if "--en-uzun" in a else 0.45
    w = d / "ses/anlatim.wav"
    x = oku(w if w.exists() else d / "ses/anlatim.mp3"); j = json.loads((d / "ses/anlatim.json").read_text())
    al = j["alignment"]; metin = "".join(al["characters"])
    bas, son = list(al["character_start_times_seconds"]), list(al["character_end_times_seconds"])
    kel = [(m.start(), m.end() - 1) for m in re.finditer(r"\S+", metin)]
    kesimler = []  # (kesim başlangıcı sn, uzunluk sn)
    for (a1, b1), (a2, b2) in zip(kel, kel[1:]):
        bosluk = bas[a2] - son[b1]
        if bosluk > sinir:
            fazla = bosluk - sinir; orta = son[b1] + bosluk / 2
            kesimler.append((orta - fazla / 2, fazla))
    xf = int(0.02 * SR); parca, onceki, kayma = [], 0, 0.0
    for t, u in kesimler:
        i, k = int(t * SR), int((t + u) * SR)
        p = x[onceki:i].copy()
        if parca and xf < len(p):
            p[:xf] = p[:xf] * np.linspace(0, 1, xf)[:, None] + parca[-1][-xf:] * np.linspace(1, 0, xf)[:, None]
            parca[-1] = parca[-1][:-xf]
        parca.append(p); onceki = k
    parca.append(x[onceki:]); y = np.concatenate(parca)
    def kaydir(s):
        return s - sum(u for t, u in kesimler if t + u <= s + 1e-6)
    al2 = {"characters": al["characters"], "character_start_times_seconds": [kaydir(s) for s in bas],
           "character_end_times_seconds": [kaydir(s) for s in son]}
    yaz(d / "ses/anlatim-duzenli.wav", y)
    (d / "ses/anlatim-duzenli.json").write_text(json.dumps({"alignment": al2, "metin": metin, "kesimler": kesimler}, ensure_ascii=False))
    print(f"{len(kesimler)} duraklama kısaltıldı · {sum(u for _, u in kesimler):.2f} sn çıkarıldı · yeni süre {len(y)/SR:.2f} sn")

if __name__ == "__main__":
    main()
