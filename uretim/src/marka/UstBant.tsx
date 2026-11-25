// Üst bant: yalnız sabit kısa başlık (ilerleme/süre çubuğu kullanıcı isteğiyle kaldırıldı, 25.11.2026).
import React from "react";
import { FONT } from "./fontlar";
import { RENK, UST_BANT } from "./yerlesim";

export const UstBant: React.FC<{ f: number; baslik: string; bitisKaresi: number }> = ({ f, baslik, bitisKaresi }) => {
  if (f >= bitisKaresi) return null;
  return (
    <div style={{ position: "absolute", left: UST_BANT.x, top: UST_BANT.baslikY, fontFamily: FONT.metin, fontWeight: 700,
      fontSize: UST_BANT.baslikBoyut, letterSpacing: 2, color: RENK.kagit,
      textShadow: "0 2px 6px rgba(0,0,0,0.75), 0 0 2px rgba(0,0,0,0.9)" }}>
      {baslik.toLocaleUpperCase("tr-TR")}
    </div>
  );
};
