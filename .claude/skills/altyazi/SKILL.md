---
name: altyazi
description: Duyma Sakın altyazı kuralları — kelime kelime akan altyazı, çizimin üstüne asla binmeyen sabit bant, sayıları yazıyla gösterme, platform düğmelerinin güvenli alanları ve ölçerek satır kırma. Altyazı, üst bant ya da ekrandaki herhangi bir yazının yerini/boyutunu belirlerken oku.
---

# Altyazı

## Yerleşim (1080x1920, TAM EKRAN) — `uretim/src/marka/yerlesim.ts` (kullanıcı kararı 25.11.2026)
| Alan | Koordinat | Not |
|---|---|---|
| Platform üst simgeleri | y 0-170 | yazı yok |
| Başlık kartı | x 56, y 192 | kategori ("Part 1 / 5") + başlık |
| Rozet filigran | sağdan 56, üstten 196, 92 px | |
| **Altyazı** | **ekranın ortası**: x 160-920 (merkez 540), y 1040-1186 | çizimin ÜZERİNDE; koyu kontur (9 px) + gölge → her zeminde okunur |
| Platform sağ şerit | x ≥ 940, y 880-1740 | yazı yok |
| Platform alt alan | y ≥ 1590 | yazı yok |

- Sahne kurarken yüzleri/önemli figürü altyazı bandına (y 1040-1186) **koyma**: kadrajı (Cekim k0/k1 `cy`) ayarla.
- Boyut: Inter 800, **58 px** (orta büyüklük), en fazla 4 kelime / 2 satır / 760 px (bolum_hazirla ölçer).

## Akış
- Kelime kelime: parça birlikte belirir, söylenen kelime **hardal** ve hafif büyür; diğerleri kâğıt rengi (konturla soluk kelime bulanık durduğu için soluk gösterim bırakıldı).
- Parça: en fazla 4 kelime, en fazla 2 satır, virgül/noktalı virgül/iki nokta parçayı bitirir.
- Inter 800, 58 px, satır aralığı 1,15; 9 px koyu kontur (#141833) + gölge.
- Zaman: `zaman.json → altyazi` (ElevenLabs kelime zamanından). Parça bir sonraki parçanın 2 kare öncesine kadar kalır.

## Ölçerek kırma
`araclar/bolum_hazirla.py`, Inter 800 58 px ile her satırın genişliğini **Pillow ile ölçer**; 760 px'i geçen satır ya da 2'den fazla satır **HATA** verir. (Kontrol panosu artık piksel tabanlı taşma aramaz: altyazı çizimin üstünde olduğundan yanlış alarm veriyordu.)

## Sayılar
- Senaryoda ve ekranda sayılar **yazıyla**: "yüz kişiden yaklaşık sekizi" (rakam = HATA).
- Görselde sayı gerekiyorsa çizimle göster (ör. yüz kişilik pano, sekizi kırmızı yanar), rakam yazma.
- İstisna: kapak şablonundaki "1. VİDEO" numarası (kullanıcı isteği).

## Yapma
- Sahneyi altyazı için karartma; okunurluğu kontur sağlar.
- Ekranda anlatımla aynı yazıyı ikinci kez gösterme.
- Büyük harfe çevirirken `toLocaleUpperCase('tr-TR')` (i → İ).
