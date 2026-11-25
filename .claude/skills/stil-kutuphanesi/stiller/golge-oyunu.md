# Gölge oyunu (renkli deri)  (`golge-oyunu`)

| | |
|---|---|
| Aile | Kâğıt ve kukla |
| Korku uyumu | ★★★ |
| İlk kare/parlaklık riski | düşük (perde parlak) |
| Motor | YAZILDI: uretim/src/stiller/golge-oyunu.tsx |
| Kaynak teknik (animation-styles) | `27 shadow-puppet → toon-and-paper/paper.tsx (ShadowPuppet)` (`.claude/skills/animation-styles/src/styles/`) |
| Kaynak teknik (lemo-opuscar) | `shadow-puppet/STYLE.md` (`~/lemo-opuscar/styles/`) |

## Palet
bez #FFF6D6→#F8D892→#DC9A4A→#8E4D1D · mürekkep #2A160B · deri: kırmızı #D4432A, turkuaz #2A9C8F, hardal #EAB335, mor #7D4A90 · çerçeve ahşap #3B2414
Marka renkleri yalnız üst bant, altyazı vurgusu, filigran ve bitiş ekranında (bkz. `kanal-kimligi`).

## Doku
arkadan aydınlatılmış dokuma bez (ince fraktal gürültü %22), lamba sıcak noktası, kenarda vinyet, ışığı geçiren renkli deri parçaları, oyuklar (göz, pencere) perdeyi gösterir

## Çizgi
çizgi yok: dolu siluet; çubuklar 6 px yuvarlak uçlu; pimler açık bej nokta

## Hareket
eklemli kukla: yalnız dönme ve kayma, esneme YOK; çubuk mikro titremesi; perdeden uzaklaşan bulanıklaşır ve büyür (derinlik = bulanıklık)
Adım: **akıcı (her kare)** · sürekli hafif kamera kayması · en az 3 derinlik katmanı (ön/orta/arka, paralaks).

## Geçiş
lamba söner-yanar (ışık 1→0,55→1, ortada sahne değişir), perde sarsıntısı, kuklanın perdeden çekilip bulanıklaşması

## Ses tarifi
yağ lambası çıtırtısı, ahşap çubuk tıkırtısı, bez hışırtısı; müzik: çok kısık drone ya da tek ney/kemençe notası
Kanal kuralı: 5-8 gerçekçi efekt, komik ses yok, müzik çok kısık (bkz. `ses`).

## Yapma
- bilinen geleneksel gölge oyunu karakterlerini (adı, kıyafeti, siluetiyle) kopyalama
- beyaz flaş
- kuklayı büken/esneten hareket
- perdenin tamamen kararması (ışık en az 0,55)
- Marka/logo/gerçek kişi; ekranda gereksiz yazı; boş köşe; karanlık ilk kare.
