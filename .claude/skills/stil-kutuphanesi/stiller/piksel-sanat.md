# Piksel sanat  (`piksel-sanat`)

| | |
|---|---|
| Aile | Ekran |
| Korku uyumu | ★★☆ |
| İlk kare/parlaklık riski | orta (gece sahnesi açık tutulmalı) |
| Motor | yazılmadı |
| Kaynak teknik (animation-styles) | `64 pixel-art-rpg → screens/pixel.tsx` (`.claude/skills/animation-styles/src/styles/`) |
| Kaynak teknik (lemo-opuscar) | `pixel-rpg/STYLE.md · hd-2d/STYLE.md` (`~/lemo-opuscar/styles/`) |

## Palet
sınırlı 16 renk; açık gece mavisi #6C8BD5 zemin, kâğıt sarısı ışık #F4E3A1, koyu #1E1B2E
Marka renkleri yalnız üst bant, altyazı vurgusu, filigran ve bitiş ekranında (bkz. `kanal-kimligi`).

## Doku
piksel ızgarası (1 piksel = 8 px), sıralı dithering, keskin kenar

## Çizgi
1 piksel kontur

## Hareket
12 fps (üçer kare); bekleme animasyonu 2-4 kare döngü
Adım: **üçer kare** · sürekli hafif kamera kayması · en az 3 derinlik katmanı (ön/orta/arka, paralaks).

## Geçiş
piksel çözünme, satır satır silinme, ekran perdesi

## Ses tarifi
GERÇEKÇİ efekt (8-bit bip YOK); çok kısık chiptune değil drone
Kanal kuralı: 5-8 gerçekçi efekt, komik ses yok, müzik çok kısık (bkz. `ses`).

## Yapma
- bilinen oyun sprite'ı/karakteri
- alt-piksel kayma (hep tam piksel)
- bulanıklık
- Marka/logo/gerçek kişi; ekranda gereksiz yazı; boş köşe; karanlık ilk kare.
