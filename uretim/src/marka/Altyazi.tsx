// Kelime kelime akan altyazı: söylenen kelime mercan, söylenmiş kâğıt, sıradakiler soluk (%30). Parçalar ve satır kırılımları araclar/altyazi_hazirla.py tarafından Inter ile
// ÖLÇÜLEREK hazırlanır (taşma kontrolü orada); burada yalnız gösterilir. Altyazı yalnız ALTYAZI bandında durur.
import React from "react";
import { interpolate } from "remotion";
import { FONT } from "./fontlar";
import { ALTYAZI, RENK } from "./yerlesim";
import { kenet } from "../motor/yardimci";

export type AltyaziKelime = { w: string; bas: number; son: number; satir: number };
export type AltyaziParca = { bas: number; son: number; kelimeler: AltyaziKelime[] };

export const Altyazi: React.FC<{ f: number; parcalar: AltyaziParca[]; renk?: string; golge?: string }> = ({
  f, parcalar, renk = RENK.kagit, golge = "rgba(0,0,0,0.55)",
}) => {
  const p = parcalar.find((x) => f >= x.bas && f < x.son);
  if (!p) return null;
  const satirlar = [0, 1].map((s) => p.kelimeler.filter((k) => k.satir === s)).filter((s) => s.length);
  const satirH = ALTYAZI.boyut * ALTYAZI.satirAraligi;
  const ustY = (ALTYAZI.y1 + ALTYAZI.y2) / 2 - (satirlar.length * satirH) / 2;
  return (
    <div style={{ position: "absolute", left: ALTYAZI.x1, width: ALTYAZI.x2 - ALTYAZI.x1, top: ustY, textAlign: "center" }}>
      {satirlar.map((s, i) => (
        <div key={i} style={{ height: satirH, lineHeight: `${satirH}px`, whiteSpace: "nowrap" }}>
          {s.map((k, j) => {
            const gorun = interpolate(f, [k.bas - 1, k.bas + 3], [0, 1], kenet);
            const op = 0.3 + 0.7 * gorun; // henüz söylenmeyen kelime soluk durur (satır kaymaz)
            const etkin = f >= k.bas && f < Math.max(k.son, k.bas + 6);
            return (
              <span key={j} style={{ display: "inline-block", marginRight: j < s.length - 1 ? "0.26em" : 0,
                fontFamily: FONT.metin, fontWeight: 800, fontSize: ALTYAZI.boyut, color: etkin ? RENK.mercan : renk,
                opacity: op, transform: `translateY(${(1 - gorun) * 14}px) scale(${0.92 + 0.08 * gorun + (etkin ? 0.04 : 0)})`,
                textShadow: `0 3px 0 ${golge}` }}>{k.w}</span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
