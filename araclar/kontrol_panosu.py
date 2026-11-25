#!/usr/bin/env python3
"""kontrol_panosu.py — Videodan seçili kareleri tek ızgara görsele dizer ve otomatik görüntü kontrollerini yapar.

Kullanım:  python3 araclar/kontrol_panosu.py <video.mp4> [--kare 20] [--cikti pano.png] [--bitis 31.2]
           (--bitis verilmezse videonun bir üst klasöründeki zaman.json okunur; bitiş ekranı kareleri hikâye kontrolüne girmez)
Kareler :  0 sn, 0,5 sn, sonra eşit aralıklı N kare (en az 15), son kare. Her karede etiket: no, saniye, parlaklık, uyarı.
Kontroller (rapor <cikti>.json):
  karanlik   sahne alanı ortalama parlaklığı < 0,30
  bos_alan   sahne alanının 3x3 hücresinden biri düz (std < 5) → boş panel/köşe
  tasan_yazi altyazı bandında x<70 ya da x>930'da yazı pikseli (açık ve yüksek kontrastlı)
  ilk_kare   ilk kare parlaklığı ≥ bütün karelerin %85 yüzdeliği mi; 0→0,5 sn ortalama fark ≥ 6 (büyük hareket)
Not: Bu otomatik kontrol, gözle bakmanın yerini TUTMAZ; panoyu açıp kendin bak.
"""
import json, subprocess, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

KOK = Path(__file__).resolve().parent.parent
SAHNE = (0, 170, 1080, 1392)       # tam ekran çizimin altyazı/ön katman üstü (uretim/src/marka/yerlesim.ts)
ALTYAZI = (0, 1404, 1080, 1590)

def kare_al(video, t):
    ham = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", str(video), "-frames:v", "1", "-f", "rawvideo",
                          "-pix_fmt", "rgb24", "-s", "1080x1920", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(ham, np.uint8).reshape(1920, 1080, 3)

def parlaklik(a):
    return float((a[..., 0] * 0.2126 + a[..., 1] * 0.7152 + a[..., 2] * 0.0722).mean() / 255)

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    v = Path(sys.argv[1]); a = sys.argv
    n = max(15, int(a[a.index("--kare") + 1]) if "--kare" in a else 20)
    cikti = Path(a[a.index("--cikti") + 1]) if "--cikti" in a else v.with_name(v.stem + "-kontrol.png")
    sure = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(v)], capture_output=True, text=True).stdout)
    zamanlar = sorted(set([0.0, 0.5] + [round(i * (sure - 0.1) / (n - 1), 2) for i in range(n)] + [round(sure - 0.05, 2)]))
    bitis = float(a[a.index("--bitis") + 1]) if "--bitis" in a else None
    zj = v.resolve().parent.parent / "zaman.json"
    if bitis is None and zj.exists():
        z = json.loads(zj.read_text()); bitis = z["bitis"] / z["fps"]
    bitis = bitis if bitis is not None else sure
    if bitis < sure: zamanlar = sorted(set(zamanlar + [round(bitis - 0.1, 2), round(bitis + 1.5, 2)]))
    kareler = [(t, kare_al(v, t)) for t in zamanlar]
    satirlar = []
    for t, k in kareler:
        x1, y1, x2, y2 = SAHNE; s = k[y1:y2, x1:x2]
        L = parlaklik(s); uy = []
        if t >= bitis:
            satirlar.append({"t": t, "parlaklik": round(L, 3), "uyarilar": [], "bitis_ekrani": True}); continue
        if L < 0.30: uy.append("karanlık")
        hw, hh = (x2 - x1) // 3, (y2 - y1) // 3
        for i in range(3):
            for j in range(3):
                if s[j * hh:(j + 1) * hh, i * hw:(i + 1) * hw].std() < 5: uy.append(f"boş hücre {j},{i}")
        b = k[ALTYAZI[1]:ALTYAZI[3]].astype(int)
        acik = (b.min(axis=2) > 200) | ((b[..., 0] > 200) & (b[..., 1] < 120))
        xs = np.where(acik.any(axis=0))[0]
        if len(xs) and (xs.min() < 120 or xs.max() > 960): uy.append("taşan yazı")
        satirlar.append({"t": t, "parlaklik": round(L, 3), "uyarilar": uy})
    bitis_disi = [r["parlaklik"] for r in satirlar if not r.get("bitis_ekrani")]
    ilk = satirlar[0]["parlaklik"]
    hareket = float(np.abs(kareler[0][1].astype(int) - kareler[1][1].astype(int)).mean())
    ozet = {"ilk_kare_parlaklik": ilk, "yuzdelik85": round(float(np.percentile(bitis_disi, 85)), 3),
            "ilk_kare_parlak_mi": ilk >= float(np.percentile(bitis_disi, 85)) - 0.02,
            "ilk_05sn_hareket": round(hareket, 1), "ilk_05sn_buyuk_hareket": hareket >= 6,
            "uyarili_kare": sum(1 for r in satirlar if r["uyarilar"]), "kare_sayisi": len(satirlar)}
    # ızgara
    tw, th, kol = 270, 480, 5
    sat = (len(kareler) + kol - 1) // kol
    pano = Image.new("RGB", (kol * tw, sat * (th + 40)), "#1d1d24")
    try: F = ImageFont.truetype(str(KOK / "marka/fontlar/Inter[opsz,wght].ttf"), 17)
    except Exception: F = ImageFont.load_default()
    dr = ImageDraw.Draw(pano)
    for i, ((t, k), r) in enumerate(zip(kareler, satirlar)):
        x, y = (i % kol) * tw, (i // kol) * (th + 40)
        pano.paste(Image.fromarray(k).resize((tw, th)), (x, y))
        renk = "#ff8a7a" if r["uyarilar"] else "#cfe8cf"
        dr.text((x + 6, y + th + 3), f"#{i} {t:.2f}s L={r['parlaklik']:.2f}" + (" bitiş" if r.get("bitis_ekrani") else ""), fill=renk, font=F)
        if r["uyarilar"]: dr.text((x + 6, y + th + 20), ", ".join(r["uyarilar"])[:34], fill=renk, font=F)
    pano.save(cikti)
    (cikti.with_suffix(".json")).write_text(json.dumps({"ozet": ozet, "kareler": satirlar}, ensure_ascii=False, indent=1))
    print(f"Pano: {cikti}  ({len(kareler)} kare)")
    print(json.dumps(ozet, ensure_ascii=False))
    for r in satirlar:
        if r["uyarilar"]: print(f"  {r['t']:6.2f}s  {', '.join(r['uyarilar'])}")

if __name__ == "__main__":
    main()
