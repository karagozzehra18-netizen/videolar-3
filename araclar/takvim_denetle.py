#!/usr/bin/env python3
"""takvim_denetle.py — Yayın takvimini denetler (takvim/takvim.csv planın ASIL kaydıdır).

Kullanım:
  python3 araclar/takvim_denetle.py                 # denetle + ilk boş gün
  python3 araclar/takvim_denetle.py --bugun 2026-11-26
Kontroller (hata → çıkış kodu 1):
  - aynı güne iki video var mı
  - art arda iki video aynı stilde mi (stil-kutuphanesi kuralı)
  - tarih biçimi YYYY-AA-GG, durum: planli | yuklendi | yayinda | iptal
Çıktı: "İlk boş gün: ..." (bugünden itibaren takvimde olmayan ilk gün)
Not: Bu betik takvimi DEĞİŞTİRMEZ. Tarih ekleme/değiştirme kullanıcı onayıyla elle yapılır.
"""
import csv, sys
from datetime import date, timedelta
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
DURUM = {"planli", "yuklendi", "yayinda", "iptal"}

def main():
    a = sys.argv
    bugun = date.fromisoformat(a[a.index("--bugun") + 1]) if "--bugun" in a else date.today()
    satir = list(csv.DictReader(open(KOK / "takvim/takvim.csv", encoding="utf-8")))
    hata, gunler = [], {}
    for r in satir:
        try: g = date.fromisoformat(r["tarih"])
        except ValueError: hata.append(f"Tarih biçimi yanlış: {r['tarih']}"); continue
        if r["durum"] not in DURUM: hata.append(f"{r['tarih']}: durum '{r['durum']}' geçersiz")
        if r["durum"] == "iptal": continue
        if g in gunler: hata.append(f"Aynı güne iki video: {g} → {gunler[g]} ve {r['slug']}")
        gunler[g] = r["slug"]
    sirali = sorted((date.fromisoformat(r["tarih"]), r) for r in satir if r["durum"] != "iptal" and r["tarih"][:4].isdigit())
    for (g1, r1), (g2, r2) in zip(sirali, sirali[1:]):
        if r1["stil"] == r2["stil"]: hata.append(f"Art arda aynı stil '{r1['stil']}': {r1['slug']} → {r2['slug']}")
    g = bugun
    while g in gunler: g += timedelta(days=1)
    print(f"{len(gunler)} planlı gün · ilk boş gün: {g.isoformat()}")
    for h in hata: print("HATA:", h)
    sys.exit(1 if hata else 0)

if __name__ == "__main__":
    main()
