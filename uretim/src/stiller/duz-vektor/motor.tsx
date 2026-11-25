// STİL MOTORU: Düz vektör gece masalı — stil-kutuphanesi/stiller/duz-vektor.md
// Kaynak teknik: animation-styles #17 flat-vector (kontursuz düz şekil, aşan yaylanma) + lemo-opuscar midcentury-toon
// (sade karakter, net siluet). Kendi eklerimiz: gece ışığı (sıcak lamba / soğuk ay), ince kâğıt greni, yumuşak vinyet,
// "kaynayan" duman (karabasan). Çerçeve yok, TAM EKRAN; altyazı ekranın ortasında, konturlu.
import React from "react";
import { AbsoluteFill } from "remotion";
import { gurultu, H, W } from "../../motor/yardimci";
import type { SahneProps, StilMotoru } from "../../motor/tip";

export const DV = {
  gece: { gok: "#1B2146", duvar: "#2C3566", duvarAcik: "#3B4680", zemin: "#232A52", ay: "#DCE3FF", ayIsik: "#9FB0F0" },
  sicak: { lamba: "#FFD27A", parilti: "#FFE9B8", duvar: "#F3D9AE", zemin: "#C89B6C" },
  gun: { gok: "#BFE4F5", duvar: "#F7EAD3", zemin: "#D9B48A", gunes: "#FFF1C9" },
  ahsap: { koyu: "#4A3226", orta: "#6E4A36", acik: "#93684B" },
  ten: "#F2C6A4", tenGolge: "#DDA584", yanak: "#F29C8A", sac: "#2B2233", sacGri: "#B9B4BF",
  sen: "#3F8077", senKoyu: "#2F6159", babaanne: "#7C5C9A", yazma: "#FBF6EC", yazmaDesen: "#E8573F",
  doktor: "#F4F6FA", mercan: "#E8573F", hardal: "#F4BE4F", lavanta: "#C9C2E6", lacivert: "#22264A",
  yorgan: "#D9604A", yorganDesen: "#F4BE4F", yastik: "#F3EEE6", karanlik: "#0B0C1A", goz: "#FF8A4C",
};

/** Ortak tanımlar: gren, kaynayan duman filtresi, yumuşak ışık. Her sahne bir kez çizer. */
export const Tanimlar: React.FC<{ f: number }> = ({ f }) => (
  <defs>
    <filter id="dv-gren" x="0" y="0" width={W} height={H} filterUnits="userSpaceOnUse">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={Math.floor(f / 2) % 7} />
      <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.45  0 0 0 0 0.4  0 0 0 0.55 -0.12" />
    </filter>
    <filter id="dv-duman" x="-30%" y="-30%" width="160%" height="160%">
      <feTurbulence type="fractalNoise" baseFrequency="0.018 0.03" numOctaves={3} seed={Math.floor(f / 3) % 50} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={30} xChannelSelector="R" yChannelSelector="G" result="d" />
      <feGaussianBlur in="d" stdDeviation="4" />
    </filter>
    <filter id="dv-yumusak" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18" /></filter>
    <filter id="dv-bulanik" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" /></filter>
    <filter id="dv-parilti" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="10" /></filter>
    <radialGradient id="dv-lambaIsik"><stop offset="0%" stopColor={DV.sicak.parilti} stopOpacity={0.95} /><stop offset="45%" stopColor={DV.sicak.lamba} stopOpacity={0.45} /><stop offset="100%" stopColor={DV.sicak.lamba} stopOpacity={0} /></radialGradient>
    <radialGradient id="dv-ayIsik"><stop offset="0%" stopColor={DV.gece.ay} stopOpacity={0.7} /><stop offset="100%" stopColor={DV.gece.ayIsik} stopOpacity={0} /></radialGradient>
    <radialGradient id="dv-gozIsik"><stop offset="0%" stopColor="#FFE2B0" /><stop offset="35%" stopColor={DV.goz} /><stop offset="100%" stopColor={DV.goz} stopOpacity={0} /></radialGradient>
    <radialGradient id="dv-vinyet" cx="50%" cy="48%" r="72%"><stop offset="62%" stopColor="#000" stopOpacity={0} /><stop offset="100%" stopColor="#0B0C1A" stopOpacity={0.55} /></radialGradient>
  </defs>
);

const Sahne: React.FC<SahneProps & { renkTon?: string; tonOpak?: number; flas?: number }> = ({
  f, isik = 1, kamera = { x: 0, y: 0, olcek: 1 }, sarsinti = 0, children, renkTon, tonOpak = 0, flas = 0,
}) => {
  const sx = sarsinti * (gurultu(f * 1.7, 3) - 0.5) * 30;
  const sy = sarsinti * (gurultu(f * 1.9, 4) - 0.5) * 30;
  const kx = kamera.x + Math.sin(f * 0.019) * 5 + sx;
  const ky = kamera.y + Math.cos(f * 0.015) * 4 + sy;
  const tf = `translate(${W / 2 + kx} ${H / 2 + ky}) scale(${kamera.olcek}) rotate(${kamera.aci ?? 0}) translate(${-W / 2} ${-H / 2})`;
  return (
    <AbsoluteFill style={{ background: DV.gece.gok }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <Tanimlar f={f} />
        <g transform={tf}>{children}</g>
        {renkTon ? <rect width={W} height={H} fill={renkTon} opacity={tonOpak} style={{ mixBlendMode: "multiply" }} /> : null}
        <rect width={W} height={H} filter="url(#dv-gren)" opacity={0.35} style={{ mixBlendMode: "overlay" }} />
        <rect width={W} height={H} fill="url(#dv-vinyet)" />
        <rect width={W} height={H} fill="#0B0C1A" opacity={Math.max(0, 1 - isik) * 0.85} />
        {flas > 0 ? <rect width={W} height={H} fill="#FFF6E0" opacity={flas} /> : null}
      </svg>
    </AbsoluteFill>
  );
};

export const duzVektor: StilMotoru = {
  slug: "duz-vektor",
  ad: "Düz vektör gece masalı",
  palet: { zemin: [DV.gece.gok, DV.gece.duvar, DV.sicak.duvar], murekkep: DV.lacivert, vurgular: { mercan: DV.mercan, hardal: DV.hardal, goz: DV.goz }, isik: DV.sicak.parilti },
  cizgi: { kalinlik: 0, uc: "round" },
  hareket: { adim: 1, titremeGenligi: 2, kameraKayma: 5 },
  Sahne,
  gecis: (f, bas, uz) => { const t = (f - bas) / uz; return t <= 0 || t >= 1 ? 1 : 1 - 0.5 * Math.sin(t * Math.PI); },
};
export const DVSahne = Sahne;
