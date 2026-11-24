# 🎬 YouTube Kanalım — Video Çalışma Alanı

Bu depo, YouTube kanalımın tüm planlama ve üretim sürecini tek bir yerde toplamak için oluşturuldu:
fikirler, senaryolar, video açıklamaları, küçük resim (thumbnail) taslakları ve yayın takibi.

## 📁 Klasör Yapısı

| Klasör | İçerik |
| --- | --- |
| `fikirler/` | Video fikirleri listesi (`fikirler.md`) |
| `senaryolar/` | Her video için senaryo / çekim metni. Yeni video için `_sablon/` klasörünü kopyala |
| `aciklamalar/` | YouTube açıklama metinleri, etiketler ve başlık seçenekleri |
| `kucuk-resimler/` | Thumbnail taslakları (küçük PNG/JPG dosyaları) |
| `yayinlanan/` | Yayınlanan videoların kaydı (`liste.md`) |

## 🔄 İş Akışı

1. **Fikir** → `fikirler/fikirler.md` dosyasına ekle veya GitHub'da "🎥 Video Fikri" issue'su aç.
2. **Senaryo** → `senaryolar/_sablon/` klasörünü `senaryolar/YYYY-AA-GG-video-adi/` olarak kopyala ve doldur.
3. **Açıklama** → `aciklamalar/sablon.md` dosyasını kopyalayıp başlık, açıklama ve etiketleri yaz.
4. **Thumbnail** → Taslağı `kucuk-resimler/` klasörüne koy.
5. **Yayın** → Video yayınlandıktan sonra `yayinlanan/liste.md` dosyasına ekle.

## ⚠️ Not: Büyük Video Dosyaları

Ham video ve proje dosyaları (`.mp4`, `.mov`, `.prproj` vb.) çok büyük olduğu için `.gitignore`
ile dışarıda bırakıldı. Bunları Google Drive, harici disk vb. bir yerde sakla; burada sadece
metin ve küçük görseller tutulur.
