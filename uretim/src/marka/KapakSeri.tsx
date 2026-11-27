// SERİ KAPAK ŞABLONU (v2, profesyonel) — her partta aynı düzen, partın kendi renk tonu.
// Düzen (1080x1920; Instagram ızgara kırpımı 3:4 = y 240-1680 içinde kalır):
//   y 300  seri hapı "KARABASAN SERİSİ"
//   y 360  2 satır başlık (Fraunces 900; 1. satır kâğıt, 2. satır hardal), satır başına ≤10 karakter
//   y 690  sahne kartı (kodla çizilmiş ÖZEL kapak sahnesi, video karesi değil) + sol üstte döndürülmüş "PART N" rozeti
//   kart altı: rozet logo · Duyma Sakın · PART N/5 · ▶ İZLE
import React from "react";
import { AbsoluteFill } from "remotion";
import { FONT } from "./fontlar";
import { Logo } from "./Logo";
import { RENK } from "./yerlesim";
import { Tanimlar } from "../stiller/duz-vektor/motor";
import { hash } from "../motor/yardimci";

export type KapakSeriProps = {
  seri: string; part: number; toplam: number; satir1: string; satir2: string;
  renk: [string, string]; vurgu: string;
  sahne: React.ReactNode; gorus: { x: number; y: number; w: number; h: number }; // sahnenin hangi bölgesi karta girer (1080x1920 koordinatı)
};

const KART = { x: 90, y: 690, w: 900, h: 880, cerceve: 14 };

export const KapakSeri: React.FC<KapakSeriProps> = ({ seri, part, toplam, satir1, satir2, renk, vurgu, sahne, gorus }) => {
  const boyut = Math.min(156, Math.floor(920 / (Math.max(satir1.length, satir2.length) * 0.68)));
  const iw = KART.w - KART.cerceve * 2, ih = KART.h - KART.cerceve * 2;
  // görüş bölgesini kartın en-boy oranına uydur (ortadan)
  const oran = iw / ih;
  const gw = Math.min(gorus.w, gorus.h * oran), gh = gw / oran;
  const gx = gorus.x + (gorus.w - gw) / 2, gy = gorus.y + (gorus.h - gh) / 2;
  const baslik = (renkY: string): React.CSSProperties => ({
    fontFamily: FONT.baslik, fontWeight: 900, fontSize: boyut, lineHeight: 0.98, color: renkY, letterSpacing: 1,
    WebkitTextStroke: `${Math.round(boyut * 0.09)}px ${RENK.lacivert}`, paintOrder: "stroke fill",
    textShadow: `0 ${Math.round(boyut * 0.07)}px 0 ${RENK.lacivert}, 0 18px 40px rgba(0,0,0,0.35)`,
  });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, ${renk[0]} 0%, ${renk[1]} 75%)` }}>
      {/* gece deseni: yıldızlar, hilal, ses dalgası */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 46 }, (_, i) => (
          <circle key={i} cx={hash(i * 3.7) * 1080} cy={hash(i * 9.1) * 1920} r={1.5 + hash(i * 2.3) * 3.5} fill="#FFF6E0" opacity={0.25 + hash(i * 5.9) * 0.45} />
        ))}
        <g transform="translate(905 175)" opacity={0.9}><circle r={56} fill="#FFE9B8" /><circle cx={24} cy={-14} r={50} fill={renk[0]} /></g>
        <path d={Array.from({ length: 40 }, (_, i) => `${i ? "L" : "M"}${40 + i * 26},${1760 + Math.sin(i * 0.9) * 26 * Math.sin((i / 39) * Math.PI)}`).join(" ")}
          fill="none" stroke={vurgu} strokeWidth={6} strokeLinecap="round" opacity={0.5} />
      </svg>
      {/* seri hapı */}
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ background: RENK.mercan, color: RENK.kagit, fontFamily: FONT.metin, fontWeight: 800, fontSize: 30, letterSpacing: 5,
          padding: "9px 26px", borderRadius: 12, boxShadow: `0 5px 0 ${RENK.lacivert}` }}>
          {seri.toLocaleUpperCase("tr-TR")} SERİSİ
        </div>
      </div>
      {/* başlık */}
      <div style={{ position: "absolute", top: 362, left: 50, right: 50, textAlign: "center" }}>
        <div style={baslik(RENK.kagit)}>{satir1}</div>
        <div style={baslik(vurgu)}>{satir2}</div>
      </div>
      {/* kart */}
      <div style={{ position: "absolute", left: KART.x, top: KART.y, width: KART.w, height: KART.h, background: RENK.kagit, borderRadius: 40,
        padding: KART.cerceve, boxShadow: `0 12px 0 ${RENK.lacivert}, 0 30px 60px rgba(0,0,0,0.45)` }}>
        <div style={{ position: "relative", width: iw, height: ih, borderRadius: 28, overflow: "hidden", background: "#000" }}>
          <svg width={iw} height={ih} viewBox={`${gx} ${gy} ${gw} ${gh}`} preserveAspectRatio="xMidYMid slice">
            <Tanimlar f={40} />
            {sahne}
          </svg>
          <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 120px rgba(11,12,26,0.55)", borderRadius: 28 }} />
          {/* alt şerit */}
          <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, height: 92, background: RENK.kagit, borderRadius: 22,
            display: "flex", alignItems: "center", padding: "0 16px", gap: 14, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            <Logo boyut={68} />
            <div style={{ fontFamily: FONT.baslik, fontWeight: 800, fontSize: 40, color: RENK.lacivert, whiteSpace: "nowrap" }}>
              Duyma <span style={{ color: RENK.mercan }}>Sakın</span>
            </div>
            <div style={{ flex: 1, textAlign: "center", fontFamily: FONT.metin, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: RENK.lacivert, opacity: 0.75 }}>
              PART {part}/{toplam}
            </div>
            <div style={{ background: RENK.mercan, color: RENK.kagit, fontFamily: FONT.metin, fontWeight: 800, fontSize: 28, letterSpacing: 2, padding: "10px 20px", borderRadius: 14 }}>▶ İZLE</div>
          </div>
        </div>
      </div>
      {/* PART rozeti (kartın sol üst köşesi) */}
      <div style={{ position: "absolute", left: 40, top: 640, width: 190, height: 190, borderRadius: "50%", background: vurgu,
        border: `8px solid ${RENK.lacivert}`, transform: "rotate(-10deg)", display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", boxShadow: "0 10px 24px rgba(0,0,0,0.35)" }}>
        <div style={{ fontFamily: FONT.metin, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: RENK.lacivert, marginBottom: -10 }}>PART</div>
        <div style={{ fontFamily: FONT.baslik, fontWeight: 900, fontSize: 104, color: RENK.lacivert, lineHeight: 1 }}>{part}</div>
      </div>
    </AbsoluteFill>
  );
};
