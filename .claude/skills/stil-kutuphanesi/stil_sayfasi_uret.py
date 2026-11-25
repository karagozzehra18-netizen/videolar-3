#!/usr/bin/env python3
"""stil_sayfasi_uret.py — stiller/*.md ve katalog.csv dosyalarını aşağıdaki tek tablodan (S) üretir.
Kullanım: cd .claude/skills/stil-kutuphanesi && python3 stil_sayfasi_uret.py   (sayfaları elle düzenleme; tabloyu düzenle)"""
import csv
AS = ".claude/skills/animation-styles/src/styles/"
LO = "~/lemo-opuscar/styles/"
# slug, ad, aile, as_kaynak, lo_kaynak, palet, doku, cizgi, hareket, adim, gecis, ses, yapma, korku, isik_riski, motor
S = [
("golge-oyunu","Gölge oyunu (renkli deri)","Kâğıt ve kukla","27 shadow-puppet → toon-and-paper/paper.tsx (ShadowPuppet)","shadow-puppet/STYLE.md",
 "bez #FFF6D6→#F8D892→#DC9A4A→#8E4D1D · mürekkep #2A160B · deri: kırmızı #D4432A, turkuaz #2A9C8F, hardal #EAB335, mor #7D4A90 · çerçeve ahşap #3B2414",
 "arkadan aydınlatılmış dokuma bez (ince fraktal gürültü %22), lamba sıcak noktası, kenarda vinyet, ışığı geçiren renkli deri parçaları, oyuklar (göz, pencere) perdeyi gösterir",
 "çizgi yok: dolu siluet; çubuklar 6 px yuvarlak uçlu; pimler açık bej nokta","eklemli kukla: yalnız dönme ve kayma, esneme YOK; çubuk mikro titremesi; perdeden uzaklaşan bulanıklaşır ve büyür (derinlik = bulanıklık)",1,
 "lamba söner-yanar (ışık 1→0,55→1, ortada sahne değişir), perde sarsıntısı, kuklanın perdeden çekilip bulanıklaşması",
 "yağ lambası çıtırtısı, ahşap çubuk tıkırtısı, bez hışırtısı; müzik: çok kısık drone ya da tek ney/kemençe notası",
 "bilinen geleneksel gölge oyunu karakterlerini (adı, kıyafeti, siluetiyle) kopyalama; beyaz flaş; kuklayı büken/esneten hareket; perdenin tamamen kararması (ışık en az 0,55)",
 3,"düşük (perde parlak)","YAZILDI: uretim/src/stiller/golge-oyunu.tsx"),
("tahta-baski","Tahta baskı (woodcut)","Baskı","28 woodcut → print-and-abstract/print.tsx (Woodcut)","woodcut/STYLE.md",
 "kâğıt #EFE6D2 · mürekkep #1B1712 · tek vurgu kırmızı #B8322A (kan değil: lamba, göz, işaret)",
 "oyma çizgi tarama, ahşap damarı, mürekkebin tutmadığı beyaz lekeler, kâğıt lifi","kalın-ince oyma çizgisi 3-10 px, uçları sivri","basamaklı (ikişer kare), ağır ve kararlı; kamera yavaş kayar",2,
 "baskı presi: kâğıt kalkar, yeni baskı iner; mürekkep merdanesi geçişi","kâğıt sürtünmesi, oyma bıçağı, merdane; tek davul vuruşu",
 "gradyan ve yumuşak gölge; fotoğraf gerçekçiliği; ikiden fazla renk",3,"düşük","yazılmadı"),
("piksel-sanat","Piksel sanat","Ekran","64 pixel-art-rpg → screens/pixel.tsx","pixel-rpg/STYLE.md · hd-2d/STYLE.md",
 "sınırlı 16 renk; açık gece mavisi #6C8BD5 zemin, kâğıt sarısı ışık #F4E3A1, koyu #1E1B2E",
 "piksel ızgarası (1 piksel = 8 px), sıralı dithering, keskin kenar","1 piksel kontur","12 fps (üçer kare); bekleme animasyonu 2-4 kare döngü",3,
 "piksel çözünme, satır satır silinme, ekran perdesi","GERÇEKÇİ efekt (8-bit bip YOK); çok kısık chiptune değil drone",
 "bilinen oyun sprite'ı/karakteri; alt-piksel kayma (hep tam piksel); bulanıklık",2,"orta (gece sahnesi açık tutulmalı)","yazılmadı"),
("noir-cizgi-roman","Noir çizgi roman","Baskı","31 silkscreen-poster → print-and-abstract/print.tsx","halftone-dossier/STYLE.md",
 "kâğıt #F3EDE0 · siyah #111 · tek kırmızı #D73A2F · gri tram",
 "Benday/tram noktaları, kalın gölge blokları, panel kenarları","fırça kontur 4-12 px, değişken","panelden panele kesme + panel içi yavaş itme; basamaklı 2",2,
 "panel kayması, sayfa çevirme, gölgenin paneli yutması","yağmur, ayak sesi, kibrit; çok kısık caz kontrbas",
 "bilinen kahraman/kostüm; ses yansıması yazıları (BAM vb.)",3,"orta (siyah alan %40'ı geçmesin)","yazılmadı"),
("otuzlar-cizgi-film","1930'lar çizgi filmi","Sinema","70 silent-film → graphic-and-cinema/graphic-and-cinema.tsx","rubber-hose/STYLE.md · silent-film/STYLE.md",
 "sepya krem #EDE3CC · siyah #1A1714 · gri tonlar",
 "film greni, toz, dikey çizik, ışık titremesi (±%4), köşe vinyeti","lastik hortum: eşit kalınlık 6 px, yuvarlak","zıplayan bekleme döngüsü, lastik kollar; ikişer kare",2,
 "iris (daire kapanır/açılır), film yanığı değil","gerçekçi efekt; çok kısık eski plak cızırtısı",
 "bilinen fare/kedi karakteri, beyaz eldiven ikonu, komik 'boing' sesleri",2,"düşük","yazılmadı"),
("oyuncak-tugla","Oyuncak tuğla","3D görünüm","58 brick-toy → 3d/island-and-bricks.ts","brick-toy/STYLE.md",
 "parlak plastik: kırmızı #D7372B, sarı #F2C230, mavi #2F6FC1, beyaz zemin #F4F1EA",
 "tümsekler, plastik parlaması, hafif yüzey çiziği","yok (3D kenar)","stop-motion ikişer kare; parçalar tık diye yerine oturur",2,
 "tuğla tuğla sökülüp yeniden kurulma","plastik tıkırtısı; korku için uzak ses",
 "marka adı, logo, minifigür kafası/elleri",1,"düşük","yazılmadı"),
("kil-diorama","Kil diorama","3D görünüm","62 claymation → 3d/clay-and-lidar.ts","crayon-world/STYLE.md (3D yaklaşım)",
 "pastel kil: şeftali #F2B79A, adaçayı #9DB89A, gece mavisi #4E5D8C, krem #F3E9D8",
 "parmak izi, kil pürüzü, yumuşak gölge","yok","stop-motion ikişer kare + kaynama (boil) 1-2 px",2,
 "kilin ezilip yeni şekle açılması","nemli kil sesi, ahşap gıcırtısı",
 "bilinen kil karakterleri (köpek, koyun vb.)",2,"düşük","yazılmadı"),
("crt-vektor","CRT vektör","Ekran","84 hologram-hud → screens/hologram.tsx","ascii-crt/STYLE.md · oscilloscope-math/STYLE.md",
 "fosfor yeşili #7CFFB0 / amber #FFB547 çizgi; zemin koyu #0B1410",
 "tarama çizgileri, fosfor ışıması (bloom), ekran bombesi","parlak vektör 3 px + ışıma","akıcı; çizgi kafası iz bırakır",1,
 "ekran kapanıp açılma (yatay çizgi), sinyal kayması","CRT vızıltısı, röle tıkırtısı",
 "koyu ilk kare (parlak çizgi patlaması ile aç); okunamayan küçük yazı",3,"YÜKSEK: koyu zemin — ilk karede çizgi patlaması, sahnenin ≥%35'i parlak","yazılmadı"),
("orgu-kukla","Örgü kukla","Zanaat","— (kaynak yok; nakis motoruyla ortak doku)","—",
 "yün: krem #F1E6D0, hardal #E2A93B, kiremit #C65A3A, gece #384A7A",
 "örgü ilmeği deseni (V dokusu), tüy, düğme göz","yok; ilmek kenarı","kukla zıplaması, ikişer kare, yumuşak sallanma",2,
 "ipliğin çözülüp yeniden örülmesi","yün hışırtısı, şiş tıkırtısı",
 "bilinen kukla gösterisi karakterleri",2,"düşük","yazılmadı (kendi motoru gerekir)"),
("ps2-3d","PS2 dönemi 3D","3D görünüm","57 low-poly-island → 3d/island-and-bricks.ts","lowpoly-island/STYLE.md",
 "sisli pastel: açık gri #CFCFD6, soluk yeşil #9FB59B, turuncu ışık #F1A75A",
 "düşük çözünürlüklü doku, köşe titremesi (vertex jitter), sis, renk bantlaşması","yok","akıcı ama 20 fps hissi; kamera ağır döner",1,
 "sise gömülme, yükleme ekranı değil","rüzgâr, uzak yankı",
 "bilinen oyun haritası/karakteri; logo",3,"orta (sis açık tutulmalı)","yazılmadı"),
("sumi-murekkep","Sumi mürekkebi","Zanaat","13 one-line → drawn/line.tsx (fırça mantığı)","ink-wash/STYLE.md",
 "pirinç kâğıdı #F4EFE3 · mürekkep #1C1B19 (seyreltik griler) · tek kırmızı mühür #C2372C",
 "mürekkep yayılması, kuru fırça, kâğıt lifi","fırça: 2-30 px değişken, kuru uç","akıcı fırça çekişi, boş alan bilinçli (ama boş köşe kuralı: sis/mürekkep lekesi ile doldur)",1,
 "mürekkebin suda yayılması","fırça sürtünmesi, rüzgâr, tek gong",
 "Çince yazı/mühür taklidi; anlamsız harf",3,"düşük","yazılmadı"),
("pop-art","Pop art","Baskı","51 sticker-explainer → info/info.tsx (renk blokları)","pop-art/STYLE.md",
 "CMY: camgöbeği #3BB4E6, macenta #E6407A, sarı #FFD93B, siyah",
 "Benday noktaları, kayık baskı","kalın siyah 8 px","sert vuruşlu kesmeler, tekrar paneller",1,
 "ızgara tekrar (4 panel), renk değişimi","sert kesme sesleri yok; gerçekçi efekt",
 "bilinen sanatçı eserinin birebir kompozisyonu",1,"düşük","yazılmadı"),
("voksel-3d","Voksel 3D","3D görünüm","58 brick-toy → 3d/mesh.ts (küp örgü)","isometric-picture-book/STYLE.md",
 "pastel küpler, gece mavisi gölge",
 "küp kenarı ambiyans kapatma, düz ışık","yok","küp küp kurulma, akıcı kamera",1,
 "küplerin dağılıp yeniden dizilmesi","tık tık yerleşme",
 "bilinen blok oyunu dokusu/karakteri",2,"düşük","yazılmadı"),
("risograf","Risograf baskı","Baskı","31 silkscreen-poster → print-and-abstract/print.tsx","risograph/STYLE.md",
 "iki-üç spot renk: floresan pembe #FF48B0, mavi #0078BF, sarı #FFE800 üst üste; kâğıt #F5F1E6",
 "kayık hizalama, tanecik, üst üste binme karışımı","düz dolgu","basamaklı 2, katmanlar ayrı kayar",2,
 "renk katmanlarının sırayla basılması","kâğıt besleme, makine ritmi (çok kısık)",
 "dörtten fazla renk",2,"düşük","yazılmadı"),
("masal-kitabi","Masal kitabı (suluboya)","El çizimi","11 watercolour → drawn/paint.tsx","watercolor/STYLE.md · crayon-book/STYLE.md",
 "suluboya: gece mavisi #4A5E8E, şeftali #F1B48E, adaçayı #A9C1A0, kâğıt #FBF6EC",
 "boya birikmesi kenarı, granülasyon, kâğıt dokusu","kurşun kalem kontur 2 px, titrek","sayfa çevirme, yavaş paralaks; boil 1 px",2,
 "sayfa çevrilmesi, boyanın yayılarak açılması","sayfa hışırtısı, rüzgâr, uzak baykuş",
 "bilinen masal çizerinin karakterleri",2,"düşük","yazılmadı"),
("rontgen","Röntgen (ışık kutusu)","Araç ve kanıt","81 microscope → screens/microscope.tsx","security-xray/STYLE.md",
 "AÇIK varyant: ışık kutusu beyazı #EAF2F6, film mavisi #3E6E96, kemik #F5F8FA, kırmızı işaret",
 "film negatifi, ışık kutusu panelleri, kenarda film klipsi","ince 1-2 px ölçü çizgisi","tarama çizgisi geçer, katmanlar soyulur; akıcı",1,
 "film değiştirme (klips sesi), tarayıcı geçişi","ışık kutusu vızıltısı, film klipsi",
 "gerçek hasta görüntüsü, gerçek kişinin röntgeni",3,"orta (koyu film yerine ışık kutusu kullan)","yazılmadı"),
("seker-dunyasi","Şeker dünyası","Grafik","39 memphis-diorama → graphic-and-cinema/graphic-and-cinema.tsx","memphis-diorama/STYLE.md",
 "pastel şeker: pembe #F7A8C4, nane #A8E6CF, limon #FFF1A8, lila #CDB4F6",
 "parlak sır, şeker kristali, yumuşak gölge","yok","yumuşak zıplama, jöle titremesi (tek esneme serbest)",1,
 "şekerin erimesi/akması","cam şeker çıtırtısı; korku zıtlığı: tatlı zemin + tedirgin ses",
 "bilinen şeker markası/ambalajı",1,"düşük","yazılmadı"),
("vhs-bozulmasi","VHS bozulması (liminal)","Film ve bant","71 newsreel → graphic-and-cinema/graphic-and-cinema.tsx","backrooms/STYLE.md",
 "solgun sarı #E8DC9A, floresan beyaz #F4F4E8, halı bej #CDBB86",
 "bant bozulması, renk kayması, tarama satırı, zaman kodu","yok","el kamerası titremesi, kayıt atlaması",1,
 "bant sarma, karlanma (1-2 kare)","floresan vızıltısı, bant motoru",
 "gerçek bir yerin kaydı; gerçek kişi görüntüsü",3,"düşük (sarı-beyaz)","yazılmadı"),
("mozaik","Mozaik","Zanaat","35 stained-glass → print-and-abstract/craft.tsx","stained-glass/STYLE.md · gilded-illumination/STYLE.md",
 "taş renkleri: terakota #C3693F, lacivert #2B3E73, altın #D9A63E, kemik #EFE3C8",
 "taş aralıkları (derz), parıltı, çatlak","derz 3 px koyu","taşların tek tek yerine oturması; akıcı ışık süpürmesi",1,
 "taşların dökülüp yeniden dizilmesi","taş tıkırtısı, yankılı oda",
 "dinî/kutsal ikonografi kopyası",2,"düşük","yazılmadı"),
("kara-tahta","Kara tahta","Tahta","02 chalkboard → drawn/boards.tsx","chalkboard/STYLE.md",
 "tahta yeşili #2F4A3A (açık tutulur) · tebeşir beyazı #F2F2EA · renkli tebeşir sarı/pembe",
 "tebeşir tozu, silinmiş izler, tahta lekesi","tebeşir 4-8 px pürüzlü","yazılarak belirme (stroke çizimi), ikişer kare",2,
 "silgi geçişi","tebeşir sürtünmesi, tahta tıkırtısı",
 "uzun yazı; ilk kare boş tahta",2,"YÜKSEK: koyu zemin — tahtayı açık yeşil tut, ilk karede büyük parlak çizim","yazılmadı"),
("nakis","Nakış","Zanaat","— (kaynak yok)","—",
 "keten #EFE7D8, iplik: kırmızı #C0392B, lacivert #22264A, hardal #E0A83A",
 "kumaş dokusu, kasnak, ilmek gölgesi","dikiş çizgisi 4 px kesik (dash)","iğnenin dikişi sırayla atması, ikişer kare",2,
 "kasnağın dönmesi, ipliğin çekilip sökülmesi","iğne-kumaş sesi, makas",
 "geleneksel motifin birebir kopyası",2,"düşük","yazılmadı (kendi motoru; logo dikiş diliyle uyumlu)"),
("parlayan-eskiz","Parlayan eskiz (siyah üstüne neon)","Işık ve çizgi","85 circuit-board → screens/circuit.tsx","neon-tubes/STYLE.md · firefly-pointillism/STYLE.md",
 "zemin #0D0D14 · neon mercan #FF6B5A, nane #6BFFD8, sarı #FFE66B",
 "ışıma (bloom), çizgi izi, hafif gren","neon 4 px + 20 px ışıma","çizgi çizilerek belirme, akıcı",1,
 "çizginin sönüp başka yerde yanması","neon vızıltısı, elektrik tıkırtısı",
 "koyu ve boş ilk kare; çok ince okunmaz çizgi",3,"YÜKSEK: koyu zemin — ilk karede ekranın büyük kısmını kaplayan parlak çizim","yazılmadı"),
("duz-vektor","Düz vektör","Çizgi film","17 flat-vector → toon-and-paper/toon.tsx","midcentury-toon/STYLE.md",
 "marka uyumlu düz renkler: kâğıt #FBF6EC, lacivert #22264A, mercan #E8573F, lavanta #C9C2E6",
 "doku yok ya da çok hafif gren","kontursuz düz şekil","akıcı, aşan yaylanma (overshoot)",1,
 "şekil maskeyle silme (wipe)","gerçekçi efekt",
 "kurumsal ikon seti görünümü (cansız)",1,"düşük","yazılmadı"),
("minimal-cizgi","Minimal çizgi (tek çizgi)","El çizimi","13 one-line → drawn/line.tsx","one-line/STYLE.md",
 "kâğıt #FBF6EC · tek renk çizgi lacivert #22264A · tek vurgu mercan",
 "kâğıt dokusu","tek kesintisiz çizgi 5 px","çizgi hiç kalkmadan şekilden şekle akar",1,
 "çizginin kendini çözüp yeni şekle dönüşmesi","kalem sürtünmesi, nefes",
 "boş köşe (çizgi tüm alana yayılmalı)",2,"düşük","yazılmadı"),
("cgi-hareket","CGI hareket (cam ürün)","3D görünüm","59 glass-product → 3d/glass.ts","glass-product/STYLE.md",
 "stüdyo beyazı #F4F4F6, cam yansıması, tek renkli ışık",
 "kırılma, yansıma, yumuşak gölge","yok","akıcı dönme, makro kamera",1,
 "ışık süpürmesi","cam çınlaması, uğultu",
 "gerçek ürün/marka",1,"düşük","yazılmadı"),
("anlatici-karakter","3D anlatım karakteri","3D görünüm","62 claymation → 3d/clay-and-lidar.ts (yumuşak gövde)","isometric-picture-book/STYLE.md",
 "pastel, kanal renkleriyle uyumlu",
 "yumuşak ambiyans gölgesi","yok","karakter işaret eder, göz kırpar; akıcı",1,
 "karakterin sahneye girip çıkması","gerçekçi efekt",
 "bilinen maskot; insan yüzü gerçekçiliği",2,"düşük","yazılmadı"),
("kagit-isik-kutusu","Kâğıt kesik ışık kutusu","Kâğıt ve kukla","25 paper-pop-up → toon-and-paper/paper.tsx","paper-lantern/STYLE.md",
 "arka katman açık (#F0C890 alacakaranlık ya da #DFE6EE kış), ön katman koyu; sıcak ışık #FFD080",
 "kâğıt lifi, katman üstü ışık kenarı, katman altı koyu bant","kesik kenar","katmanlar kayar/döner; ışık ipuçları",1,
 "ön katman perdesi kapanır, ışık söner-yanar","kâğıt hışırtısı, düğme tıkırtısı, müzik kutusu (çok kısık)",
 "açık ön katman (derinliği öldürür); belirli lamba tasarımı",3,"orta (arka katman parlak tutulur)","yazılmadı"),
("gravur","Bakır gravür","Baskı","29 engraving → print-and-abstract/print.tsx","engraving/STYLE.md · vintage-collage/STYLE.md",
 "kâğıt #F1EADB · mürekkep #241E1A · sepya vurgu",
 "çapraz tarama, ince çizgi gölge, plaka kenarı","ince 1-3 px tarama","yavaş itme, katman kolaj kesmesi",1,
 "plaka değişimi","kalem kazıma, kâğıt",
 "gerçek eski gravürün birebir kopyası",3,"düşük","yazılmadı"),
("sessiz-film","Sessiz film (1920'ler)","Sinema","70 silent-film → graphic-and-cinema/graphic-and-cinema.tsx","silent-film/STYLE.md",
 "gümüş gri tonlar, krem #ECE6D6, siyah",
 "gren, titreme, toz, çizik, köşe yanığı","—","hızlandırılmış 18 fps hissi",2,
 "iris, ara yazı kartı (kısa)","projektör tıkırtısı (çok kısık), gerçekçi efekt",
 "bilinen film sahnesi/karakteri",2,"orta (beyaz tonları baskın tut)","yazılmadı"),
("termal-kamera","Termal kamera","Araç ve kanıt","81 microscope → screens/microscope.tsx (ölçek)","thermal-camera/STYLE.md",
 "termal palet: mor #2B1055 → kırmızı #E0353B → sarı #FFD23F → beyaz",
 "sensör gürültüsü, ölçek çubuğu, artı imleci","—","el kamerası, sıcak bölge yavaşça belirir",1,
 "palet değişimi, odak kayması","fan vızıltısı, bip yok",
 "gerçek kişi/yer görüntüsü; sahte ölçüm sayısı",3,"orta (sıcak alanlar büyük tutulur)","yazılmadı"),
]
alanlar = ["slug","ad","aile","as","lo","palet","doku","cizgi","hareket","adim","gecis","ses","yapma","korku","isik","motor"]
for r in S:
    d = dict(zip(alanlar, r))
    adim = {1:"akıcı (her kare)",2:"ikişer kare (el yapımı)",3:"üçer kare"}[d["adim"]]
    md = f"""# {d['ad']}  (`{d['slug']}`)

| | |
|---|---|
| Aile | {d['aile']} |
| Korku uyumu | {'★' * d['korku']}{'☆' * (3 - d['korku'])} |
| İlk kare/parlaklık riski | {d['isik']} |
| Motor | {d['motor']} |
| Kaynak teknik (animation-styles) | `{d['as']}` (`{AS}`) |
| Kaynak teknik (lemo-opuscar) | `{d['lo']}` (`{LO}`) |

## Palet
{d['palet']}
Marka renkleri yalnız üst bant, altyazı vurgusu, filigran ve bitiş ekranında (bkz. `kanal-kimligi`).

## Doku
{d['doku']}

## Çizgi
{d['cizgi']}

## Hareket
{d['hareket']}
Adım: **{adim}** · sürekli hafif kamera kayması · en az 3 derinlik katmanı (ön/orta/arka, paralaks).

## Geçiş
{d['gecis']}

## Ses tarifi
{d['ses']}
Kanal kuralı: 5-8 gerçekçi efekt, komik ses yok, müzik çok kısık (bkz. `ses`).

## Yapma
- {d['yapma'].replace('; ', chr(10) + '- ')}
- Marka/logo/gerçek kişi; ekranda gereksiz yazı; boş köşe; karanlık ilk kare.
"""
    open(f"stiller/{d['slug']}.md","w").write(md)
with open("katalog.csv","w",newline="") as f:
    w=csv.writer(f); w.writerow(["slug","ad","aile","korku_uyumu","isik_riski","motor","animation_styles","lemo_opuscar"])
    for r in S:
        d=dict(zip(alanlar,r)); w.writerow([d["slug"],d["ad"],d["aile"],d["korku"],d["isik"],d["motor"],d["as"],d["lo"]])
print(len(S))
