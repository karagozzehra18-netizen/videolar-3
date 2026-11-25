// 1080x1920 dikey karenin sabit yerleşimi — TAM EKRAN format (kullanıcı kararı 25.11.2026).
// Çizim bütün ekranı kaplar (çerçeve yok). Altyazı, stilin ekranın altına koyduğu SABİT ön katmanın
// (gölge oyununda koyu sahne tahtası) üstünde durur; kamera hareket etse de çizimin üstüne binmez.
// Platform düğmeleri (YouTube/Instagram/TikTok ortak en kötü durum):
//   üst 0-170 px (arama, menü), sağ şerit x>=940 & y 880-1740 (beğeni, yorum, paylaş), alt 1590-1920 (açıklama, ses).
export const RENK = {
  kagit: "#FBF6EC", krem: "#F7EEDC", lacivert: "#22264A", mercan: "#E8573F",
  hardal: "#F4BE4F", lavanta: "#C9C2E6", seftali: "#F6C2A2", teal: "#3F8077",
};

export const GUVENLI = { ust: 170, sagX: 940, sagY1: 880, sagY2: 1740, alt: 1590 };

/** Çizim alanı: tam ekran. */
export const SAHNE = { x: 0, y: 0, w: 1080, h: 1920 };

/** Stilin sabit ön katmanı (altyazının zemini) bu y'den başlar; üst kenarı süslü olabilir (en fazla 40 px yukarı taşar). */
export const ON_KATMAN_Y = 1392;

/** Üst bant: YALNIZ kısa başlık (süre/ilerleme çubuğu kaldırıldı, kullanıcı kararı). */
export const UST_BANT = { x: 60, baslikY: 200, baslikBoyut: 34 };

/** Altyazı bandı: yatayda tam ortada (merkez x=540), ön katmanın üstünde, alt platform alanının üstünde. */
export const ALTYAZI = { y1: 1412, y2: 1586, x1: 140, x2: 940, boyut: 66, satirAraligi: 1.12, enFazlaSatir: 2 };

/** Kapak kartına konacak kırpım (videonun temiz karesinden). */
export const KAPAK_KIRP = { x: 0, y: 300, w: 1080, h: 1130 };

/** Filigran (kanal-kimligi): yükseklik 64, sağdan 60, üstten 290. */
export const FILIGRAN = { h: 64, w: 284, sag: 60, ust: 290, opaklik: 0.9 };

export const BITIS_SN = 2.5;
