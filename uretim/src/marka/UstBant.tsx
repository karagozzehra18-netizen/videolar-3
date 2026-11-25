// Üst başlık kilidi (her videoda AYNI tasarım, stilden bağımsız; süre çubuğu yok — kullanıcı kararı 25.11.2026):
// sol üstte yarı saydam lacivert kart (buzlu cam), içinde üstte küçük mercan kategori satırı ("KORKU · ANADOLU"),
// altında Fraunces 800 başlık ("Karabasan"). İlk 10 karede soldan hafifçe kayar (ilk karede de tam görünür); bitiş ekranında görünmez.
import React from "react";
import { FONT } from "./fontlar";
import { RENK, UST_BANT } from "./yerlesim";
import { ilerle, firla } from "../motor/yardimci";

export const UstBant: React.FC<{ f: number; baslik: string; kategori: string; bitisKaresi: number }> = ({ f, baslik, kategori, bitisKaresi }) => {
  if (f >= bitisKaresi) return null;
  const g = ilerle(f, 0, 10, firla);
  return (
    <div style={{ position: "absolute", left: UST_BANT.x, top: UST_BANT.y, transform: `translateX(${(1 - g) * -24}px)`,
      background: "rgba(34,38,74,0.74)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
      border: "1.5px solid rgba(251,246,236,0.22)", borderRadius: 18, padding: "12px 22px 14px 18px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.25)", display: "flex", alignItems: "stretch", gap: 14 }}>
      <div style={{ width: 6, borderRadius: 3, background: RENK.mercan }} />
      <div>
        <div style={{ fontFamily: FONT.metin, fontWeight: 800, fontSize: 19, letterSpacing: 3.5, color: RENK.mercan, lineHeight: 1.1 }}>
          {kategori.toLocaleUpperCase("tr-TR")}
        </div>
        <div style={{ fontFamily: FONT.baslik, fontWeight: 800, fontSize: UST_BANT.baslikBoyut, color: RENK.kagit, lineHeight: 1.05, marginTop: 4,
          letterSpacing: 0.5 }}>
          {baslik}
        </div>
      </div>
    </div>
  );
};
