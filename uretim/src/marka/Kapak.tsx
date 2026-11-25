// KAPAK ŞABLONU — her videoda AYNI düzen (kullanıcının onayladığı kanal kapak formatı):
//   1. Zemin: bölümün stil renginde degrade + dağınık yumuşak şekiller (renk/desen bolum.json → kapak)
//   2. Üstte küçük etiket hapı: "KORKU · ANADOLU" (mercan)
//   3. 2 satır başlık, Fraunces 900, kâğıt rengi + lacivert kontur (satır başına ≤10 karakter)
//   4. Ortada çerçeveli sahne kartı: videonun TEMİZ karesinden yalnız çizim alanı (mercan çerçeve, yuvarlak köşe)
//   5. Kartın altında şerit: rozet logo · "Duyma Sakın" · "KORKU #001" · "▶ İZLE"
// Değişen yalnız: kare, iki satır, etiket, numara, renkler. Düzen, font ve boyutlar değişmez.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FONT } from "./fontlar";
import { Logo } from "./Logo";
import { RENK, SAHNE } from "./yerlesim";
import { hash } from "../motor/yardimci";

export type KapakProps = { zemin: string; satir1: string; satir2: string; no: number; etiket: string; renk: string[]; desen: string[] };

const KART = { x: 100, y: 700, w: 880, cerceve: 12 };

export const Kapak: React.FC<KapakProps> = ({ zemin, satir1, satir2, no, etiket, renk, desen }) => {
  const boyut = Math.min(150, Math.floor(900 / (Math.max(satir1.length, satir2.length) * 0.68)));
  const ic = KART.w - KART.cerceve * 2;
  const olcek = ic / SAHNE.w;
  const icH = Math.round(SAHNE.h * olcek);
  const baslik: React.CSSProperties = {
    fontFamily: FONT.baslik, fontWeight: 900, fontSize: boyut, lineHeight: 1.0, color: RENK.kagit,
    WebkitTextStroke: `${Math.round(boyut * 0.09)}px ${RENK.lacivert}`, paintOrder: "stroke fill",
    textShadow: `0 ${Math.round(boyut * 0.06)}px 0 ${RENK.lacivert}`, letterSpacing: 1,
  };
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 38%, ${renk[0]} 0%, ${renk[1]} 78%)` }}>
      {/* dağınık yumuşak şekiller */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {Array.from({ length: 26 }, (_, i) => {
          const x = hash(i * 3.1) * 1080, y = hash(i * 7.7) * 1920, r = 18 + hash(i * 1.9) * 46;
          return <rect key={i} x={x} y={y} width={r} height={r} rx={6} transform={`rotate(${hash(i * 5.3) * 90} ${x} ${y})`}
            fill={desen[i % desen.length]} opacity={0.18} />;
        })}
      </svg>
      {/* etiket hapı */}
      <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div style={{ background: RENK.mercan, color: RENK.kagit, fontFamily: FONT.metin, fontWeight: 800, fontSize: 30,
          letterSpacing: 4, padding: "8px 24px", borderRadius: 10, boxShadow: `0 4px 0 ${RENK.lacivert}` }}>
          {etiket.toLocaleUpperCase("tr-TR")}
        </div>
      </div>
      {/* başlık */}
      <div style={{ position: "absolute", top: 400, left: 60, right: 60, textAlign: "center" }}>
        <div style={baslik}>{satir1}</div>
        <div style={baslik}>{satir2}</div>
      </div>
      {/* sahne kartı */}
      <div style={{ position: "absolute", left: KART.x, top: KART.y, width: KART.w, height: icH + KART.cerceve * 2,
        background: RENK.mercan, borderRadius: 34, padding: KART.cerceve, boxShadow: `0 10px 0 ${RENK.lacivert}, 0 24px 40px rgba(0,0,0,0.35)` }}>
        <div style={{ position: "relative", width: ic, height: icH, borderRadius: 24, overflow: "hidden", background: "#000" }}>
          <Img src={staticFile(zemin)} style={{ position: "absolute", left: -SAHNE.x * olcek, top: -SAHNE.y * olcek, width: 1080 * olcek, height: 1920 * olcek }} />
          {/* alt şerit */}
          <div style={{ position: "absolute", left: 18, right: 18, bottom: 18, height: 92, background: RENK.kagit, borderRadius: 22,
            display: "flex", alignItems: "center", padding: "0 16px", gap: 14, boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            <Logo boyut={68} />
            <div style={{ fontFamily: FONT.baslik, fontWeight: 800, fontSize: 40, color: RENK.lacivert, whiteSpace: "nowrap" }}>
              Duyma <span style={{ color: RENK.mercan }}>Sakın</span>
            </div>
            <div style={{ flex: 1, textAlign: "center", fontFamily: FONT.metin, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: RENK.lacivert, opacity: 0.75 }}>
              {etiket.split("·")[0].trim().toLocaleUpperCase("tr-TR")} #{String(no).padStart(3, "0")}
            </div>
            <div style={{ background: RENK.mercan, color: RENK.kagit, fontFamily: FONT.metin, fontWeight: 800, fontSize: 28,
              letterSpacing: 2, padding: "10px 20px", borderRadius: 14 }}>▶ İZLE</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
