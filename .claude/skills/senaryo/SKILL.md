---
name: senaryo
description: Duyma Sakın için konu seçme (0-10 puan), kanca yazma ve 5-7 cümlelik 25-35 sn'lik korku senaryosu kurma kuralları + puanlı konu havuzu (konu-havuzu.md). Yeni konu ararken, senaryo yazarken, kancayı düzeltirken ya da konu havuzunu güncellerken oku.
---

# Senaryo

## 1. Konu puanlama (her ölçüt 0-2; **8 ve üstü üretilir**)
| Ölçüt | 0 | 1 | 2 |
|---|---|---|---|
| **Sen** — izleyiciye dokunuyor mu? | uzak, başkasının hikâyesi | "olabilir" | izleyicinin bedeni/evi/gecesi ("uyandın", "arkanda") |
| **Kanca gücü** | açıklama gerekiyor | ilginç | ilk 7 kelimede tüyler diken |
| **İlk kare gücü** | soyut | çizilebilir | tek bakışta okunan, parlak, çarpıcı görüntü |
| **Sürekli hareket** | konuşan kafa | 3-4 olay | her 2 sn'de çizilecek olay var |
| **Son: şaşırtma/döngü** | düz biter | küçük şaşırtma | son cümle ilk cümleye bağlanır |

Konu havuzu: `konu-havuzu.md` (puanlı). Kullanılanı "kullanıldı" işaretle; yeni konuyu web'den doğrulamadan havuza "doğrulandı" yazma.

## 2. Kanca kalıpları (ilk cümle ≤7 kelime)
- **Doğrudan durum:** "Uyandın ama kımıldayamıyorsun." (sen + beden)
- **Soru:** "Sana gece biri seslense ne yaparsın?"
- **Bildiğin yanlış:** "Bildiğin yanlış: aynalar kötü şey göstermez…"
- **Küçük ama şaşırtıcı gerçek:** "Yüz kişiden sekizi bunu yaşıyor."
- **Bedenin kancası:** "Bedenin bazen senden önce uyanır."
- **YASAK açılış:** tarih ("1974'te…"), yer ("Erzurum'da bir köyde…"), "Bir zamanlar", "Bugün size…", kanal adı.

## 3. Yapı (5-7 cümle, ~55-65 kelime, 25-32 sn konuşma)
1. **Kanca** (≤7 kelime) — ilk kareyle aynı anda.
2. **İlk şaşkınlık** — durumu bedene/izleyiciye bağla.
3. **Gelişme** — halk anlatısı ("anlatılır") ya da olay.
4. **Açıklama / sayı** — bilimsel ya da kayıtlı bilgi, kaynaklı.
5. **"Ama"** — tersine dönüş, en tuhaf ayrıntı.
6. **Döngü** — yarım kalan cümle, ilk cümleye bağlanır ("Ve bir gece gözlerini açtığında…" → "Uyandın ama…").

Kurallar:
- **Sayılar yazıyla** ("yüz kişiden yaklaşık sekizi"); rakam `bolum_hazirla.py` tarafından HATA sayılır.
- Kesin olmayan: "anlatılır", "söylenir", "yaklaşık", "kayıtlara göre".
- Her sayının hesabı ve kaynağı `arastirma.md`'de.
- Gerçek kişiyi karalama yok, ölüm istismarı yok, "sen de dene" yok, kan/vahşet yok.
- Her cümlede en az bir **çizilebilir olay** olmalı; `bolum.json → olaylar` bu kelimelere bağlanır (~2 sn'de bir).
- Cümleler kısa; virgülde altyazı parçası biter.

## 4. bolum.json alanları
`cumleler` (dizi), `olaylar` ({ad, cumle, kelime, kayma}), `efektler` ({ad, olay, sure, db, tarif, tekrar?}), `kapak` ({satir1, satir2 ≤10 karakter, etiket, zemin_kare, renk, desen}), `bitis` ({soru: izleyiciye yorum sorusu, vurgu: mercan kelime}), `bant_baslik` (≤24 karakter), `stil`, `ses` (kanal sesi Emin; `cumle_sesleri` hepsi `gerilim` — bkz. `ses`).
Örnek: `bolumler/001-karabasan/bolum.json`.
