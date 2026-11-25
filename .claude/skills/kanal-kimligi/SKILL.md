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
| `marka/secili/filigran-video.png` (550x124, şeffaf) | **Her Shorts/Reels/TikTok videosuna gömülür** | 1080x1920 karede yükseklik 64 px (genişlik ≈284), sağdan 60 px, üstten 290 px, opaklık %90. Sabit, hareket etmez. Platform düğme alanlarına (üst 170 px, sağ şerit y 880-1740, alt 330 px) girmez. |
| `marka/secili/filigran-youtube.png` (300x300, arka plan tamamen şeffaf) | YouTube Studio → Özelleştirme → Filigran, "Videonun tamamı" | YouTube bunu **yalnız yatay videolarda** gösterir; Shorts'ta görünmez (YouTube Yardım, 2026). |

- Filigran kuralı: YouTube filigranı arka plansız (şeffaf) ve **açık renk** işaret olur; lacivert işaret koyu sahnede kaybolur (test edildi). Koyu gölge açık sahnede okunurluğu sağlar.

## Açılış
- **Logo ya da kanal adıyla açılış YOK.** İlk kare videonun en çarpıcı görüntüsüdür (bkz. `video-uretim`).

## Üst bant (tüm videolarda sabit)
- En üstte ince bölümlü ilerleme çubuğu: dolu bölüm `mercan`, boş bölüm `kâğıt` %35 opak, yükseklik 8 px (1080x1920).
- Altında kısa başlık: Inter 700, 34 px, `kâğıt` rengi + koyu gölge (her sahnede okunsun), en fazla 24 karakter.
- Üst bant platform üst simgelerinin altında başlar (y ≥ 190).

## Bitiş ekranı (2,5 sn, 1080x1920)
1. 0,0 s: Hikâyenin son karesi 6 karede `kâğıt` zemine açılır (beyaz flaş değil, yumuşak geçiş); tek bir alçak "nefes" sesi.
2. 0,2 s: Rozet logo 0,8→1,0 ölçekle belirir (merkez, 420 px); krem dikiş çizgileri sırayla "dikilir".
3. 0,6 s: Altında "Duyma" (lacivert) "Sakın" (mercan), Fraunces 800, 110 px.
4. 1,0 s: Altında "Takip et — bir sonrakini kaçırma" (Inter 600, 42 px, lacivert %70).
5. Zeminde banner desenindeki şekiller (ses dalgası, dikiş, nokta) hafifçe süzülür.
6. 2,5 s: Son kare; döngü başına sert kesme.

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
