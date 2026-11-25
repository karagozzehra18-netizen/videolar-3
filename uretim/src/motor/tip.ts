// "Stil motoru" sözleşmesi. Her stil bu şekli doldurur; bölümün sahne kodu yalnız bu arayüzü kullanır,
// böylece aynı hikâye başka bir stille yeniden çizilebilir (şekiller aynı, görünüş motorda).
import type React from "react";

export type Palet = {
  zemin: string[];      // arka plan/ışık katmanları (açıktan koyuya)
  murekkep: string;     // ana çizgi/siluet rengi
  vurgular: Record<string, string>; // stilin kendi vurgu renkleri
  isik: string;         // en parlak nokta
};

export type HareketKarakteri = {
  adim: 1 | 2 | 3;      // 1 akıcı (dijital/kukla), 2-3 el yapımı (kâğıt, kil, tebeşir)
  titremeGenligi: number; // piksel; kamera/kukla mikro hareketi
  kameraKayma: number;  // piksel; sürekli hafif kamera kayması
};

export type StilMotoru = {
  slug: string;         // stil-kutuphanesi/stiller/<slug>.md ile aynı
  ad: string;
  palet: Palet;
  cizgi: { kalinlik: number; uc: "round" | "butt" };
  hareket: HareketKarakteri;
  /** Sahne alanının tamamını çizen katman: zemin + doku + ışık + kamera + çerçeve. */
  Sahne: React.FC<SahneProps>;
  /** Stilin geçişi: t 0→1→0 aralığında ekranın "geçiş" durumu (ör. lamba söner/yanar). */
  gecis: (f: number, bas: number, uzunluk: number) => number;
};

export type SahneProps = {
  f: number;
  isik?: number;        // 0..1.3 ışık şiddeti (geçişler bunu kullanır)
  kamera?: { x: number; y: number; olcek: number; aci?: number };
  sarsinti?: number;    // 0..1 ekran sarsıntısı
  children: React.ReactNode;
};
