---
name: altyazi
description: Duyma Sakın altyazı kuralları — kelime kelime akan altyazı, çizimin üstüne asla binmeyen sabit bant, sayıları yazıyla gösterme, platform düğmelerinin güvenli alanları ve ölçerek satır kırma. Altyazı, üst bant ya da ekrandaki herhangi bir yazının yerini/boyutunu belirlerken oku.
---

# Altyazı

## Yerleşim (1080x1920, TAM EKRAN) — `uretim/src/marka/yerlesim.ts`
| Alan | Koordinat | Not |
|---|---|---|
| Platform üst simgeleri | y 0-170 | yazı yok |
| Başlık kartı (süre çubuğu YOK) | x 56, y 192, ~300x100 | kategori + başlık; arkasına önemli figür koyma |
| **Çizim** | tam ekran 0-1080 × 0-1920 | kamera hareket eder |
| **Sabit ön katman** | y ≥ 1392 | stilin kendi ön katmanı (gölge oyununda sahne tahtası); kamerayla hareket etmez |
| **Altyazı bandı** | x 140-940 (**merkez 540, tam ortada**), y 1412-1586 | ön katmanın üstünde → çizime (figürlere) asla binmez |
| Platform sağ şerit (beğeni/yorum) | x ≥ 940, y 880-1740 | yazı yok |
| Platform alt alan (açıklama/ses) | y ≥ 1590 | yazı yok; ön katmanın süsü burada olabilir |
| Rozet filigran | sağdan 56, üstten 196, 92 px | kanal-kimligi |

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
