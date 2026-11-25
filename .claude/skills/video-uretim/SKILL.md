---
name: video-uretim
description: Duyma Sakın için bir videoyu baştan sona üretme sırası ve ölçülen kapılar (konu → araştırma → senaryo → ses → sahne kodu → görüntü kontrolü → ses kontrolü → final render → kapak → yükleme metni → takvim). Yeni bir video üretirken, bir adımı yeniden yaparken ya da "bitti" demeden önce oku. Sonundaki "bilinen tuzaklar" tablosuna her yeni hatayı ekle.
---

# Video üretimi — adımlar ve kapılar

Her adımın sonunda bir **kapı** var. Kapıyı ölçmeden geçme; ölçemediğini açıkça yaz ("sesi dinleyemedim, ölçtüm").
Bölüm klasörü: `bolumler/<no3>-<konu>/` (ör. `001-karabasan`). Kod: `uretim/src/bolumler/b<no3>/`. Araçlar: `araclar/`.

| # | Adım | Ne yapılır | Kapı (ölçüm) |
|---|---|---|---|
| 1 | Konu | `senaryo` skill'i: konu havuzundan puanı ≥8 olanı seç | Puan tablosu ≥8; son 3 videodan farklı alt tür |
| 2 | Araştırma | Her bilgiyi web'den doğrula → `arastirma.md` (ifade · dayanak · kaynak URL · kesinlik) | Her sayının hesabı + kaynağı yazılı; kesin olmayan "anlatılır/yaklaşık" |
| 3 | Senaryo | `bolum.json` → `cumleler`, `olaylar`, `efektler`, `kapak` | `python3 araclar/bolum_hazirla.py <bolum> --tahmini` HATA vermez (kanca ≤7 kelime, rakam yok, altyazı sığar) |
| 4 | Stil | `stil-kutuphanesi`: son videodan farklı stil seç, `gecmis.csv`'ye yaz | `takvim_denetle.py` art arda aynı stil HATASI yok |
| 5 | Ses | **Önce maliyeti söyle, onay al.** `seslendir.py --onay` → `anlatim_duzenle.py` → `bolum_hazirla.py` → `efekt_uret.py --onay` → `muzik_uret.py` | Harcanan kredi ölçüldü; süre 25-35 sn; sessiz efekt yok |
| 6 | Sahne kodu | `uretim/src/bolumler/b<no>/` (şekiller + Video.tsx), `Root.tsx`'e video+kapak kaydı. Zamanlar yalnız `zaman.json`'dan | `npx tsc --noEmit` temiz; birkaç `remotion still` ile bak |
| 7 | Görüntü kontrolü | Önizleme render → `kontrol_panosu.py <mp4> --kare 20` → panoyu **Read ile aç ve bak** | ≥15 kare; karanlık/boş/taşan yazı yok; ilk kare parlak + 0,5 sn'de büyük hareket; tempo uyarısı yok |
| 8 | Ses kontrolü | `ses_denetimi.py <bolum>` (yalnız efekt render'ı) | Her efekt olay karesiyle ±1 kare; 5-8 efekt türü |
| 9 | Final render | `final_render.py <bolum> --kapak-kare <n>` | -14 LUFS ±1, tepe ≤ -1 dBTP (rapor.json); son panoya tekrar bak |
| 10 | Kapak | Kapak şablonu (değişmez) → `cikti/kapak.png`, **Read ile bak** | 2 satır, ≤10 karakter/satır; anlatımdan kesin iddia yok; numara doğru |
| 11 | Yükleme metni | `yukleme-ve-takvim`: başlık, açıklama, etiket, sabit yorum → `yukleme.md` | Başlıkta emoji/#shorts yok; kaynaklar açıklamada |
| 12 | Takvim | Kullanıcıya **sor**, onaylanırsa `takvim/takvim.csv`'ye ekle | `takvim_denetle.py` hatasız |
| 13 | Teslim | Videoyu, kapağı, kontrol panosunu ve sonuçları kullanıcıya dosya olarak gönder; commit + push (mp4 hariç) | — |

## Komut sırası (kopyala)
```bash
B=bolumler/002-konu
python3 araclar/bolum_hazirla.py $B --tahmini        # senaryo kapıları
python3 araclar/seslendir.py $B                      # maliyet → kullanıcıya söyle
python3 araclar/seslendir.py $B --onay
python3 araclar/anlatim_duzenle.py $B                # uzun duraklamaları kısalt (ücretsiz)
python3 araclar/bolum_hazirla.py $B                  # gerçek kelime zamanları
python3 araclar/efekt_uret.py $B && python3 araclar/efekt_uret.py $B --onay
python3 araclar/muzik_uret.py $B
python3 araclar/ses_denetimi.py $B
(cd uretim && npx remotion render src/index.ts b002 ../$B/cikti/onizleme.mp4 --muted --crf=22)
python3 araclar/kontrol_panosu.py $B/cikti/onizleme.mp4 --kare 20
python3 araclar/final_render.py $B --kapak-kare 12
python3 araclar/kontrol_panosu.py $B/cikti/002-konu.mp4 --kare 20
```

## Profesyonel standart (özet; ayrıntı CLAUDE.md)
- Tam ekran çizim, üstte yalnız kısa başlık, altyazı ortada ve sabit ön katmanın üstünde.
- Kanca ≤7 kelime, "sen"; ilk kare en parlak ve çarpıcı, 0,5 sn'de büyük hareket; logo ile açılış yok.
- 25-35 sn; ~2 sn'de bir yeni görsel olay (bolum_hazirla tempo uyarısı); boş köşe yok.
- Son cümle ilk cümleye bağlanır; ilk ve son kare aynı kadraj (döngü); sonra 3 sn hareketli bitiş ekranı (soru + Beğen/Takip et/Paylaş + platform logoları; `bolum.json → bitis.soru`, dokunuş efekti `tik` olay `bitis` kayma 44, tekrar 3×8).
- En az 3 derinlik katmanı, sürekli hafif kamera kayması, ekranda gereksiz yazı yok.

## Bilinen tuzaklar
| Sorun | Çözüm |
|---|---|
| Remotion Chrome indirmeye çalışır | `uretim/remotion.config.ts` yerel headless Chromium'u kullanır (`/opt/pw-browsers/...`) |
| `document.fonts.add` TypeScript hatası | `fontlar.ts`'teki tip dönüşümü; fontlar `delayRender` ile yüklenir |
| Ahşap deseni perdenin üstüne taştı (dalgalı çizgiler) | Çerçeve deseni evenodd yol ile yalnız perde dışına |
| Yatan kişinin başı kedi gibi göründü (sivri burun + saç) | Profil yolu yumuşak eğrilerle; burun küçük; yakın planda `remotion still` ile kırpıp bak |
| Altyazıda tek kelime sola kaymış görünüyor | Sıradaki kelimeler %30 soluk görünür, satır kaymaz |
| Kontrol panosu bitiş ekranında "taşan yazı" alarmı verdi | Bitiş ekranı kareleri hikâye kontrolünden çıkarıldı (`zaman.json` → bitis) |
| Tahmini zamanla süre 35 sn'yi aştı | Gerçek ses gelince yeniden ölç; uzunsa cümle kısalt, `hiz` en fazla 1,05 |
| ElevenLabs kütüphanesindeki bazı sesler 2x ücretli (`rate: 2`) | Ses seçerken `rate ≤ 1` olanları dene |
| Çıplak `cmd | head` Python betiğini BrokenPipe ile keser | Çıktıyı kısaltma, betiği tam çalıştır |
| ElevenLabs `mp3_44100_192` → HTTP 403 (Starter planında yok) | `mp3_44100_128` kullan |
| Kredi sayacı gecikmeli güncelleniyor ("harcanan 0") | Birkaç dakika sonra `/v1/user/subscription` ile tekrar ölç; toplamı bölüm sonunda raporla |
| Seçilen ses yavaş: konuşma 32 sn, toplam 35,1 sn | `anlatim_duzenle.py` ile 0,45 sn'den uzun duraklamaları kısalt (1,9 sn kazanıldı); hız 1,05 |
| Efekt dosyalarının başında 0,8-1 sn sessizlik vardı (kalp, yükselen) | `efekt_uret.py` kırpar; `ses_denetimi.py` ile ölç |
| Tekrarlanan "tık" efektleri ses denetiminde birbirini ölçüyordu | Her yerleşim ayrı izde ölçülür |
| Lamba geçişi kareyi karartıyordu (parlaklık 0,23) | Geçiş en fazla %45 karartır (ışık ≥0,55) |
| Tek ses yerine iki ses istendi (gerilim/anlatıcı) | Mevcut kayıt hizalamayla kesilip önbelleğe kondu; yalnız yeni rolün cümleleri üretildi (190 karakter) |
| Kullanıcı süre çubuğunu, çerçeveyi ve ikinci sesi istemedi | Tam ekran çizim + sabit ön katman (altyazı zemini), yalnız başlık, tek ses Emin. Eski Emin kaydı önbellekten kullanıldı (0 kredi) |
| Tam ekranda başlık raftaki çizime biniyordu | Üst sol köşede (x 60-260, y 190-250) figür koyma |
| Bitiş ekranının ilk karesi siyahtı (zemin opaklığı 0) | Son hikâye karesi donar, bitiş ekranı üstüne açılır (Video.tsx) |
| Başlık (düz beyaz yazı) ve PNG filigran hapı amatör durdu | Buzlu cam başlık kartı + vektör rozet filigran (kanal-kimligi) |
| Tam ekran yazılı kapak istenmedi | Sabit kapak şablonu: etiket · 2 satır · çerçeveli sahne kartı · logo şeridi (kanal-kimligi) |
| Loudnorm sonrası sınırlayıcı sonucu -14,9 LUFS'a çekiyor | ±1 LU içinde; daha yakın istenirse loudnorm hedefini -13,5 yap |
