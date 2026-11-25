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

/** Üst başlık kilidi: sol üstte yarı saydam kart (kategori + başlık). Süre/ilerleme çubuğu YOK (kullanıcı kararı). */
export const UST_BANT = { x: 56, y: 192, baslikBoyut: 44 };

/** Altyazı: ekranın ORTASINDA, çizimin üzerinde (kullanıcı kararı 25.11.2026, seri formatı), orta büyüklük.
 *  Okunurluk için koyu kontur + gölge. Merkez x=540, y≈1113 (%58). Genişlik 760 (sağ platform şeridinden uzak). */
export const ALTYAZI = { y1: 1040, y2: 1186, x1: 160, x2: 920, boyut: 58, satirAraligi: 1.15, enFazlaSatir: 2 };

/** Kapak kartına konacak kırpım (videonun temiz karesinden). */
export const KAPAK_KIRP = { x: 0, y: 300, w: 1080, h: 1130 };

/** Filigran: vektör rozet logo, 92 px, sağdan 56, üstten 196 (başlık kartıyla aynı hizada). */
export const FILIGRAN = { boyut: 92, sag: 56, ust: 196, opaklik: 0.95 };

export const BITIS_SN = 3.0; // bitiş ekranı (BitisEkrani.tsx, 90 kare)
