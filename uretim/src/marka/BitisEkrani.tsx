// Bitiş ekranı (2,5 sn) — kanal-kimligi'ndeki sıra: zemine açılış → rozet (dikişler) → ad → "Takip et".
import React from "react";
import { interpolate } from "remotion";
import { FONT } from "./fontlar";
import { Logo } from "./Logo";
import { RENK } from "./yerlesim";
import { firla, ilerle, kenet } from "../motor/yardimci";

const SEKILLER = [
  { x: 160, y: 420, r: 26, c: RENK.hardal }, { x: 930, y: 520, r: 18, c: RENK.lavanta }, { x: 120, y: 1450, r: 22, c: RENK.seftali },
  { x: 960, y: 1380, r: 30, c: RENK.lavanta }, { x: 300, y: 1700, r: 14, c: RENK.hardal }, { x: 820, y: 300, r: 12, c: RENK.seftali },
];

/** f: bitiş ekranının kendi karesi (0'dan başlar). */
export const BitisEkrani: React.FC<{ f: number }> = ({ f }) => {
  const zemin = interpolate(f, [0, 6], [0, 1], kenet);
  const logo = ilerle(f, 6, 22, firla);
  const dikis = ilerle(f, 12, 36);
  const ad = ilerle(f, 18, 30);
  const takip = ilerle(f, 30, 42);
  return (
    <div style={{ position: "absolute", inset: 0, background: RENK.kagit, opacity: zemin }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {SEKILLER.map((s, i) => (
          <circle key={i} cx={s.x + Math.sin(f * 0.05 + i) * 14} cy={s.y + Math.cos(f * 0.04 + i * 2) * 18} r={s.r} fill={s.c} opacity={0.8} />
        ))}
        {/* ses dalgası deseni */}
        <path d={Array.from({ length: 40 }, (_, i) => `${i ? "L" : "M"}${60 + i * 25},${1250 + Math.sin(i * 0.9 + f * 0.25) * 22 * Math.sin((i / 39) * Math.PI)}`).join(" ")}
          fill="none" stroke={RENK.lavanta} strokeWidth={6} strokeLinecap="round" opacity={0.9} />
        {/* dikiş çizgisi */}
        <path d="M120 1560 L960 1560" stroke={RENK.seftali} strokeWidth={6} strokeDasharray="26 18" strokeDashoffset={-f * 2} />
      </svg>
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, display: "flex", justifyContent: "center",
        transform: `scale(${0.8 + 0.2 * logo})`, opacity: Math.min(1, logo * 1.4) }}>
        <Logo boyut={420} dikis={dikis} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 940, textAlign: "center", fontFamily: FONT.baslik, fontWeight: 800,
        fontSize: 110, opacity: ad, transform: `translateY(${(1 - ad) * 24}px)` }}>
        <span style={{ color: RENK.lacivert }}>Duyma </span><span style={{ color: RENK.mercan }}>Sakın</span>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1090, textAlign: "center", fontFamily: FONT.metin, fontWeight: 600,
        fontSize: 42, color: RENK.lacivert, opacity: 0.7 * takip }}>
        Takip et — bir sonrakini kaçırma
      </div>
    </div>
  );
};
