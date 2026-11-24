---
name: logo-tasarim
description: Duyma Sakın için logo, profil fotoğrafı, banner ve diğer marka görsellerini kodla (SVG/HTML → PNG) tasarlama, render etme ve küçük boyutta okunurluğunu ölçme yöntemi. Yeni logo/banner/profil görseli/bitiş ekranı grafiği istendiğinde ya da mevcut logo değiştirileceğinde oku. Renk ve font değerleri için önce `kanal-kimligi`'ni oku.
---

# Logo ve Marka Görseli Tasarımı

## Araçlar
| Araç | Ne yapar |
|---|---|
| `node araclar/marka_render.js <girdi.svg/html> <cikti.png> <G> <Y> [--olcek N]` | SVG/HTML'i Chromium ile PNG'ye çevirir; fontların yüklenmesini bekler |
| `node araclar/logo_kontrol.js <pano.png> <logo1.png> [logo2.png …]` | Her logoyu 320/160/98/48/32 px profil yuvarlağında, koyu ve açık zeminde tek panoda gösterir |
| `node araclar/banner_kontrol.js <banner.html> <onizleme.png> [--pay 60]` | Banner'ın TV / bilgisayar / telefon görünümlerini çıkarır, her öğenin güvenli alana sığdığını **ölçer** (GEÇTİ/KALDI, çıkış kodu 0/2) |
| `--seffaf` (marka_render.js) | Şeffaf zeminli PNG (filigran); SVG'de zemin rect'i olmamalı |

## Akış (her adımda ölçmeden geçme)
1. **Fikir:** En az 3 seçenek. Her biri tek bir fikir anlatır (ör. "sessizlikte tek ses"). Kanal adıyla anlam bağı olsun ("Duyma Sakın" → ses, kulak, dinleyen göz).
2. **Çizim:** Elle SVG yaz (`marka/logo/logo-<harf>-<ad>.svg`), 800x800 viewBox, tam kare `gece` zemin (platform yuvarlağı kendisi kırpar).
3. **Render:** `marka_render.js` ile 800x800 PNG.
4. **Kontrol panosu:** `logo_kontrol.js` ile panoyu üret ve **Read ile bak**. Geçme ölçütleri:
   - 32 px'te ana şekil hâlâ tanınıyor mu? (ayrıntı kayboluyorsa çizgi kalınlığını artır, öğe sayısını azalt)
   - Hiçbir öğe merkezden 0,85 × yarıçaptan dışarı taşmıyor mu? (800'lük karede merkezden 340 px)
   - Açık ve koyu zeminde yuvarlak kenarı belli mi?
   - Tek kırmızı vurgu kuralı korunuyor mu?
5. **Sun:** Panoyu ve öneriyi kullanıcıya göster; seçimi kullanıcı yapar. Seçileni `kanal-kimligi` → Logo bölümüne yaz.
6. **Dışa aktar:** Seçilen SVG'den `profil-800.png`, `profil-320.png`, `profil-200.png` (SVG viewBox sayesinde keskin ölçeklenir).

## SVG kuralları
- Yalnız temel şekiller: `line`, `path`, `circle`, `polyline`, `radialGradient`. Filtre (blur, turbulence) logoda yok — küçük boyutta çamurlaşır.
- Çizgi kalınlığı 800'lük karede **en az 30 px**; ana öğe 44-60 px.
- `stroke-linecap="round"` → yumuşak, okunur uçlar.
- Metin logoda kullanılacaksa font `@font-face` ile `../fontlar/` yolundan yüklenir; harfin optik merkezi ölçülerek ortalanır (Anton'da `text-anchor="middle"` dikeyde ortalamaz).
- Arka plan parıltısı: `radialGradient`, sinyal kırmızısı en fazla %28 opak; sert kenarlı daire kullanma (halka gibi görünür).

## Banner (YouTube 2560x1440)
- Kaynak: `marka/banner/banner-youtube.html`. Render: `marka_render.js … 2560 1440`.
- **Güvenli alan:** YouTube Yardım: 2048x1152'de 1235x338 → 2560x1440'ta 1546x423 (sol 507, üst 508). Tüm yazı ve logo bunun **60 px içinde** (bazı kaynaklar alanı ölçeklemeden 1235x338 veriyor; 60 px pay ikisini de karşılar).
- Kontrol: `node araclar/banner_kontrol.js marka/banner/banner-youtube.html marka/banner/banner-cihaz-onizleme.png --pay 60` → GEÇTİ olmalı, sonra önizlemeye Read ile bak.
- Dalga deseni tohumlu rastgele (aynı render → aynı görüntü).
- Arka plan deseni metnin arkasından geçiyorsa metne koyu `text-shadow` ver; küçük satır `sis` (#B4B0B8) rengi, `kül` değil.

## Platform boyutları
| Platform | Profil | Görünen | Not |
|---|---|---|---|
| YouTube | 800x800 | 98 px yuvarlak | Banner 2560x1440, ≤6 MB |
| Instagram | 320x320 | 110 px yuvarlak | — |
| TikTok | 200x200 (en az) | ~ 96 px yuvarlak | — |

## Yapma
- Başka bir markanın simgesini, karakterini ya da logosunu andıran şekil (ör. podcast uygulamalarının dalga simgesi birebir).
- Logoda ince yazı, slogan, birden fazla kırmızı öğe.
- Gradyanlı metin, gölgeli logo, 3D bevel.

## Bilinen tuzaklar
| Sorun | Çözüm |
|---|---|
| `sed` ile renk değiştirirken `#` ayraç olarak kullanılınca "number option may not be zero" hatası | Renk içeren düzenlemeleri Python `str.replace` ya da Edit aracıyla yap |
| Anton "D" harfinin iç boşluğu dar; içine öğe koyunca kayboluyor | Harf içine öğe koyma; harf + öğe yan yana ya da harfsiz sembol |
| Sert kenarlı yarı saydam arka plan dairesi küçük boyutta "halka" gibi görünüyor | `radialGradient` ile kenarı sıfıra indir |
| Göz/çok çizgili logolar 32 px'te bulanık | Çubuk sayısını azalt veya kalınlaştır; ana sembolü tek öğeye indir |
| Kırmızı/kemik renkli filigran yazısı parlak (turuncu, beyaz) karede kayboluyor | Filigranı %78 opak koyu hap zemin üstüne koy |
| `page.addStyleTag` SVG belgesinde hata veriyor (head yok) | Şeffaflık için SVG'de stil ekleme; `omitBackground` yeterli |
| YouTube kanal filigranı Shorts'ta görünmüyor | Shorts/Reels/TikTok için filigranı videoya göm (`filigran-video.png`) |
| Font yüklenmeden ekran görüntüsü alınması (yedek fontla render) | `marka_render.js` `document.fonts.ready` bekler; yeni araç yazarsan aynısını yap |
