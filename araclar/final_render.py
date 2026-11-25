#!/usr/bin/env python3
"""final_render.py — Son video: Remotion render (sessiz) + ses miksi + loudness normalizasyonu + kapak + rapor.

Kullanım:  python3 araclar/final_render.py bolumler/001-karabasan [--kapak-kare 18] [--yalniz-ses] [--yalniz-kapak]
Adımlar :
  1. uretim/ içinde `npx remotion render b<no>` → cikti/goruntu.mp4 (ses yok)
  2. Miks (48 kHz): anlatım 0 dB + efektler (bolum.json db) + müzik (-26 dB, konuşma varken 6 dB daha kısık)
  3. ffmpeg loudnorm iki geçiş → hedef -14 LUFS, tepe ≤ -1 dBTP (gerekirse sınırlayıcı), ölç ve yaz
  4. Birleştir → cikti/<slug>.mp4 (H.264 yuv420p, AAC 192k, +faststart)
  5. Kapak: istenen kare PNG → Kapak şablonu (k<no>) → cikti/kapak.png (+ kapak_kontrol: 2 satır, ≤10 karakter)
  6. cikti/rapor.json: loudness, tepe, süre, boyut
"""
import json, re, subprocess, sys
from pathlib import Path
import numpy as np
from ses_ortak import SR, oku, yaz, zarf
from ses_denetimi import efekt_izi

KOK = Path(__file__).resolve().parent.parent
FPS = 30

def calis(k, **kw):
    print("$", " ".join(map(str, k))[:160]); return subprocess.run(k, check=True, **kw)

def olc(yol):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(yol), "-af", "ebur128=peak=true", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    oz = r[r.rfind("Summary:"):]
    I = float(re.search(r"I:\s+(-?[\d.]+) LUFS", oz).group(1))
    tp = float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", oz).group(1))
    return I, tp

def miks(d, z):
    uz = int(z["toplam"] / FPS * SR)
    ses = np.zeros((uz, 2), np.float32)
    duz = d / "ses/anlatim-duzenli.wav"
    v = oku(duz if duz.exists() else d / "ses/anlatim.mp3")[:uz]; ses[: len(v)] += v
    ses += efekt_izi(d, z, uz)
    m_yol = d / "ses/muzik.wav"
    if m_yol.exists():
        m = oku(m_yol)[:uz]; m = np.pad(m, ((0, uz - len(m)), (0, 0)))
        ze, n = zarf(np.pad(v, ((0, uz - len(v)), (0, 0))), 20)
        aktif = (ze > ze.max() * 0.05).astype(np.float32)
        aktif = np.convolve(aktif, np.ones(15) / 15, mode="same")  # 300 ms yumuşatma
        kazanc = 10 ** ((-26 - 6 * aktif) / 20)
        g = np.repeat(kazanc, n); g = np.pad(g, (0, max(0, uz - len(g))), mode="edge")[:uz]
        ses += m * g[:, None]
    return ses

def normalize(gir, cik):
    a = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(gir), "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True).stderr
    j = json.loads(a[a.rfind("{"):a.rfind("}") + 1])
    f = (f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}"
         f":measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true")
    calis(["ffmpeg", "-v", "error", "-y", "-i", str(gir), "-af", f + ",alimiter=limit=0.85:level=false", "-ar", str(SR), str(cik)])

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    d = (KOK / sys.argv[1]).resolve() if not Path(sys.argv[1]).is_absolute() else Path(sys.argv[1])
    a = sys.argv
    b = json.loads((d / "bolum.json").read_text()); z = json.loads((d / "zaman.json").read_text())
    kimlik = f"{b['no']:03d}"; c = d / "cikti"; c.mkdir(exist_ok=True)
    yalniz_kapak = "--yalniz-kapak" in a
    if not yalniz_kapak:
        if "--yalniz-ses" not in a:
            calis(["npx", "remotion", "render", "src/index.ts", f"b{kimlik}", str(c / "goruntu.mp4"), "--codec=h264", "--crf=17",
                   "--muted", "--log=error"], cwd=KOK / "uretim")
        yaz(c / "miks-ham.wav", miks(d, z))
        normalize(c / "miks-ham.wav", c / "miks.wav")
        I, tp = olc(c / "miks.wav")
        son = c / f"{b['slug']}.mp4"
        calis(["ffmpeg", "-v", "error", "-y", "-i", str(c / "goruntu.mp4"), "-i", str(c / "miks.wav"), "-map", "0:v", "-map", "1:a",
               "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", str(son)])
        I2, tp2 = olc(son)
        sure = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(son)], capture_output=True, text=True).stdout)
        rapor = {"dosya": str(son.relative_to(KOK)), "sure_sn": round(sure, 2), "lufs": I2, "tepe_dbtp": tp2,
                 "lufs_gecti": abs(I2 + 14) <= 1.0, "tepe_gecti": tp2 <= -1.0, "boyut_mb": round(son.stat().st_size / 1e6, 1)}
        (c / "rapor.json").write_text(json.dumps(rapor, ensure_ascii=False, indent=1))
        print(json.dumps(rapor, ensure_ascii=False))
    # kapak
    k = b["kapak"]; kk = int(a[a.index("--kapak-kare") + 1]) if "--kapak-kare" in a else (k.get("zemin_kare") or 12)
    for s in (k["satir1"], k["satir2"]):
        if len(s) > 10: sys.exit(f"KAPAK HATASI: '{s}' {len(s)} karakter (en fazla 10)")
    calis(["npx", "remotion", "still", "src/index.ts", f"b{kimlik}", str(c / "kapak-zemin.png"), f"--frame={kk}", "--props={\"temiz\":true}", "--log=error"], cwd=KOK / "uretim")
    calis(["npx", "remotion", "still", "src/index.ts", f"k{kimlik}", str(c / "kapak.png"), "--log=error"], cwd=KOK / "uretim")
    print("Kapak:", c / "kapak.png")

if __name__ == "__main__":
    main()
