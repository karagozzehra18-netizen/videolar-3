// Karakter deneme sayfası (render ile göz kontrolü için): npx remotion still src/index.ts dv-deneme out.png
import React from "react";
import { useCurrentFrame } from "remotion";
import { DVSahne, DV } from "./motor";
import { Bas, Karabasan, Kisi, type Ifade } from "./karakterler";

export const DVDeneme: React.FC = () => {
  const f = useCurrentFrame();
  const ifadeler: Ifade[] = ["normal", "korku", "dehset", "gulumse", "ciddi", "uyku"];
  return (
    <DVSahne f={f}>
      <rect width={1080} height={1920} fill={DV.sicak.duvar} />
      <Kisi tip="sen" x={260} y={560} olcek={0.8} f={f} ifade="korku" />
      <Kisi tip="babaanne" x={560} y={560} olcek={0.8} f={f} ifade="gulumse" kolSag={-30} />
      <Kisi tip="doktor" x={860} y={560} olcek={0.8} f={f} ifade="normal" konus={1} />
      {ifadeler.map((i, k) => <g key={i} transform={`translate(${120 + k * 170} 960) scale(0.62)`}><Bas tip="sen" ifade={i} f={20} /></g>)}
      {ifadeler.map((i, k) => <g key={i} transform={`translate(${120 + k * 170} 1180) scale(0.62)`}><Bas tip="babaanne" ifade={i} f={20} /></g>)}
      <rect y={1350} width={1080} height={570} fill={DV.gece.duvar} />
      <Karabasan x={540} y={1700} olcek={0.9} f={f} />
    </DVSahne>
  );
};
