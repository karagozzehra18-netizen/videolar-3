// STİL MOTORU: Gölge oyunu (renkli deri) — stil-kutuphanesi/stiller/golge-oyunu.md
// Kaynak teknik: animation-styles #27 shadow-puppet (perde, lamba titremesi, derinlik bulanıklığı) ve
// lemo-opuscar styles/shadow-puppet (eklemli kukla, yalnız dönme, ışık ipuçları). Belirli bir geleneksel karakter KOPYALANMAZ.
// Görünüş: arkadan aydınlatılmış sıcak bez perde, koyu siluetler, ışığı geçiren renkli deri parçaları, çubuklar, pimler.
import React from "react";
import { AbsoluteFill } from "remotion";
import { SAHNE } from "../marka/yerlesim";
import { gurultu, H, W } from "../motor/yardimci";
import type { SahneProps, StilMotoru } from "../motor/tip";

export const GO = {
  murekkep: "#2a160b",
  deri: { kirmizi: "#d4432a", turkuaz: "#2a9c8f", hardal: "#eab335", mor: "#7d4a90", gece: "#3d5f9e" },
  bez: ["#fff6d6", "#f8d892", "#dc9a4a", "#8e4d1d"],
  ahsap: "#3b2414", ahsapKoyu: "#24150b", ahsapAcik: "#6e4523",
};

/** Perdeye uzaklık: 0 perdeye yapışık (keskin), 1 lambaya yakın (bulanık, büyük, soluk). */
const BULANIK = [0.5, 2, 4.5, 8, 12, 17];
export const derinlikFiltresi = (d: number) => `url(#go-b${Math.max(0, Math.min(5, Math.round(d * 5)))})`;

export type KuklaProps = {
  d: string | string[];
  ic?: { d: string; renk: string; opaklik?: number }[]; // ışığı geçiren renkli deri
  delik?: string; // perdeyi gösteren oyuk (göz, pencere) — murekkebin içinden kesilir
  derinlik?: number;
  tf?: string;
  opaklik?: number;
  cubuk?: [number, number, number, number];
  pimler?: [number, number][];
};

/** Bir kukla parçası. Oyuklar evenodd ile kesilir, renkli deri üstte yarı saydam boyanır. */
export const Kukla: React.FC<KuklaProps> = ({ d, ic, delik, derinlik = 0, tf, opaklik = 1, cubuk, pimler }) => {
  const yollar = Array.isArray(d) ? d : [d];
  const op = opaklik * (0.96 - derinlik * 0.3);
  return (
    <g transform={tf} filter={derinlikFiltresi(derinlik)} opacity={op}>
      {cubuk ? <path d={`M${cubuk[0]},${cubuk[1]} L${cubuk[2]},${cubuk[3]}`} stroke={GO.murekkep} strokeWidth={6} strokeLinecap="round" opacity={0.85} /> : null}
      {yollar.map((y, i) => <path key={i} d={i === 0 && delik ? `${y} ${delik}` : y} fill={GO.murekkep} fillRule="evenodd" />)}
      {ic?.map((p, i) => <path key={`i${i}`} d={p.d} fill={p.renk} opacity={p.opaklik ?? 0.88} />)}
      {pimler?.map(([x, y], i) => <circle key={`p${i}`} cx={x} cy={y} r={4.5} fill="#f3d9a0" opacity={0.9} />)}
    </g>
  );
};

const Cerceve: React.FC<{ f: number }> = ({ f }) => {
  // Perdenin çevresi: oymalı ahşap sahne. Üst bant ve altyazı bu ahşabın üstünde durur (çizimin üstünde değil).
  const { x, y, w, h } = SAHNE;
  const motif = (cy: number, n: number, r: number) =>
    Array.from({ length: n }, (_, i) => {
      const cx = 60 + (i * (W - 120)) / (n - 1);
      return <path key={`${cy}-${i}`} d={`M${cx - r},${cy} Q${cx},${cy - r * 1.4} ${cx + r},${cy} Q${cx},${cy + r * 1.4} ${cx - r},${cy} Z`} fill={GO.ahsapAcik} opacity={0.55} />;
    });
  return (
    <>
      <rect x={0} y={0} width={W} height={y} fill={GO.ahsap} />
      <rect x={0} y={y + h} width={W} height={H - y - h} fill={GO.ahsap} />
      <rect x={0} y={y} width={x} height={h} fill={GO.ahsap} />
      <rect x={x + w} y={y} width={W - x - w} height={h} fill={GO.ahsap} />
      <path d={`M0,0 H${W} V${H} H0 Z M${x - 12},${y - 12} V${y + h + 12} H${x + w + 12} V${y - 12} Z`} fillRule="evenodd" fill="url(#go-ahsap-desen)" opacity={0.5} />
      {motif(1700, 13, 12)}
      {motif(130, 13, 16)}
      {motif(y + h + 268, 13, 16)}
      <path d={`M0,${y + h + 300} H${W}`} stroke={GO.ahsapAcik} strokeWidth={3} opacity={0.6} />
      {/* perde kenarı: ince çıta + gölge */}
      <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} fill="none" stroke={GO.ahsapKoyu} strokeWidth={14} />
      <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} fill="none" stroke={GO.ahsapAcik} strokeWidth={3} opacity={0.8} />
      {/* alt saçak: perdenin altından sarkan püsküller, hafif sallanır */}
      {Array.from({ length: 25 }, (_, i) => {
        const px = x + 20 + i * ((w - 40) / 24);
        const s = Math.sin(f * 0.08 + i * 0.7) * 3;
        return <path key={i} d={`M${px},${y + h + 12} L${px + s},${y + h + 40}`} stroke="#b9782f" strokeWidth={5} strokeLinecap="round" opacity={0.8} />;
      })}
    </>
  );
};

const Sahne: React.FC<SahneProps> = ({ f, isik = 1, kamera = { x: 0, y: 0, olcek: 1 }, sarsinti = 0, children }) => {
  const { x, y, w, h } = SAHNE;
  const lamba = gurultu(f * 0.34, 7) * 0.65 + gurultu(f * 1.1, 8) * 0.35; // yağ lambası titremesi
  const parlak = Math.max(0.12, isik * (0.93 + lamba * 0.1));
  const sx = sarsinti * (gurultu(f * 1.7, 3) - 0.5) * 26;
  const sy = sarsinti * (gurultu(f * 1.9, 4) - 0.5) * 26;
  // sürekli hafif kamera kayması (hareket karakteri) + bölümün kamerası
  const kx = kamera.x + Math.sin(f * 0.021) * 6 + sx;
  const ky = kamera.y + Math.cos(f * 0.017) * 5 + sy;
  const cx = w / 2;
  const cy = h / 2;
  const tf = `translate(${cx + kx} ${cy + ky}) scale(${kamera.olcek}) rotate(${kamera.aci ?? 0}) translate(${-cx} ${-cy})`;
  return (
    <AbsoluteFill style={{ background: GO.ahsapKoyu }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="go-bez" gradientUnits="userSpaceOnUse" cx={w * 0.55 + lamba * 18} cy={h * 0.46} r={w * 0.95}>
            <stop offset="0%" stopColor={GO.bez[0]} /><stop offset="42%" stopColor={GO.bez[1]} />
            <stop offset="80%" stopColor={GO.bez[2]} /><stop offset="100%" stopColor={GO.bez[3]} />
          </radialGradient>
          <filter id="go-dokuma" x={0} y={0} width={w} height={h} filterUnits="userSpaceOnUse">
            <feTurbulence type="fractalNoise" baseFrequency="0.9 1.6" numOctaves={2} seed={11} />
            <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.2  0 0 0 0 0.08  0 0 0 1.2 -0.45" />
          </filter>
          <pattern id="go-ahsap-desen" width="180" height="24" patternUnits="userSpaceOnUse">
            <path d="M0,12 Q45,4 90,12 T180,12" fill="none" stroke={GO.ahsapKoyu} strokeWidth={3} opacity={0.7} />
          </pattern>
          {BULANIK.map((s, i) => (
            <filter key={i} id={`go-b${i}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation={s} /></filter>
          ))}
          <radialGradient id="go-vinyet" cx="50%" cy="48%" r="70%">
            <stop offset="60%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#2a1206" stopOpacity={0.55} />
          </radialGradient>
          <clipPath id="go-perde"><rect x={0} y={0} width={w} height={h} /></clipPath>
        </defs>
        <g transform={`translate(${x} ${y})`} clipPath="url(#go-perde)">
          <rect width={w} height={h} fill="url(#go-bez)" />
          <g transform={tf}>{children}</g>
          <rect width={w} height={h} filter="url(#go-dokuma)" opacity={0.22} />
          <rect width={w} height={h} fill="url(#go-vinyet)" />
          {/* ışık şiddeti: perdenin tamamı kararır/aydınlanır */}
          <rect width={w} height={h} fill="#1a0b04" opacity={Math.max(0, 1 - parlak) * 0.92} />
          <rect width={w} height={h} fill="#fff3cf" opacity={Math.max(0, parlak - 1) * 0.8} />
        </g>
        <Cerceve f={f} />
      </svg>
    </AbsoluteFill>
  );
};

export const golgeOyunu: StilMotoru = {
  slug: "golge-oyunu",
  ad: "Gölge oyunu (renkli deri)",
  palet: { zemin: GO.bez, murekkep: GO.murekkep, vurgular: GO.deri, isik: "#fff6d6" },
  cizgi: { kalinlik: 6, uc: "round" },
  hareket: { adim: 1, titremeGenligi: 3, kameraKayma: 6 },
  Sahne,
  // Lamba geçişi: ışık 1 → 0.55 → 1 (ortada sahne değişir). Daha koyusu kontrol panosunda 'karanlık kare' olur.
  gecis: (f, bas, uz) => {
    const t = (f - bas) / uz;
    if (t <= 0 || t >= 1) return 1;
    return 1 - 0.45 * Math.sin(t * Math.PI);
  },
};
