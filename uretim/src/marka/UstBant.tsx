// Üst bant: cümle sayısı kadar bölümlü ilerleme çubuğu (konuşma ilerledikçe mercan dolar) + sabit kısa başlık.
import React from "react";
import { FONT } from "./fontlar";
import { RENK, UST_BANT } from "./yerlesim";

export const UstBant: React.FC<{ f: number; bolumler: { bas: number; son: number }[]; baslik: string; bitisKaresi: number }> = ({
  f, bolumler, baslik, bitisKaresi,
}) => {
  if (f >= bitisKaresi) return null;
  const toplam = bolumler[bolumler.length - 1].son - bolumler[0].bas;
  const genislik = UST_BANT.x2 - UST_BANT.x1 - UST_BANT.aralik * (bolumler.length - 1);
  let x = UST_BANT.x1;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {bolumler.map((b, i) => {
        const w = (genislik * (b.son - b.bas)) / toplam;
        const dolu = Math.max(0, Math.min(1, (f - b.bas) / Math.max(1, b.son - b.bas)));
        const el = (
          <div key={i} style={{ position: "absolute", left: x, top: UST_BANT.y, width: w, height: UST_BANT.cubukYukseklik,
            borderRadius: 4, background: "rgba(251,246,236,0.35)", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.35)" }}>
            <div style={{ width: `${dolu * 100}%`, height: "100%", background: RENK.mercan }} />
          </div>
        );
        x += w + UST_BANT.aralik;
        return el;
      })}
      <div style={{ position: "absolute", left: UST_BANT.x1, top: UST_BANT.baslikY, fontFamily: FONT.metin, fontWeight: 700,
        fontSize: UST_BANT.baslikBoyut, letterSpacing: 2, color: RENK.kagit,
        textShadow: "0 2px 6px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.9)" }}>
        {baslik.toLocaleUpperCase("tr-TR")}
      </div>
    </div>
  );
};
