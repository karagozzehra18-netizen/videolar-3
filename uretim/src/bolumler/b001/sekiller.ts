// 001 Karabasan — kukla şekilleri (perde koordinatı 1000x1048). Görünüş stil motorunda; burada yalnız biçim.
// Sahne planı (olay adları bolumler/001-karabasan/bolum.json'da):
//  S1 kanca: yakın plan yüz, göz açılır, uzun parmaklı gölge el kenarda; kamera hızla geri çekilir; el titrer
//  S2 ağırlık düşer (göğse koyu kütle), nefes daralır (nefes kıvrımları küçülür)
//  S3 lamba titrer; kütle açılır → karabasan (kırmızı gözler), yüze eğilir
//  S4 lamba geçişi: karabasan kaybolur; beyin turkuaz yanar (kalp atışıyla), rüya ay-yıldızları yükselir
//  S5 yüz kişilik kafes pano yükselir, sekiz baş kırmızı yanar, pano sallanır
//  S6 pano düşer; arkadaki kapı açılır, kapıda bulanık uzun gölge, perdeye yaklaşıp netleşir
//  S7 kamera yüze döner (ilk kareyle aynı kadraj), göz açılır → bitiş ekranı → döngü

export const YUZ = { x: 255, y: 590 }; // kameranın kanca kadrajının merkezi

// Karyola
export const KARYOLA = [
  "M104,470 Q128,446 152,470 L152,860 L136,860 L136,800 L120,800 L120,860 L104,860 Z", // baş tahtası
  "M858,600 Q872,586 886,600 L886,860 L870,860 L870,800 L874,800 Z",
  "M104,762 L886,762 L886,796 L104,796 Z", // ana kiriş
].join(" ");
export const KARYOLA_OYUK = "M114,500 L142,500 L142,740 L114,740 Z"; // baş tahtasında oyuk (ışık geçer)

// Yastık
export const YASTIK = "M150,690 C150,650 200,642 300,650 C330,654 334,700 300,712 C220,722 160,724 150,690 Z";
// Baş (yatarken, profil; burun yukarı)
export const BAS = "M200,668 C178,660 172,620 180,598 C188,574 210,562 232,560 C244,559 250,560 254,556 C257,550 258,543 263,542 C268,542 270,550 271,555 C272,558 274,558 276,558 C280,556 284,558 284,562 C287,561 290,563 289,567 C294,568 300,570 302,576 C306,586 310,596 318,604 L324,646 L250,672 Z";
export const SAC = "M200,668 C176,660 168,618 178,594 C186,572 206,560 228,558 C210,572 198,600 204,668 Z";
export const GOZ_ACIK = (t: number) => {
  const h = 1.5 + 10 * t; // gözün açıklığı (göz, alnın altında yatay badem)
  return `M224,577 Q240,${577 - h} 256,577 Q240,${577 + h * 0.8} 224,577 Z`;
};
export const GOZ_BEBEK = (t: number) => `M${241 - 4},${576} a4,${Math.max(0.5, 4 * t)} 0 1,0 8,0 a4,${Math.max(0.5, 4 * t)} 0 1,0 -8,0 Z`;
export const BEYIN = "M188,612 C186,592 198,580 214,584 C228,580 246,586 250,600 C256,618 244,634 222,636 C202,638 190,628 188,612 Z";

// Yorgan (beden): üstü göğüs ve dizlerde kabarık
export const YORGAN = (gogus: number) =>
  `M300,${700} C330,${640 - gogus} 420,${630 - gogus} 500,${652 - gogus * 0.6} C580,668 640,650 720,640 C790,632 860,660 870,700 L870,770 L300,770 Z`;
export const YORGAN_DESEN = Array.from({ length: 6 }, (_, i) => {
  const x = 380 + i * 80;
  return `M${x},700 L${x + 18},718 L${x},736 L${x - 18},718 Z`;
}).join(" ");
// Kol (omuz pimi 330,668): yorganın üstünde, el göğüste
export const KOL = "M322,656 C360,640 420,636 462,644 L470,640 L492,634 L494,642 L476,648 L498,646 L498,654 L476,656 L494,662 L490,668 L466,662 C420,668 360,676 330,682 Z";
export const OMUZ = { x: 330, y: 668 };

// Gölge el (kanca karesi ve son kare): uzun parmaklar, bilekten çubuk
export const GOLGE_EL = (yay: number) => {
  // Yerel 0,0 bilek; parmaklar +x yönüne uzanır. yay 0..1: parmakların açılıp kıvrılması.
  const parmak = (aci: number, l1: number, l2: number, bukum: number) => {
    const a1 = (aci * Math.PI) / 180, a2 = ((aci + bukum * (0.4 + yay)) * Math.PI) / 180;
    const k = { x: 52 + Math.cos(a1) * l1, y: Math.sin(a1) * l1 * 1.0 };
    const u = { x: k.x + Math.cos(a2) * l2, y: k.y + Math.sin(a2) * l2 };
    const n = (a: number, w: number) => ({ x: -Math.sin(a) * w, y: Math.cos(a) * w });
    const b0 = { x: 52, y: Math.sin(a1) * 18 }, n1 = n(a1, 8), n2 = n(a2, 5);
    return `M${b0.x + n1.x},${b0.y + n1.y} L${k.x + n1.x},${k.y + n1.y} L${u.x + n2.x * 0.3},${u.y + n2.y * 0.3} L${k.x - n1.x},${k.y - n1.y} L${b0.x - n1.x},${b0.y - n1.y} Z`;
  };
  return [
    "M-120,-14 C-60,-24 -10,-34 30,-34 C60,-34 66,-10 64,10 C62,30 50,36 26,36 C-10,36 -60,26 -120,18 Z",
    parmak(-26, 70, 66, 26), parmak(-8, 84, 74, 22), parmak(10, 80, 70, 20), parmak(28, 64, 56, 18),
    "M10,30 C26,52 44,70 70,78 L66,88 C36,82 14,64 0,40 Z",
  ];
};

// Karabasan (yerel merkez 0,0 = göğse oturduğu nokta). acilim 0 = kıvrık kütle, 1 = açılmış
export const KB_GOVDE = "M-130,40 C-150,-40 -100,-120 -10,-130 C80,-136 140,-80 140,0 C140,40 100,60 0,60 C-80,60 -120,56 -130,40 Z";
export const KB_BAS = "M-150,-150 C-160,-200 -120,-232 -80,-226 C-40,-220 -20,-190 -30,-150 C-40,-118 -80,-108 -110,-112 C-136,-116 -146,-130 -150,-150 Z";
export const KB_GOZLER = "M-128,-170 C-120,-180 -108,-178 -104,-168 C-112,-162 -122,-162 -128,-170 Z M-82,-176 C-74,-186 -62,-184 -58,-174 C-66,-168 -76,-168 -82,-176 Z";
export const KB_KOL = "M0,0 C-30,40 -60,80 -110,110 L-170,120 L-110,128 L-176,140 L-104,142 L-160,162 L-96,152 C-50,120 -20,80 14,14 Z";
export const KB_SIRT_DIKEN = "M-40,-128 L-30,-170 L-14,-132 Z M10,-132 L26,-176 L38,-128 Z M60,-114 L82,-150 L88,-104 Z";

// Lamba (asılı yağ lambası, sağ üst)
export const LAMBA = "M836,250 C836,226 900,226 900,250 L908,262 C908,290 828,290 828,262 Z M864,180 L872,180 L872,228 L864,228 Z M846,290 L890,290 L878,306 L858,306 Z";
export const ZINCIR = "M866,0 L870,0 L870,182 L866,182 Z";
export const ALEV = (t: number, k: number) => {
  const h = 34 + k * 14;
  return `M868,${226} C${854 + t * 6},${216} ${860 + t * 4},${226 - h * 0.6} ${868 + t * 5},${226 - h} C${876 + t * 3},${226 - h * 0.6} ${882},${216} 868,226 Z`;
};

// Pencere (sol üst): oyuklu çerçeve, ay hilali
export const PENCERE = "M90,150 L330,150 L330,400 L90,400 Z";
export const PENCERE_OYUK = "M108,168 L202,168 L202,268 L108,268 Z M218,168 L312,168 L312,268 L218,268 Z M108,284 L202,284 L202,382 L108,382 Z M218,284 L312,284 L312,382 L218,382 Z";
export const AY = "M268,198 C240,206 236,248 262,258 C238,262 220,236 232,212 C240,198 256,194 268,198 Z";

// Kapı (arkada, orta): çerçeve + kanat (menteşe solda, x=430)
export const KAPI_CERCEVE = "M412,150 L588,150 L588,560 L570,560 L570,168 L430,168 L430,560 L412,560 Z";
export const KAPI_KANAT = "M430,168 L570,168 L570,560 L430,560 Z";
export const KAPI_KANAT_OYUK = "M450,196 L550,196 L550,330 L450,330 Z M450,360 L550,360 L550,530 L450,530 Z";
// Kapıdaki uzun gölge (yerel 0,0 = ayak arası)
export const UZUN_GOLGE = "M-26,0 L-30,-120 C-50,-150 -54,-230 -36,-270 C-46,-300 -40,-338 -10,-346 C20,-350 34,-320 28,-294 C46,-250 46,-160 30,-120 L26,0 Z";
export const UZUN_GOLGE_KOL = "M-30,-250 C-60,-200 -72,-150 -80,-90 L-70,-88 C-58,-140 -44,-190 -22,-236 Z";

// Zemin: döşeme + kilim (alt boşluk kalmasın)
export const ZEMIN = "M0,860 L1000,860 L1000,1048 L0,1048 Z";
export const KILIM = "M120,900 L880,900 L880,1000 L120,1000 Z";
export const KILIM_DESEN = Array.from({ length: 9 }, (_, i) => {
  const x = 170 + i * 82;
  return `M${x},920 L${x + 26},950 L${x},980 L${x - 26},950 Z`;
}).join(" ");

// Rüya: ay ve yıldızlar
export const RUYA_AY = "M0,-40 C-30,-34 -40,10 -10,30 C-40,30 -56,0 -46,-24 C-38,-40 -16,-46 0,-40 Z";
export const YILDIZ = (r: number) => Array.from({ length: 10 }, (_, i) => {
  const a = (i * Math.PI) / 5 - Math.PI / 2;
  const rr = i % 2 ? r * 0.45 : r;
  return `${i ? "L" : "M"}${(Math.cos(a) * rr).toFixed(1)},${(Math.sin(a) * rr).toFixed(1)}`;
}).join(" ") + " Z";

// Nefes kıvrımı
export const NEFES = "M0,0 C-14,-10 -10,-28 6,-28 C20,-28 22,-12 10,-8 C2,-6 0,-14 6,-16";

// Yüz kişilik kafes pano (yerel 0,0 sol üst; 700x700)
export const PANO_DIS = "M0,0 L700,0 L700,700 L0,700 Z";
export const KISI = (cx: number, cy: number, r: number) =>
  `M${cx - r},${cy - r * 0.3} a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 ${-r * 2},0 Z M${cx - r * 1.4},${cy + r * 2.1} Q${cx},${cy + r * 0.6} ${cx + r * 1.4},${cy + r * 2.1} Z`;
export const PANO_KISI = (i: number) => {
  const sx = i % 10, sy = Math.floor(i / 10);
  return { cx: 62 + sx * 64, cy: 46 + sy * 66 };
};
export const SEKIZ = [12, 27, 35, 48, 53, 66, 79, 91]; // kırmızı yanan sekiz kişi (dağınık)
