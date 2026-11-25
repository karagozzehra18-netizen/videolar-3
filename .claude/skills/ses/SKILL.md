---
name: ses
description: Duyma Sakın'ın ses kuralları ve araçları — sabit kanal sesiyle seslendirme (ElevenLabs, kelime zaman damgaları), gerçekçi efekt tarifi yazma, efektlerin baştaki sessizliğini kırpma, "yalnız efekt" render'ıyla zamanlamayı ölçme, kısık müzik ve -14 LUFS / -1 dBTP son ses. Seslendirme, efekt ya da müzik üretirken, miks yaparken veya sesi denetlerken oku. Ücretli üretimden önce maliyeti kullanıcıya söyle.
---

# Ses

## Güvenlik ve maliyet
- Anahtar yalnız ortam değişkeni `ELEVENLABS_API_KEY`; asla basılmaz, dosyaya/git'e yazılmaz. Araçlar `araclar/ses_ortak.py` üzerinden okur.
- Her ücretli komut önce **onaysız** çalıştırılır → tahmini kredi yazar → kullanıcıya söyle → onay gelince `--onay`.
- Harcama her seferinde `/v1/user/subscription` öncesi/sonrası farkla **ölçülür** ve kullanıcıya söylenir.
- Plan (25.11.2026): Starter, aylık 40.000 kredi (ticari kullanım dahil), yenilenme her ayın 24'ü.
- Ölçülen gerçek maliyetler: 4 ses örneği × 80 karakter = **124 kredi** (multilingual v2 beklenenden ucuz çıktı). Efekt: resmî sayfa saniye başına 11-40 kredi diyor; `efekt_uret.py` en kötü durumu (40/sn) tahmin eder, gerçeği ölçer.

## Kanal sesi (sabit) — **Emin, 3 numara** (kullanıcı kararı 25.11.2026)
- **Emin – Storyteller** `2olWvHmrPO1obgZX9ivZ`, bütün cümleler. Hız: tek video 1,05; **hikâye serisi 1,0** (gerilim için daha ağır; duraklamalar `anlatim_duzenle.py --en-uzun 0,55`).
- Ölçülen: 5 part, 3.245 karakter seslendirme + 23 efekt → toplam sayaç ~2.200 kredi (25.11.2026; sayaç gecikmeli). Bir ara denenen "gerilimde Emin, sakin anlatımda Emrullah" düzeni kullanıcı tarafından bırakıldı.
- `bolum.json → ses.sesler.gerilim` = Emin; `ses.cumle_sesleri` hepsi `"gerilim"` (araç ikinci sesi destekler ama kullanılmıyor).
- Emin kütüphanede `rate 1` (2x ücretli değil). Kullanılmayan adaylar: Emrullah Uzun `DpEiQMnL9WxMsymCsjPY`, Can Seçkin `rSuyucEH95GpZEfLV0AM`, Gönül Filiz `xsGHrtxT5AdDzYXTQT0d`; örnekler `ses/ses-denemeleri/`.
- Model `eleven_multilingual_v2`, `language_code: tr`, çıktı `mp3_44100_128` (192 kbps Starter'da 403 verir).
- `seslendir.py`: art arda aynı roldeki cümleler **tek istekte** (komşu metin previous/next_text ile, tonlama tutarlı); parçalar `ses/parcalar/`'da önbelleklenir (değişmeyen parça yeniden ücretlendirilmez); parçalar konuşma seviyesine eşitlenip 0,40 sn boşlukla birleştirilir → `ses/anlatim.wav` + birleşik karakter hizalaması `ses/anlatim.json`.

## Efekt tarifi yazma kuralları
- 5-8 efekt türü / video. Her biri bir **görsel olaya** bağlı (`bolum.json → efektler[].olay`), olayla aynı karede başlar.
- Tarif İngilizce, somut ve fiziksel: kaynak + malzeme + ortam + mikrofon mesafesi + "realistic, no music". Örnek: *"an old wooden door slowly creaking open in a silent house at night, long low creak, realistic, no music"*.
- Komik/çizgi film sesi yok ("boing", "whoosh cartoon", 8-bit bip yasak). Çığlık, kan sesi yok.
- Süre verilerek üretilir (`sure`), `prompt_influence 0,6`.
- Tekrarlanan küçük ses (tık) tek dosya + `tekrar: {adet, aralik}`.

## Hazırlama ve ölçme
1. `efekt_uret.py <bolum> --onay` → ham mp3 → **baştaki sessizlik kırpılır** (zarfın tepe %10'unu aştığı an − 5 ms), tepe -1 dBFS'e çekilir, kuyruk kırpılır.
2. Ham tepe < -35 dBFS ya da RMS < -45 dBFS → **neredeyse sessiz**: tarifi değiştir, `--onay --yeniden <ad>`.
3. `anlatim_duzenle.py` → 0,45 sn'den uzun duraklamaları ortasından keser, hizalamayı kaydırır.
4. `ses_denetimi.py <bolum>` → yalnız efektlerden oluşan iz (`ses/yalniz-efekt.wav`) + her yerleşimin (ayrı izde) ölçülen başlangıcı. Fark > 1 kare = KALDI → `kayma` ya da kırpmayı düzelt.

## Müzik
- `muzik_uret.py` yerel, ücretsiz, telifsiz drone (kök 55 Hz + beşli + küçük üçlü, nefes gürültüsü).
- Miksajda **-26 dB**, konuşma varken **6 dB daha kısık** (-32 dB). Müzik hiçbir anda konuşmayı örtmez.

## Son ses
- `final_render.py`: anlatım + efektler + müzik → `loudnorm` iki geçiş (I=-14, TP=-1,5) + sınırlayıcı → **≈ -14 LUFS, tepe ≤ -1 dBTP**; MP4 içindeki ses `ebur128` ile yeniden ölçülür → `cikti/rapor.json`.
- Sesi dinleyemiyoruz: "dinlemedim, ölçtüm" diye raporla.
