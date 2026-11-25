---
name: yukleme-ve-takvim
description: Duyma Sakın yükleme ve yayın takvimi — her güne tek video, takvim dosyası (planın asıl kaydı) ve denetim betiği, YouTube/Instagram/TikTok başlık-açıklama-etiket-sabit yorum biçimi, her video için zorunlu paket (başlık + açıklama + kapak). Yükleme metni yazarken, tarih planlarken ya da yükleme/yayın/silme/tarih değişikliği konuşulurken oku. Bu işlemlerin her biri için ÖNCE kullanıcıya sor.
---

# Yükleme ve takvim

## Değişmez
- **Her güne tek video.** Takvim asıl kayıttır: `takvim/takvim.csv` (tarih, no, slug, stil, youtube_baslik, durum, platformlar, not).
- **Yükleme, yayın, silme, tarih değiştirme: her seferinde önce kullanıcıya sor.** Onaysız takvime satır yazma.
- Denetim: `python3 araclar/takvim_denetle.py` → aynı güne iki video, art arda aynı stil, biçim hatası; "ilk boş gün".
- "AI ile oluşturulmuş / değiştirilmiş içerik" etiketini AÇMA: animasyon kodla çiziliyor (ses sentetik ama gerçekçi kişi/olay taklidi değil). Platform kuralı değişirse kullanıcıya sor.

## Her videonun paketi (hepsi birlikte üretilir)
1. `cikti/<slug>.mp4` 2. `cikti/kapak.png` (**şablon her videoda aynı**: numara rozeti "N. VİDEO", 2 satır Fraunces 900, kâğıt + mercan, köşede rozet logo) 3. `yukleme.md` (aşağıdaki biçim)

## yukleme.md biçimi
```
# <no>. video — <konu>
## YouTube
Başlık (≤60 karakter, emoji YOK, #shorts YOK, kanca + konu): Uyandın ama kımıldayamıyorsun: Karabasan
Açıklama:
  1. satır: merak cümlesi (anlatımla aynı kesinlikte)
  2. boş satır, "Kaynaklar:" + kısa kaynak listesi (arastirma.md'den)
  3. "Kulaklığını tak. Işığı kapatma. — Duyma Sakın"
  4. en fazla 3 hashtag (#karabasan #korku #uykufelci) — #shorts yok
Etiketler (virgüllü, ≤500 karakter): karabasan, uyku felci, korku hikayesi, ...
Sabit yorum: izleyiciye soru ("Sen hiç yaşadın mı? Kaç yaşındaydın?")
## Instagram (Reels)
Açıklama: 1-2 cümle + soru + 3-5 hashtag; kapak aynı.
## TikTok
Açıklama (≤150 karakter önerilir) + 3-5 hashtag.
```

## Takvim akışı
1. `takvim_denetle.py` → ilk boş gün. 2. Kullanıcıya "X tarihine planlayayım mı?" diye sor. 3. Onay → satır ekle (`durum=planli`). 4. Yükleme kullanıcı tarafından ya da onaylı araçla; sonra `durum=yuklendi`/`yayinda`. 5. Yayından 48 saat sonra `olcum`.
