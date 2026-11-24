---
name: kanal-kimligi
description: Duyma Sakın kanalının kimliği — ad, ton, renkler, yazı tipleri, logo, bitiş ekranı ve kapak düzeni. Bir video sahnesi, kapak, bitiş ekranı, banner, profil görseli ya da kanal metni yazmadan veya çizmeden ÖNCE oku; markaya ait bir renk, font ya da ifade seçerken buradaki değerleri kullan.
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

## Ton
- İzleyiciye **"sen"** diye fısıldayan, sakin ama tedirgin edici anlatıcı. Bağırmaz, abartmaz.
- Merak önce, korku sonra: her cümle bir sonrakini dinletmeli.
- Kesin olmayan her şey "anlatılır", "söylenir", "kayıtlara göre" ile verilir.
- **Asla:** kan/vahşet tasviri, gerçek kişiyi karalama, ölümü istismar etme, tehlikeli bir şeyi denemeye özendirme ("sen de dene" yok), çizgi film/komik ses.

## Renkler
| Ad | Hex | Kullanım |
|---|---|---|
| gece | `#0A0A0D` | Ana zemin, logo zemini |
| kemik | `#EDE6D6` | Ana metin, logo çizgileri |
| sinyal | `#FF2E3B` | Tek vurgu: logodaki ses, "SAKIN", kapakta kilit kelime, ilerleme çubuğu |
| kül | `#6B6A72` | İkincil öğeler, pasif çubuk bölümleri |
| sis | `#B4B0B8` | Koyu zeminde ikincil metin |

Kurallar:
- Kırmızı bir karede **tek bir** öğede kullanılır; yayılmaz.
- Videolarda her videonun kendi stil paleti vardır (bkz. `stil-kutuphanesi`); marka renkleri yalnız **üst bant, altyazı vurgusu ve bitiş ekranında** sabittir.
- İlk kare korku konusunda bile parlak ve yüksek kontrastlı olur; "gece" zemini ilk karenin tamamını kaplamaz.

## Yazı tipleri (`marka/fontlar/`, OFL lisanslı)
| Font | Dosya | Kullanım |
|---|---|---|
| Anton | `Anton-Regular.ttf` | Başlık, kapak, bitiş ekranı adı. Hep BÜYÜK HARF. |
| Inter (değişken) | `Inter[opsz,wght].ttf` | Altyazı (600-800), alt metin (500-600) |

Türkçe: Her iki font ı, İ, ş, Ş, ğ, Ğ, ç, ö, ü glifine sahip. Büyük harfe çevirirken JS'de `toLocaleUpperCase('tr-TR')` kullan ("sakın" → "SAKIN", "i" → "İ").

## Logo
- Seçili logo: **A — "Kesik dalga"** (`marka/logo/logo-a-dalga.svg`): sessizlik içinde tek kırmızı ses çubuğu ve altından damla.
- Alternatifler (saklı): `logo-b-kulak.svg` (kulak-soru işareti), `logo-c-goz.svg` (dinleyen göz).
- Profil dosyaları: `marka/logo/profil-800.png`, `profil-320.png`, `profil-200.png`.
- Logoyu değiştirmek ya da yeni marka görseli yapmak için `logo-tasarim` skill'ini oku.

## Filigran
| Dosya | Nerede | Kural |
|---|---|---|
| `marka/filigran/filigran-video.png` (600x128, şeffaf) | **Her Shorts/Reels/TikTok videosuna gömülür** | 1080x1920 karede 300x64, sağdan 60 px, üstten 290 px, opaklık %85. Videonun tamamında sabit, hareket etmez. Platform düğme alanlarına (üst 170 px, sağ şerit y 880-1740, alt 330 px) asla girmez. |
| `marka/filigran/filigran-youtube-300.png` (300x300, şeffaf) | YouTube Studio → Özelleştirme → Filigran, "Videonun tamamı" | YouTube bunu **yalnız yatay videolarda** gösterir; Shorts'ta görünmez (YouTube Yardım, 2026). Bu yüzden Shorts'ta gömülü filigran şart. |

- Yerleşim kontrolü: `marka/filigran/yerlesim-onizleme.html` render edilip bakılır.
- Filigran yazısı her zaman koyu hap zemin üstünde (parlak karede kırmızı "SAKIN" kaybolmasın).

## Açılış
- **Logo ya da kanal adıyla açılış YOK.** İlk kare videonun en çarpıcı görüntüsüdür (bkz. `video-uretim`).

## Üst bant (tüm videolarda sabit)
- En üstte ince bölümlü ilerleme çubuğu: dolu bölüm `sinyal`, boş bölüm `kül` %40 opak, yükseklik 8 px (1080x1920 kare).
- Altında kısa başlık: Inter 700, 34 px, `kemik`, en fazla 24 karakter.
- Platform güvenli alanı: üstten ilk 180 px'e yalnız bu bant girer.

## Bitiş ekranı (2,5 sn, 1080x1920)
1. 0,0 s: Hikâyenin son karesi 6 karede `gece`ye kararır; tek bir alçak "nefes" sesi.
2. 0,2 s: Logo 0,8→1,0 ölçekle belirir (merkez, 360 px), kırmızı çubuk bir kez "titrer".
3. 0,6 s: Logonun altında "DUYMA SAKIN" (Anton 120 px, "SAKIN" kırmızı).
4. 1,0 s: Altında "Takip et — bir sonrakini kaçırma" (Inter 600, 44 px, `sis`).
5. 2,5 s: Son kare; döngü başına dönerken sert kesme (yumuşak geçiş yok).

## Kapak (1080x1920)
- **2 satır, satır başına en fazla 10 karakter**, Anton, büyük harf.
- Bir satır `kemik`, kilit kelime `sinyal`. Yazı alanı dikey ortanın biraz üstünde (y ≈ %35-55), kenarlardan en az 90 px içeride.
- Kapak anlatımdan daha kesin bir iddia kurmaz ("GERÇEK OLDU" değil, "KİMSE AÇIKLAYAMADI" gibi anlatılanla tutarlı).
- Arka plan: videodaki en çarpıcı kare, %30 koyulaştırılmış.

## Kanal metinleri
- Hazır açıklamalar: `marka/kanal-aciklamalari.md` (YouTube ≤1000, Instagram ≤150, TikTok ≤80 karakter; sınırlar ölçüldü).
- YouTube başlığında emoji ve `#shorts` yok. Instagram/TikTok biyografisinde tek emoji (🎧) serbest.
