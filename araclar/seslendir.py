#!/usr/bin/env python3
"""seslendir.py — Senaryoyu kanal sesiyle seslendirir ve kelime zamanlarını kaydeder (ElevenLabs, ÜCRETLİ).

Kullanım:
  python3 araclar/seslendir.py bolumler/001-karabasan            # yalnız maliyet tahmini (harcama yok)
  python3 araclar/seslendir.py bolumler/001-karabasan --onay     # kullanıcı onayından sonra üret
Girdi : bolum.json → cumleler, ses.voice_id, ses.model, ses.hiz ...
Çıktı : ses/anlatim.mp3 + ses/anlatim.json (karakter hizalaması) ; harcanan kredi ölçülüp yazdırılır.
Sonra: python3 araclar/bolum_hazirla.py <bolum>
"""
import base64, json, sys
from pathlib import Path
from ses_ortak import api, kredi

def main():
    if len(sys.argv) < 2: print(__doc__); sys.exit(2)
    d = Path(sys.argv[1]); b = json.loads((d / "bolum.json").read_text()); s = b["ses"]
    metin = " ".join(b["cumleler"])
    carpan = {"eleven_multilingual_v2": 1, "eleven_v3": 1, "eleven_v4": 1}.get(s["model"], 0.5)
    print(f"Metin {len(metin)} karakter · model {s['model']} · tahmini {len(metin) * carpan:.0f} kredi")
    if not s.get("voice_id"): sys.exit("bolum.json → ses.voice_id boş (kanal sesi seçilmeli).")
    if "--onay" not in sys.argv: print("Harcama yapılmadı. Onaydan sonra --onay ile çalıştır."); return
    once, limit = kredi()
    govde = {"text": metin, "model_id": s["model"], "language_code": "tr",
             "voice_settings": {"stability": s.get("stability", 0.5), "similarity_boost": s.get("similarity_boost", 0.75),
                                "style": s.get("style", 0.2), "speed": s.get("hiz", 1.0)}}
    r = api(f"/v1/text-to-speech/{s['voice_id']}/with-timestamps?output_format=mp3_44100_128", govde)
    (d / "ses").mkdir(exist_ok=True)
    (d / "ses/anlatim.mp3").write_bytes(base64.b64decode(r["audio_base64"]))
    (d / "ses/anlatim.json").write_text(json.dumps({"alignment": r["alignment"], "metin": metin}, ensure_ascii=False))
    sonra, _ = kredi()
    print(f"Yazıldı: ses/anlatim.mp3, ses/anlatim.json · harcanan {sonra - once} kredi · kalan {limit - sonra}/{limit}")

if __name__ == "__main__":
    main()
