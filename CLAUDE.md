# Duyma Sakın — Proje Hafızası

Her oturumun başında bu dosyayı oku. Kullanıcıyla **kısa ve Türkçe** konuş; uzun adım listeleri yerine işi kendin yap. Yalnız şifre, onay ekranı ve karar gereken yerde sor. Kullanıcı tabletten çalışıyor.

Kullanıcının ilk ve tam isteği: `belgeler/ilk-istek.md`. Kurallar ve sıra oradan gelir; aşağıdaki özet onunla çelişirse kullanıcıya sor.

## Kanal
- **Ad:** Duyma Sakın · **Kullanıcı adı:** @duymasakin (YouTube açık; Instagram/TikTok aynı adla açılacak)
- **Tür:** Yüzsüz, **tamamen kodla çizilmiş** animasyonlu kısa korku hikâyeleri (Shorts/Reels/TikTok), Türkçe, 25-35 sn.
- **Konular:** Şehir efsaneleri, Anadolu halk anlatıları, açıklanamayan olaylar.
- **Görsel kimlik:** Açık renkli, sade, düz renk. Ayrıntı: `kanal-kimligi` skill'i. Seçili dosyalar: `marka/secili/`.
- **Her video farklı bir animasyon stilinde;** art arda iki video aynı stilde olmaz.

## Değişmez kurallar
1. **Kanca:** İlk cümle ≤7 kelime, şaşırtıcı iddia ya da soru, mümkünse "sen". Tarihle, yerle ya da "Bir zamanlar" ile başlama.
2. **İlk kare:** En çarpıcı ve parlak kare; ilk 0,5 sn'de büyük hareket. Logo ile açılış yok.
3. **Tempo:** Her ~2 sn'de yeni görsel olay; boş panel/köşe yok. Son cümle başa bağlanır (döngü), ardından 3 sn **hareketli** bitiş ekranı: soru + Beğen/Takip et/Paylaş + YouTube/Instagram/TikTok logoları + @duymasakin.
4. **Ekran:** **Tam ekran** çizim (çerçeve yok). Üst solda başlık kartı (kategori + başlık), üst sağda rozet filigran — ikisi her videoda aynı, stilden bağımsız; süre/ilerleme çubuğu YOK. Kelime kelime altyazı **yatayda ortada**, stilin sabit ön katmanının üstünde; **çizimin üstüne binmez**; sayılar yazıyla.
5. **Ses:** 5-8 gerçekçi efekt (komik yok), her efekt olayla aynı karede (ölçerek). Müzik çok kısık. Son ses ≈ -14 LUFS, tepe ≤ -1 dBTP.
6. **Doğruluk:** Her bilgiyi web'den doğrula; kesin değilse "anlatılır". Sayıların kaynağını kaydet. Gerçek kişiyi karalama, ölümü istismar etme, tehlikeye özendirme.
7. **Kontrol:** "Bitti" demeden ≥15 kare çıkarıp bak (taşan yazı, boş alan, karanlık kare, üst üste binme); kapağı gör; sesi ölç. Ölçemediğini açıkça söyle.
8. **Kapak:** 2 satır, satır başına ≤10 karakter; anlatımdan kesin iddia kurmaz.
9. **Yükleme:** Her güne tek video. Yükleme, yayın, silme, tarih değiştirme **her seferinde önce kullanıcıya sor**. YouTube başlığında emoji ve #shorts yok. "AI ile oluşturulmuş" etiketini açma (animasyon kodla çiziliyor).
10. **Ölçüm:** Her videodan 48 saat sonra "izlemeye devam edenler" oranı ve izlenme tabloya; sonraki video buna göre değişir.
11. **Güvenlik:** API anahtarları asla sohbete, dosyaya ya da git'e yazılmaz/okunmaz/basılmaz. ElevenLabs anahtarı ortam değişkeni `ELEVENLABS_API_KEY` (kullanıcı ortam ayarına kaydetti). Ücretli servis/kredi harcamadan **önce maliyeti söyle**. Şifre girme; giriş ekranlarını kullanıcı yapar.
12. **Skill kurma:** Dış skill'i kurmadan önce oku (ağ çağrısı, ücretli servis, lisans); `npx`/`npm` kurulum komutlarını körü körüne çalıştırma. Envanter: `.claude/skills/KAYNAKLAR.md`.
13. **Git:** Dal `claude/githupa-baglan-youtube-repo-6dwnvh`. Her iş sonunda commit + push. `.env` ve büyük videolar git'e girmez.

## Hangi iş için hangi skill
| İş | Skill |
|---|---|
| Marka rengi, font, logo, filigran, üst bant, bitiş ekranı, kapak düzeni | `kanal-kimligi` (önce bu) |
| Logo/banner/marka görseli üretme | `logo-tasarim`, `logo-design`, `svg-creator`, `brand-identity` |
| Video sahnesi kodlama, render | `remotion-best-practices` (yönlendirici), `remotion-*`, `hyperframes*` |
| Animasyon stilleri (stil kütüphanesi kaynağı) | `animation-styles` (39 stil), `lemo-opuscar` (99 film stili), `style-sampling` |
| Hareket, kamera, kompozisyon | `animation-principles`, `motion-art-direction`, `shot-composition`, `rossark-motion-skill`, `video-shotcraft` |
| 3D sahne | `threejs-*`, `threejs-scene` |
| ffmpeg, kare çıkarma, loudness | `ffmpeg-skill`, `frame-capture` |
| Senaryo/kanca, başlık-kapak, açıklama, plan, izleyici tutma | `yt-script`, `yt-package`, `yt-seo`, `yt-plan`, `yt-retention`, `yt-viral`, `yt-audit` |
| Referans video çözümleme (yalnız teknik öğrenmek için) | `rea-video`, `reverse-any-video` |
| **Bir videoyu baştan sona üretmek (önce bu)** | `video-uretim` |
| Konu puanlama, kanca, senaryo, konu havuzu | `senaryo` |
| Stil seçimi, stil sayfaları, stil motoru, stil geçmişi | `stil-kutuphanesi` |
| Seslendirme (kanal sesi), efekt, müzik, miks, loudness | `ses` |
| Altyazı ve ekran yerleşimi / güvenli alanlar | `altyazi` |
| Başlık-açıklama-etiket, takvim | `yukleme-ve-takvim` |
| 48 saat ölçümü ve ders | `olcum` |

## Klasörler
| Yol | İçerik |
|---|---|
| `marka/secili/` | **Seçili** profil, banner, filigranlar, yatay logo (+ SVG) |
| `marka/logo/v6/uret.py` | Seçili logonun tek kaynağı (v6 A). Eski turlar `marka/logo/eski, v2-v5` (arşiv) |
| `marka/fontlar/` | Fraunces, Inter (+ eski Anton, Cormorant), OFL lisansları |
| `marka/kanal-aciklamalari.md` | YouTube/Instagram/TikTok açıklamaları (sınırlar ölçüldü) |
| `araclar/` | Video: `bolum_hazirla.py` (zaman çizelgesi + senaryo kapıları), `seslendir.py`, `anlatim_duzenle.py`, `efekt_uret.py`, `muzik_uret.py`, `ses_denetimi.py`, `final_render.py`, `kontrol_panosu.py`, `takvim_denetle.py`. Marka: `marka_render.js`, `logo_kontrol.js`, `banner_kontrol.js`, `yazi_yola.py` |
| `uretim/` | Remotion projesi: `src/marka/` (üst bant, altyazı, filigran, bitiş, **kapak şablonu**), `src/motor/` (stil motoru sözleşmesi), `src/stiller/` (motorlar), `src/bolumler/b<no>/` (sahne kodu) |
| `bolumler/<no>-<konu>/` | Bölüm: `bolum.json`, `arastirma.md`, `zaman.json`, `yukleme.md`, `ses/`, `cikti/` (mp4/wav git'e girmez) |
| `takvim/takvim.csv`, `olcum/tablo.csv` | Yayın planının asıl kaydı; 48 saat ölçüm tablosu |
| `.mcp.json` | ElevenLabs resmî MCP (sürüm sabit 0.12.2), anahtarı `ELEVENLABS_API_KEY`'den okur |
| `fikirler/`, `senaryolar/`, `aciklamalar/`, `yayinlanan/` | Eski taslak klasörler (yerine `bolumler/`, `senaryo/konu-havuzu.md`). `ses/ses-denemeleri/` kanal sesi örnekleri |
| `belgeler/ilk-istek.md` | Kullanıcının tam isteği |

## Durum (son güncelleme: 25.11.2026)
- ✅ Ortam, kanal kimliği, logo, banner, filigran, açıklamalar, 80 dış skill.
- ✅ ElevenLabs: Starter plan, aylık 40.000 kredi (ticari kullanım dahil), yenilenme 24.12.2026. Anlatıcı sesi: **Emin** (3 numara, `2olWvHmrPO1obgZX9ivZ`), bütün cümleler — `ses` skill'i.
- ✅ 4. adım: 7 kendi skill'i + araçlar + Remotion üretim projesi + stil kütüphanesi (30 sayfa; motor: gölge oyunu).
- ✅ Kapak formatı kullanıcıyla belirlendi: etiket hapı · 2 satır · çerçeveli sahne kartı · logo/numara/İZLE şeridi (`kanal-kimligi`).
- ✅ 5. adım: deneme videosu `bolumler/001-karabasan` (33,7 sn, tam ekran, Emin, hareketli bitiş, -14,8 LUFS, -1,3 dBTP, 24 kare kontrol temiz, 20 efekt yerleşimi ±0,1 kare). **Yüklenmedi, takvime eklenmedi.**
- ⚠️ Depo herkese açık olabilir; kullanıcıdan Private yapması istendi — kontrol et.
- ⏳ Sıradaki: kullanıcı geri bildirimi → yükleme tarihi (onayla) → 2. video (farklı stil, `stil-kutuphanesi/gecmis.csv`).
- Git: bu oturumun dalı `ccr-cac89f1a-do5gc6` (önceki dal `claude/githupa-baglan-youtube-repo-6dwnvh`).

## Bilinen tuzaklar (genel)
| Sorun | Çözüm |
|---|---|
| Tablet uygulaması bu makinedeki dosyaları düzenleyemiyor, `.env` açılmıyor; güvenli anahtar kartı tablette çıkmadı | Anahtarlar ortam ayarı → Environment variables (yeni oturumda yüklenir) |
| Instagram otomatik kullanıcı adı kontrolüne izin vermiyor | Kullanıcı uygulamadan kontrol eder |
| `rsync` yok | `tar cf - … | tar xf -` ile kopyala |
| Değişkenli `rm -rf $D/$x` güvenlik kontrolüne takılır | `rm -rf "${D:?}/${x:?}"` |
| `cmd | head` Python betiğini BrokenPipe ile yarıda keser | Çıktıyı kısaltmak yerine betiği tam çalıştır |
