---
name: stil-kutuphanesi
description: Duyma Sakın'ın animasyon stil kütüphanesi — animation-styles (39 stil) ve lemo-opuscar (~100 stil) üzerine kurulu 30 stil sayfası (palet, doku, çizgi, hareket, geçiş, ses tarifi, yapma listesi), stil geçmişi ve kodda "stil motoru" sözleşmesi. Bir video için stil seçerken, yeni stil motoru yazarken ya da hangi stilin ne zaman kullanıldığını kontrol ederken oku.
---

# Stil kütüphanesi

## Kural
- **Her video farklı stilde; art arda iki video aynı stilde olmaz** (`araclar/takvim_denetle.py` kontrol eder).
- Seçmeden önce `gecmis.csv`'ye bak; seçince satır ekle (tarih, no, slug, stil).
- Marka renkleri stilin içine girmez; yalnız üst bant, altyazı vurgusu, filigran, bitiş ekranı sabittir.
- Stiller genel tekniktir: marka, logo, bilinen karakter, gerçek kişi kopyalanmaz.
- Kanal görsel kimliği açık renkli: **koyu zeminli stillerde** (crt-vektor, kara-tahta, parlayan-eskiz) ilk kare yine parlak olmalı — sayfadaki "ışık riski" notuna uy.

## Dosyalar
| Yol | İçerik |
|---|---|
| `katalog.csv` | 30 stil: slug, ad, aile, korku uyumu, ışık riski, motor durumu, kaynak dosyalar |
| `stiller/<slug>.md` | Stil sayfası (palet, doku, çizgi, hareket, geçiş, ses, yapma) |
| `gecmis.csv` | Hangi stil hangi tarihte, hangi bölümde kullanıldı |
| `stil_sayfasi_uret.py` | Sayfaları tek tablodan üretir; yeni stil = tabloya satır + `python3 stil_sayfasi_uret.py` |

## Kaynaklar (teknik öğrenmek için okunur, kopyalanmaz)
- **animation-styles** (`.claude/skills/animation-styles/src/styles/…`): 39 stilin Remotion/SVG kodu. Sayfadaki dosyayı aç; filtreler, doku, hareket karakteri oradan uyarlanır. Orijinallere dokunma.
- **lemo-opuscar** (`~/lemo-opuscar/styles/<klasör>/STYLE.md`; yoksa `sh .claude/skills/lemo-opuscar/scripts/setup.sh` indirir): her stilin malzeme, renk mantığı, hareket ve kamera dili, ses paleti. ✦ işaretli stiller görüntü üreteci ister — KULLANMA (kodla çizim kuralı).

## Stil motoru (kodda)
Sözleşme: `uretim/src/motor/tip.ts` → `StilMotoru`:
`slug`, `ad`, `palet` (zemin katmanları, mürekkep, vurgular, ışık), `cizgi` (kalınlık, uç), `hareket` (adim 1/2/3, titreme, kamera kayması), `Sahne` (zemin + doku + ışık + kamera + **stile uyan çerçeve** — üst bant ve altyazı bandı çerçevenin üstünde durur), `gecis(f, bas, uz)`.
Yazılmış motorlar: `uretim/src/stiller/golge-oyunu.tsx`. Yeni motor:
1. Sayfayı ve kaynak kodu oku. 2. `uretim/src/stiller/<slug>.tsx` → `StilMotoru` + stilin primitifleri (ör. `Kukla`). 3. Yerleşim sabitleri `uretim/src/marka/yerlesim.ts` (SAHNE 40,292 → 1040,1340). 4. Sayfadaki "Motor" satırını "YAZILDI" yap. 5. Bitiş ekranı ve üst bant ortak bileşendir, stil başına yazılmaz.

Bölümün şekilleri (`sekiller.ts`) stilden bağımsız yazılır; aynı hikâye başka motorla yeniden çizilebilir (animation-styles'ın "şekil dosyası + stil dosyası" kuralı).

## Ortak görsel kurallar (her stil)
- En az 3 derinlik katmanı (arka/orta/ön) + paralaks; sürekli hafif kamera kayması.
- Her ~2 sn'de yeni görsel olay; boş panel/köşe yok (kontrol panosu 3x3 hücre kontrolü).
- Kusursuz döngü: son kare ilk kareyle aynı kadraj.
- Ekranda gereksiz yazı yok (altyazı ve üst bant dışında).

## Kullanıcının istediği stiller → sayfa
tahta baskı → `tahta-baski` · piksel → `piksel-sanat` · noir çizgi roman → `noir-cizgi-roman` · 1930'lar → `otuzlar-cizgi-film` · oyuncak tuğla → `oyuncak-tugla` · kil diorama → `kil-diorama` · CRT vektör → `crt-vektor` · örgü kukla → `orgu-kukla` · PS2 3D → `ps2-3d` · sumi → `sumi-murekkep` · pop art → `pop-art` · voksel → `voksel-3d` · risograf → `risograf` · masal kitabı → `masal-kitabi` · röntgen → `rontgen` · şeker dünyası → `seker-dunyasi` · VHS → `vhs-bozulmasi` · mozaik → `mozaik` · kara tahta → `kara-tahta` · nakış → `nakis` · parlayan eskiz → `parlayan-eskiz` · düz vektör → `duz-vektor` · minimal çizgi → `minimal-cizgi` · CGI → `cgi-hareket` · 3D anlatıcı → `anlatici-karakter` · ek: `golge-oyunu`, `kagit-isik-kutusu`, `gravur`, `sessiz-film`, `termal-kamera`.
