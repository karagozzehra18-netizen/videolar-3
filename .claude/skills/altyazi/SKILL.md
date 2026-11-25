---
name: altyazi
description: Duyma Sakın altyazı kuralları — kelime kelime akan altyazı, çizimin üstüne asla binmeyen sabit bant, sayıları yazıyla gösterme, platform düğmelerinin güvenli alanları ve ölçerek satır kırma. Altyazı, üst bant ya da ekrandaki herhangi bir yazının yerini/boyutunu belirlerken oku.
---

# Altyazı

## Yerleşim (1080x1920) — `uretim/src/marka/yerlesim.ts`
| Alan | Koordinat | Not |
|---|---|---|
| Platform üst simgeleri | y 0-170 | yazı yok |
| Üst bant | y 196 (çubuk 8 px), başlık y 222, Inter 700 34 px | çizimin üstünde değil, çerçevede |
| **Sahne (çizim)** | x 40-1040, y 292-1340 | **altyazı buraya ASLA girmez** |
| **Altyazı bandı** | x 90-900, y 1368-1572 | stilin çerçevesinin üstünde, düz zeminde |
| Platform sağ şerit (beğeni/yorum) | x ≥ 940, y 880-1740 | yazı yok |
| Platform alt alan (açıklama/ses) | y ≥ 1590 | yazı yok |
| Filigran | sağdan 60, üstten 290, yükseklik 64 | kanal-kimligi |

## Akış
- Kelime kelime: söylenen kelime **mercan**, söylenmiş kelimeler kâğıt rengi, sıradakiler %30 soluk (satır kaymaz).
- Parça: en fazla 5 kelime, en fazla 2 satır, virgül/noktalı virgül/iki nokta parçayı bitirir.
- Inter 800, 66 px, satır aralığı 1,12; 3 px koyu gölge.
- Zaman: `zaman.json → altyazi` (ElevenLabs kelime zamanından). Parça bir sonraki parçanın 2 kare öncesine kadar kalır.

## Ölçerek kırma
`araclar/bolum_hazirla.py`, Inter 800 66 px ile her satırın genişliğini **Pillow ile ölçer**; 800 px'i geçen satır ya da 2'den fazla satır **HATA** verir. Kontrol panosu ayrıca bantta x<70 / x>930 yazı pikseli arar ("taşan yazı").

## Sayılar
- Senaryoda ve ekranda sayılar **yazıyla**: "yüz kişiden yaklaşık sekizi" (rakam = HATA).
- Görselde sayı gerekiyorsa çizimle göster (ör. yüz kişilik pano, sekizi kırmızı yanar), rakam yazma.
- İstisna: kapak şablonundaki "1. VİDEO" numarası (kullanıcı isteği).

## Yapma
- Altyazıyı sahnenin içine koyma, sahneyi altyazı için karartma.
- Ekranda anlatımla aynı yazıyı ikinci kez gösterme.
- Büyük harfe çevirirken `toLocaleUpperCase('tr-TR')` (i → İ).
