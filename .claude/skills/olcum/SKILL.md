---
name: olcum
description: Duyma Sakın performans ölçümü — her videodan 48 saat sonra "izlemeye devam edenler" oranı, ortalama izlenme süresi/yüzdesi, izlenme ve etkileşimi olcum/tablo.csv'ye yazma ve bir sonraki videoya tek bir ders çıkarma. Yayından 48 saat geçince, analiz istendiğinde ya da yeni videoya başlamadan önce oku.
---

# Ölçüm

## Ne zaman
Her video yayından **48 saat sonra** (takvimdeki `yayinda` tarihi + 2 gün). Yeni videoya başlamadan önce son ölçümün dersini oku.

## Nereden
Kullanıcı YouTube Studio → İçerik → video → Analiz → "Kitle elde tutma" (Shorts'ta **"İzlemeye devam edenler" / "Kaydırmak yerine izleyenler"** oranı), ortalama izlenme süresi, izlenme. Giriş ekranlarını kullanıcı yapar; ekran görüntüsü ya da sayıları sohbete verir. (API bağlantısı kurulursa aynı tablo otomatik doldurulur — kurmadan önce sor.)

## Tablo: `olcum/tablo.csv`
`no, slug, stil, yayin_tarihi, olcum_tarihi, izlenme, izlemeye_devam_eden_yuzde, ortalama_izlenme_sn, ortalama_izlenme_yuzde, begeni, yorum, abone_kazanimi, kanca, ders`

## Ders çıkarma (tek ders, uygulanabilir)
| Belirti | Olası neden | Sonraki videoda |
|---|---|---|
| İzlemeye devam < %60 | Kanca/ilk kare zayıf | Kanca kalıbını değiştir; ilk kareyi daha parlak/çarpıcı yap; ilk 0,5 sn hareketini büyüt |
| Ort. izlenme < %70 | Orta kısım yavaş | Olay aralığını 2 sn'den 1,5 sn'ye indir; cümle kısalt |
| Ort. izlenme > %100 | Döngü çalışıyor | Döngü yapısını koru |
| İzlenme düşük, oran iyi | Paket (kapak/başlık) zayıf | Kapak kelimelerini değiştir (şablon aynı kalır) |
| Stil bazlı fark | — | `stil-kutuphanesi/katalog.csv` korku uyumu puanını güncelle |

Ders `ders` sütununa ve bir sonraki bölümün `bolum.json → not` alanına yazılır. Üç videodan sonra stil ve kanca türüne göre ortalama çıkar.
