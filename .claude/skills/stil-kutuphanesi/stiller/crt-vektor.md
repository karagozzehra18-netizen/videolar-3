# CRT vektör  (`crt-vektor`)

| | |
|---|---|
| Aile | Ekran |
| Korku uyumu | ★★★ |
| İlk kare/parlaklık riski | YÜKSEK: koyu zemin — ilk karede çizgi patlaması, sahnenin ≥%35'i parlak |
| Motor | yazılmadı |
| Kaynak teknik (animation-styles) | `84 hologram-hud → screens/hologram.tsx` (`.claude/skills/animation-styles/src/styles/`) |
| Kaynak teknik (lemo-opuscar) | `ascii-crt/STYLE.md · oscilloscope-math/STYLE.md` (`~/lemo-opuscar/styles/`) |

## Palet
fosfor yeşili #7CFFB0 / amber #FFB547 çizgi; zemin koyu #0B1410
Marka renkleri yalnız üst bant, altyazı vurgusu, filigran ve bitiş ekranında (bkz. `kanal-kimligi`).

## Doku
tarama çizgileri, fosfor ışıması (bloom), ekran bombesi

## Çizgi
parlak vektör 3 px + ışıma

## Hareket
akıcı; çizgi kafası iz bırakır
Adım: **akıcı (her kare)** · sürekli hafif kamera kayması · en az 3 derinlik katmanı (ön/orta/arka, paralaks).

## Geçiş
ekran kapanıp açılma (yatay çizgi), sinyal kayması

## Ses tarifi
CRT vızıltısı, röle tıkırtısı
Kanal kuralı: 5-8 gerçekçi efekt, komik ses yok, müzik çok kısık (bkz. `ses`).

## Yapma
- koyu ilk kare (parlak çizgi patlaması ile aç)
- okunamayan küçük yazı
- Marka/logo/gerçek kişi; ekranda gereksiz yazı; boş köşe; karanlık ilk kare.
