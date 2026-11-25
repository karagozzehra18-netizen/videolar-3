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
| `marka/filigran/sablon-video.html?logo=<dosya>` | Seçilen logodan Shorts filigranı (600x128); `?logo` yoksa yalnız yazı |
| `marka/filigran/sablon-youtube.html?logo=<dosya>` | Seçilen logodan YouTube kanal filigranı (300x300) |
| `marka/secenek-panosu.html` | Tüm seçenekleri logo + küçük boyut + filigran (parlak/koyu kare) + YouTube filigranı olarak tek panoda gösterir |
| `--seffaf` (marka_render.js) | Şeffaf zeminli PNG (filigran); SVG'de zemin rect'i olmamalı |

## Mevcut durum
Seçili logo: **v4 Dikişli Kulak (neon)**. Tek kaynak `marka/logo/v4/uret.py`; değişiklik orada yapılır, sonra render edilip `marka/secili/` güncellenir.
Kullanıcı kendi görselini getirirse: görseli `kaynak/` altına koy, olduğu gibi kullanılacak yerde (profil) doğrudan kullan, geri kalanı için vektör sürümü çiz ve **orijinalle yan yana ve üst üste bindirerek** karşılaştır.

## v5 — açık renkli illüstrasyonlu set (kullanıcı isteği: "açık renkli, Kurgalia tarzı, tek renk banner olmaz")
- Kaynak: `python3 marka/logo/v5/uret.py` → `logo-a/b/c.svg` (rozet), `banner-a/b/c.svg` (kolaj + kart), `filigran-video-a/b/c.svg`.
- Palet: krem `#F7EEDC`, kâğıt `#FBF5EA`, lacivert `#23284A`, mercan `#E5533C`, hardal `#F2B134`, şeftali `#F7B98B`, lavanta `#C9C0E8`, ay `#FCE6B0`, teal `#3E7C74` / açık `#86B5A6` / koyu `#24524D`.
- Yazı: Fraunces 800 (başlık, slogan, hesap adı), Inter 600 (platform satırı); hepsi vektör yola çevrilir.
- Banner kartı telefon alanında (x 507-2053, y 508-931) 20 px payla; kart içeriği **otomatik sığdırılır** (taşarsa yazı ölçeği küçülür, sağ sınır kart − 48 px).
- Teslim: SVG kaynak + PNG (1024/800/512/320/200).
- Rakip tarzı birebir kopyalama: Kurgalia'nın dalgalı turuncu tepeleri yerine orman ve tepedeki ev kullanıldı.

## Akış (her adımda ölçmeden geçme)
1. **Fikir:** En az 3, tercihen 5 seçenek. Her biri tek bir fikir anlatır. Kanal adıyla **duygusal** bağ kursun, yalnız konu bağı yetmez: ilk set (ses dalgası, soru işareti, göz) "genel" bulunup reddedildi. Tutan yönler: beden + yasak (şşş parmağı, dikişli kulak), slogan nesnesi (kulaklık), tipografi (rozet).
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
- Seçili banner `marka/logo/v4/banner.svg`'den üretilir. SVG banner'da ölçüm: PNG'de eşik üstü piksellerin kutusu **sıkı alan 1235x338 (x 662-1897, y 551-889)** içinde olmalı (v4: x 714-1842, y 551-871 → GEÇTİ).
- Aşağıdaki HTML yöntemi eski banner içindir (`marka/banner/eski/`).
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
| Ses dalgası / soru işareti / göz gibi genel semboller "sıradan" bulundu | Kanal adındaki yasağı bedene bağlayan, biraz rahatsız edici semboller ara |
| Spiral gibi hesaplanan şekiller 0,85 yarıçapı aşabiliyor | Noktaların merkeze en uzak mesafesini hesapla, 340'ı geçmesin |
| Yazılı filigranda dekor çizgisi harflerin üstünden geçince okunmuyor | Çizgiyi yazının altına al (alt çizgi) |
| SVG'de `width/height` sabit sayı olunca büyük ekranda yalnız sol üst köşe çiziliyor | `width="100%" height="100%"` + viewBox kullan |
| Kesik yaylarda yuvarlak uçlar boşlukları kapatıyor | Boşluk açısı = (çizgi kalınlığı + ~22 px) / yarıçap |
| feTurbulence dumanı benekli bulut ya da pembe leke oluyor | fractalNoise → alfa kanalında `feFuncA table` ile **ince bant** (tek değer ~.55, gerisi 0) + ikinci gürültüyle displacement + 1,4 blur |
| Tek renk sürümde dikiş kulak çizgileriyle birleşiyor | Kulak çizgilerine dikiş şeklinde maske (2,1 kat kalın) ile boşluk aç |
| Yazılı filigranın sağ ucu kırpılıyor | SVG genişliğini yazı genişliğinden hesapla; render sonrası sağ 3 px şeffaf mı ölç |
| Kafatası, kan damlası, Wi-Fi'ye benzeyen yaylar, uyarı levhası üçgeni | Türün kalıpları ya da yanlış okumalar; kullanma |
| `read W H < dosya` satır sonu yoksa hata kodu döndürüp && zincirini kırıyor | Boyut dosyalarını `\n` ile bitir |
| `yazi_yola` döngüde çağrılınca değişken font her seferinde örneklenip betik dakikalarca sürüyor | `_font()` lru_cache ile önbellekte (düzeltildi; 4 sn) |
| Banner kartında yazı + sosyal ikonlar kartın dışına taşıyor | Genişliği ölç, sığana kadar ölçeği %2 küçült; sonucu yazdır |
| Kolajda sahne katmanı düz bir kenarla kesiliyor | Sahneyi yuvarlak köşeli, hafif dönük "kâğıt parçası" clipPath'ine al |
| Çember yazılı amblem 48 px altında okunmuyor | Profil için yazısız rozeti öner; amblemi büyük kullanımlara bırak |
| Font yüklenmeden ekran görüntüsü alınması (yedek fontla render) | `marka_render.js` `document.fonts.ready` bekler; yeni araç yazarsan aynısını yap |
