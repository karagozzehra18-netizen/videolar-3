// Video filigranı (her videoda AYNI, stilden bağımsız): vektör rozet logo, sağ üstte başlık kartıyla aynı hizada,
// ince krem halka + yumuşak gölge; çok yavaş "nefes" (ölçek ±1,5%). PNG değil, kodla çizilir (keskin).
import React from "react";
import { Logo } from "./Logo";
import { FILIGRAN } from "./yerlesim";

export const Filigran: React.FC<{ gorunur: boolean; f?: number }> = ({ gorunur, f = 0 }) =>
  gorunur ? (
    <div style={{ position: "absolute", right: FILIGRAN.sag, top: FILIGRAN.ust, width: FILIGRAN.boyut, height: FILIGRAN.boyut,
      opacity: FILIGRAN.opaklik, borderRadius: "50%", boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
      transform: `scale(${1 + Math.sin(f * 0.05) * 0.015})` }}>
      <Logo boyut={FILIGRAN.boyut} />
    </div>
  ) : null;
