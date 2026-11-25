---
name: kanal-kimligi
description: Duyma Sakın kanalının kimliği — ad, ton, renkler, yazı tipleri, logo, filigran, üst bant, bitiş ekranı ve kapak düzeni. Bir video sahnesi, kapak, bitiş ekranı, banner, profil görseli ya da kanal metni yazmadan veya çizmeden ÖNCE oku; markaya ait bir renk, font, dosya ya da ifade seçerken buradaki değerleri kullan.
---

# Kanal Kimliği — Duyma Sakın

## Kimlik
| Alan | Değer |
|---|---|
| Ad | **Duyma Sakın** (yazımda "Sakın" büyük S, noktasız ı) |
| Kullanıcı adı | `@duymasakin` (YouTube, Instagram, TikTok) |
| Tür | Yüzsüz, kodla çizilmiş animasyonlu kısa korku hikâyeleri (25-35 sn) |
| Konular | Şehir efsaneleri, Anadolu halk anlatıları (karabasan, al karısı, gulyabani…), açıklanamayan olaylar |
| Slogan | "Kulaklığını tak. Işığı kapatma." |
| Görsel kimlik | **Açık renkli, sade, düz renk** (kullanıcı kararı). Karanlık/neon marka dili kullanılmaz; korku hissi videonun içindeki sahnelerden gelir. |

## Ton
- İzleyiciye **"sen"** diye fısıldayan, sakin ama tedirgin edici anlatıcı. Bağırmaz, abartmaz.
- Merak önce, korku sonra: her cümle bir sonrakini dinletmeli.
- Kesin olmayan her şey "anlatılır", "söylenir", "kayıtlara göre" ile verilir.
- **Asla:** kan/vahşet tasviri, gerçek kişiyi karalama, ölümü istismar etme, tehlikeli bir şeyi denemeye özendirme ("sen de dene" yok), çizgi film/komik ses.

## Logo — SEÇİLDİ: v6 A "Dikişli Kulak" (açık, sade)
- Krem rozet, ince lacivert dış çizgi, **mercan disk**, üstünde **lacivert kulak**, kulak kanalı **krem dikişle** kapatılmış.
- Kaynak: `python3 marka/logo/v6/uret.py` → `logo-a.svg` (tek doğru kaynak; değişiklik orada yapılır).
- 32 px'te kulak ve dikiş okunuyor (ölçüldü, kontrol panosu `marka/logo/v6/render/kontrol-panosu.png`).
- Eski turlar yalnız arşiv: `marka/logo/eski`, `v2`, `v3`, `v4` (koyu neon; yedeği `v4/secili-yedek/`), `v5` (manzaralı, reddedildi).

### Seçili dosyalar (`marka/secili/`)
| Dosya | Kullanım |
|---|---|
| `profil-1024.png`, `profil-800.png`, `profil-320.png`, `profil-200.png` | Profil fotoğrafı (üç platform) |
| `logo.svg` | Rozet logo kaynağı (vektör) |
| `yatay-logo.png` / `.svg`, `yatay-logo-koyu-zemin.png` | Rozet + "Duyma Sakın" yazısı |
| `banner-youtube.png` / `.svg` | YouTube banner 2560x1440 |
| `filigran-video.png` | Shorts/Reels/TikTok'a gömülen filigran |
| `filigran-youtube.png` / `.svg` | YouTube Studio kanal filigranı: **tamamen şeffaf**, yalnız açık renk kulak + mercan dikiş, hafif gölge (300x300). Yedek: `filigran-youtube-rozet.png` |

## Renkler (v6)
| Ad | Hex | Kullanım |
|---|---|---|
| kâğıt | `#FBF6EC` | Ana açık zemin (banner, kart, filigran hapı) |
| krem | `#F7EEDC` | Rozet çerçevesi, ikincil açık zemin |
| lacivert | `#22264A` | Ana metin, logo çizgileri, kart çerçevesi |
| mercan | `#E8573F` | Ana vurgu: logo diski, "Sakın", ilerleme çubuğu, ikonlar |
| hardal | `#F4BE4F` | İkincil vurgu (desen, küçük işaretler) |
| lavanta | `#C9C2E6` | Desen, yumuşak alanlar |
| şeftali | `#F6C2A2` | Desen, yumuşak alanlar |
| teal | `#3F8077` | Desen (az) |

Kurallar:
- Bir karede **tek ana vurgu** mercan; hardal/lavanta/şeftali/teal yalnız desen ve küçük işaretlerde.
- Videolarda her videonun kendi stil paleti vardır (bkz. `stil-kutuphanesi`); marka renkleri yalnız **üst bant, altyazı vurgusu, filigran ve bitiş ekranında** sabittir.
- İlk kare korku konusunda bile parlak ve yüksek kontrastlı olur.

## Yazı tipleri (`marka/fontlar/`, hepsi OFL)
| Font | Dosya | Kullanım |
|---|---|---|
| Fraunces 800-900 | `Fraunces[SOFT,WONK,opsz,wght].ttf` | Logo yazısı, banner başlığı, kapak yazısı, bitiş ekranı adı |
| Inter 600-800 | `Inter[opsz,wght].ttf` | Altyazı, üst bant başlığı, küçük metin |
| Anton, Cormorant | — | Eski turlardan; yeni işte kullanılmaz |

- Logo ve banner'da yazılar **vektör yola çevrilir** (`araclar/yazi_yola.py`); canlı `<text>` yok.
- Türkçe: Fraunces ve Inter ı, İ, ş, Ş, ğ, Ğ, ç, ö, ü, â glifine sahip (ölçüldü). Büyük harfe çevirirken `toLocaleUpperCase('tr-TR')`.

## Filigran
| Dosya | Nerede | Kural |
|---|---|---|
| **Vektör rozet logo** (`uretim/src/marka/Filigran.tsx`, PNG değil) | **Her Shorts/Reels/TikTok videosuna gömülür** | 92 px, sağdan 56, üstten 196 (başlık kartıyla aynı hizada), opaklık %95, yumuşak gölge, çok yavaş nefes (±%1,5). Her videoda aynı, stilden bağımsız. (Eski `filigran-video.png` hapı 25.11.2026'da bırakıldı: küçükte ucuz duruyordu.) |
| `marka/secili/filigran-youtube.png` (300x300, arka plan tamamen şeffaf) | YouTube Studio → Özelleştirme → Filigran, "Videonun tamamı" | YouTube bunu **yalnız yatay videolarda** gösterir; Shorts'ta görünmez (YouTube Yardım, 2026). |

- Filigran kuralı: YouTube filigranı arka plansız (şeffaf) ve **açık renk** işaret olur; lacivert işaret koyu sahnede kaybolur (test edildi). Koyu gölge açık sahnede okunurluğu sağlar.

## Açılış
- **Logo ya da kanal adıyla açılış YOK.** İlk kare videonun en çarpıcı görüntüsüdür (bkz. `video-uretim`).

## Ekran formatı (tüm videolarda sabit, kullanıcı kararı 25.11.2026)
- **Tam ekran:** çizim 1080x1920'nin tamamını kaplar; ahşap çerçeve/kutu yok.
- **Üst sol — başlık kartı** (`UstBant.tsx`, her videoda aynı, stilden bağımsız): yarı saydam lacivert buzlu cam kart (%74, blur 10, ince krem kenar, köşe 18), solda 6 px mercan çizgi; üstte kategori (Inter 800, 19 px, harf aralığı 3,5, mercan, `bolum.json → kapak.etiket`), altında başlık (Fraunces 800, 44 px, kâğıt, `bant_baslik`, ≤24 karakter). x 56, y 192. **Süre/ilerleme çubuğu YOK.**
- **Üst sağ — rozet filigran** (aynı hizada, bkz. Filigran).
- **Altyazı (güncel, 25.11.2026):** ekranın ORTASINDA (y 1040-1186), orta büyüklük (Inter 800, 58 px), çizimin üzerinde, koyu kontur + gölge; söylenen kelime hardal. (Eski gölge oyunu denemesinde altta sabit tahta üstündeydi.)

## Bitiş ekranı (3 sn, 90 kare, HAREKETLİ) — kullanıcı kararı 25.11.2026
Kod: `uretim/src/marka/BitisEkrani.tsx` (her videoda aynı; bölüm yalnız soruyu verir: `bolum.json → bitis {soru, vurgu}`).
1. 0-6: Hikâyenin son karesi donar ve `kâğıt` zemine yumuşakça açılır (beyaz flaş yok); "nefes" efekti.
2. 0-30: Rozet logo dönerek büyür (280 px), krem dikişler sırayla "dikilir"; altında "Duyma **Sakın**" (Fraunces 800, 96 px).
3. 16-34: **Soru** kelime kelime zıplar (Fraunces 800, 92 px, vurgu kelimesi mercan), ör. "Sen hiç **yaşadın** mı?"; altında "Cevabını yorumlara yaz ↓". Soru yoksa başlık "Beğen, takip et, paylaş!".
4. 34-48: **Beğen** (mercan, kalp) · **Takip et** (lacivert, +) · **Paylaş** (teal, ok) düğmeleri sırayla zıplar.
5. 44 / 52 / 60: Dokunan "parmak" düğmeden düğmeye gider ve basar: kalp dolar, + → ✓ "Takiptesin", paylaş oku uçar; halka dalgası. Her dokunuşta "tik" efekti (aynı kare; `BitisEkrani.DOKUNMA`).
6. 50-72: **YouTube, Instagram, TikTok** logoları sırayla yükselir, hafifçe süzülür; altında **@duymasakin**.
7. Zeminde ses dalgası, kayan dikiş çizgisi, süzülen noktalar sürekli hareket eder. 90. karede döngü başına sert kesme.
- İçerik x 150-930, y 200-1500 (platform düğmeleri ve alt yazı alanından uzak).
- Platform logoları sade, kodla çizilmiş "bizi burada bul" işaretleridir; değiştirilmez, başka marka eklenmez.

## Kapak (1080x1920) — SABİT ŞABLON (kullanıcı onaylı format, 25.11.2026)
Kod: `uretim/src/marka/Kapak.tsx` (bölüm başına yalnız veri değişir: `bolum.json → kapak`). Örnek: `bolumler/001-karabasan/cikti/kapak.png`.
1. **Zemin:** bölümün stil renginde radyal degrade (`kapak.renk`) + dağınık yumuşak kareler (`kapak.desen`, %18). Tam ekran yazı YOK.
2. **Etiket hapı** (y 330): "KORKU · ANADOLU" gibi `kategori · alt konu`, Inter 800 30 px, mercan zemin, kâğıt yazı, lacivert alt gölge.
3. **Başlık** (y 400): 2 satır, **satır başına ≤10 karakter**, Fraunces 900 (≤150 px, sığana kadar küçülür), kâğıt dolgu + lacivert kontur ve gölge. Normal yazım (büyük harfe çevrilmez).
4. **Sahne kartı** (x 100-980, y 700): videonun **temiz** karesinden (üst bant/altyazı/filigran yok) yalnız çizim alanı; 12 px mercan çerçeve, yuvarlak köşe, lacivert alt gölge. Kare: hikâyenin en çarpıcı anı (`kapak.zemin_kare`).
5. **Alt şerit** (kartın içinde, altta): rozet logo · "Duyma Sakın" · "KORKU #001" (kategori + üç haneli numara) · mercan "▶ İZLE" hapı.
- Kapak anlatımdan daha kesin bir iddia kurmaz (soru biçimi tercih edilir).

## Kanal metinleri
- Hazır açıklamalar: `marka/kanal-aciklamalari.md` (YouTube ≤1000, Instagram ≤150, TikTok ≤80 karakter; sınırlar ölçüldü).
- YouTube başlığında emoji ve `#shorts` yok. Instagram/TikTok biyografisinde tek emoji (🎧) serbest.
