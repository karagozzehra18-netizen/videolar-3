"""ses_ortak.py — ses araçlarının ortak yardımcıları (doğrudan çalıştırılmaz).
Bütün işler 48 kHz stereo float32 numpy dizisiyle yapılır; okuma/yazma ffmpeg ile.
ElevenLabs çağrıları: anahtar yalnız ortam değişkeninden (ELEVENLABS_API_KEY) okunur, ASLA basılmaz."""
import json, os, subprocess, urllib.error, urllib.request
import numpy as np

SR = 48000
API = "https://api.elevenlabs.io"

def oku(yol):
    ham = subprocess.run(["ffmpeg", "-v", "error", "-i", str(yol), "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(ham, dtype=np.float32).reshape(-1, 2).copy()

def yaz(yol, x):
    x = np.ascontiguousarray(x, dtype=np.float32)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ac", "2", "-ar", str(SR), "-i", "-", str(yol)],
                   input=x.tobytes(), check=True)

def db(x):
    return 20 * np.log10(max(1e-9, float(x)))

def tepe_db(x):
    return db(np.abs(x).max() if len(x) else 0)

def zarf(x, pencere_ms=5):
    """Mono mutlak genlik zarfı, pencere_ms çözünürlükte (RMS)."""
    m = np.abs(x).mean(axis=1) if x.ndim == 2 else np.abs(x)
    n = int(SR * pencere_ms / 1000)
    k = len(m) // n
    return np.sqrt((m[: k * n].reshape(k, n) ** 2).mean(axis=1)), n

def anahtar():
    k = os.environ.get("ELEVENLABS_API_KEY")
    if not k:
        raise SystemExit("ELEVENLABS_API_KEY ortam değişkeni yok (ortam ayarına kaydedilmeli).")
    return k

def api(yol, govde=None, ham=False):
    istek = urllib.request.Request(API + yol, data=json.dumps(govde).encode() if govde is not None else None,
                                   headers={"xi-api-key": anahtar(), "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(istek, timeout=180) as r:
            veri = r.read()
    except urllib.error.HTTPError as e:  # gövde anahtar içermez; hatanın nedenini göster
        raise SystemExit(f"ElevenLabs HTTP {e.code}: {e.read()[:300].decode(errors='replace')}")
    return veri if ham else json.loads(veri)

def kredi():
    """(kullanılan, limit) — harcamayı öncesi/sonrası farkla ölçmek için."""
    d = api("/v1/user/subscription")
    return d["character_count"], d["character_limit"]
