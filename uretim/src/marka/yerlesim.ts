// 1080x1920 dikey karenin sabit yerleşimi. Bütün bölümler bunu kullanır; değiştirirsen altyazi skill'ini de güncelle.
// Platform düğmeleri (YouTube/Instagram/TikTok ortak en kötü durum):
//   üst 0-170 px (arama, menü), sağ şerit x>=940 & y 880-1740 (beğeni, yorum, paylaş), alt 1590-1920 (açıklama, ses).
export const RENK = {
  kagit: "#FBF6EC", krem: "#F7EEDC", lacivert: "#22264A", mercan: "#E8573F",
  hardal: "#F4BE4F", lavanta: "#C9C2E6", seftali: "#F6C2A2", teal: "#3F8077",
};

export const GUVENLI = { ust: 170, sagX: 940, sagY1: 880, sagY2: 1740, alt: 1590 };

/** Üst bant: ilerleme çubuğu + kısa başlık. */
export const UST_BANT = { y: 196, x1: 60, x2: 1020, cubukYukseklik: 8, aralik: 8, baslikY: 222, baslikBoyut: 34 };

/** Çizim alanı (sahne). Altyazı ASLA buraya girmez. */
export const SAHNE = { x: 40, y: 292, w: 1000, h: 1048 }; // 292..1340

/** Altyazı bandı: sahnenin altında, alt platform alanının üstünde, sağ şeridin solunda. */
export const ALTYAZI = { y1: 1368, y2: 1572, x1: 90, x2: 900, boyut: 66, satirAraligi: 1.12, enFazlaSatir: 2 };

/** Filigran (kanal-kimligi): yükseklik 64, sağdan 60, üstten 290. */
export const FILIGRAN = { h: 64, w: 284, sag: 60, ust: 290, opaklik: 0.9 };

export const BITIS_SN = 2.5;
