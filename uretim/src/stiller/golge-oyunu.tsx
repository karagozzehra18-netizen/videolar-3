// STİL MOTORU: Gölge oyunu (renkli deri) — stil-kutuphanesi/stiller/golge-oyunu.md
// Kaynak teknik: animation-styles #27 shadow-puppet (perde, lamba titremesi, derinlik bulanıklığı) ve
// lemo-opuscar styles/shadow-puppet (eklemli kukla, yalnız dönme, ışık ipuçları). Belirli bir geleneksel karakter KOPYALANMAZ.
// Görünüş: arkadan aydınlatılmış sıcak bez perde (TAM EKRAN), koyu siluetler, ışığı geçiren renkli deri parçaları,
// çubuklar, pimler; en önde sabit koyu sahne tahtası (altyazı zemini).
import React from "react";
import { AbsoluteFill } from "remotion";
import { ON_KATMAN_Y, SAHNE } from "../marka/yerlesim";
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

/** Sabit ön katman: perdenin önündeki koyu sahne tahtası (en öndeki derinlik katmanı). Kamerayla hareket etmez;
 *  altyazı bunun üstünde durur, böylece altyazı hiçbir zaman kuklaların üstüne binmez. Üst kenarı oyma lale/yaprak sırası. */
const OnTahta: React.FC<{ f: number }> = ({ f }) => {
  const y = ON_KATMAN_Y;
  const motif = Array.from({ length: 12 }, (_, i) => {
    const cx = 45 + i * 90, s = Math.sin(f * 0.03 + i) * 1.5;
    return `M${cx - 30},${y} C${cx - 28},${y - 22} ${cx - 10 + s},${y - 34} ${cx},${y - 40} C${cx + 10 + s},${y - 34} ${cx + 28},${y - 22} ${cx + 30},${y} Z`;
  }).join(" ");
  return (
    <g>
      <rect x={0} y={y + 18} width={W} height={H - y} fill={GO.ahsapKoyu} opacity={0.35} filter="url(#go-b3)" />
      <path d={`M0,${y} H${W} V${H} H0 Z ${motif}`} fill={GO.murekkep} />
      {/* oyma delikler: ışık sızar (yalnız üst şeritte; altyazı alanı düz kalır) */}
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={45 + i * 90} cy={y - 14} r={6} fill={GO.deri.hardal} opacity={0.75} />)}
      <path d={`M0,${y + 6} H${W}`} stroke={GO.ahsapAcik} strokeWidth={3} opacity={0.5} />
      {/* altyazının altında (platform düğmelerinin arkasında) oyma şerit: ışık sızan küçük lale delikleri */}
      <path d={`M0,${H - 300} H${W}`} stroke={GO.ahsapAcik} strokeWidth={2} opacity={0.35} />
      {Array.from({ length: 18 }, (_, i) => {
        const cx = 30 + i * 60, cy = H - 250 + (i % 2) * 40;
        return <path key={i} d={`M${cx},${cy - 14} C${cx + 10},${cy - 4} ${cx + 8},${cy + 10} ${cx},${cy + 14} C${cx - 8},${cy + 10} ${cx - 10},${cy - 4} ${cx},${cy - 14} Z`}
          fill={i % 3 === 0 ? GO.deri.kirmizi : GO.deri.hardal} opacity={0.45 + 0.1 * Math.sin(f * 0.05 + i)} />;
      })}
      <path d={`M0,${H - 150} H${W}`} stroke={GO.ahsapAcik} strokeWidth={2} opacity={0.35} />
    </g>
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
          <radialGradient id="go-bez" gradientUnits="userSpaceOnUse" cx={w * 0.55 + lamba * 18} cy={h * 0.42} r={h * 0.62}>
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
        <OnTahta f={f} />
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
