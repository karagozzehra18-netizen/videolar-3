// BİTİŞ EKRANI (3 sn, 90 kare) — hareketli, her videoda aynı düzen (kullanıcı kararı 25.11.2026):
//   0-6    son kare kâğıt zemine açılır          · 0-30  rozet logo belirir, dikişler "dikilir", ad gelir
//   16-34  SORU kelime kelime (bolum.json → bitis.soru; yoksa "Beğen, takip et, paylaş!")  · 28-40 "Cevabını yorumlara yaz"
//   34-48  Beğen / Takip et / Paylaş düğmeleri sırayla zıplar · DOKUNMA karelerinde parmak dokunuşu (kalp dolar,
//          + işareti ✓ olur, paylaş oku uçar) — ses: "tik" efekti aynı karelerde (bolum.json → efektler)
//   50-72  YouTube / Instagram / TikTok logoları sırayla yükselir + @duymasakin
// Yerleşim platform düğmelerinden uzak: içerik x 150-930, y 200-1500. Dokunan parmak düğmeden düğmeye gider.
import React from "react";
import { interpolate } from "remotion";
import { FONT } from "./fontlar";
import { Logo } from "./Logo";
import { RENK } from "./yerlesim";
import { firla, ilerle, kenet } from "../motor/yardimci";

export const DOKUNMA = [44, 52, 60]; // bitiş ekranının kendi karesi; efekt yerleşimi bununla aynı olmalı

const SEKILLER = [
  { x: 160, y: 420, r: 26, c: RENK.hardal }, { x: 930, y: 520, r: 18, c: RENK.lavanta }, { x: 120, y: 1450, r: 22, c: RENK.seftali },
  { x: 960, y: 1300, r: 30, c: RENK.lavanta }, { x: 300, y: 1750, r: 14, c: RENK.hardal }, { x: 820, y: 230, r: 12, c: RENK.seftali },
  { x: 90, y: 900, r: 16, c: RENK.lavanta }, { x: 990, y: 820, r: 14, c: RENK.hardal },
];

// --- düğme simgeleri (24x24 kutuda)
const Kalp: React.FC<{ dolu: number }> = ({ dolu }) => (
  <path d="M12 21 C 5 15 1 11.5 1 7.5 C 1 4.5 3.5 2 6.5 2 C 8.6 2 10.6 3.2 12 5 C 13.4 3.2 15.4 2 17.5 2 C 20.5 2 23 4.5 23 7.5 C 23 11.5 19 15 12 21 Z"
    fill={dolu > 0.5 ? RENK.kagit : "none"} stroke={RENK.kagit} strokeWidth={2.4} strokeLinejoin="round" />
);
const Arti: React.FC<{ t: number }> = ({ t }) =>
  t < 0.5 ? <path d="M12 4 V20 M4 12 H20" stroke={RENK.kagit} strokeWidth={3} strokeLinecap="round" />
    : <path d="M4 12.5 L10 18 L20 6" fill="none" stroke={RENK.kagit} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />;
const Paylas: React.FC<{ t: number }> = ({ t }) => (
  <g transform={`translate(${t * 6} ${-t * 6})`}>
    <path d="M4 20 C 5 12 10 8 17 8 V3 L23 10 L17 17 V12 C 11 12 7 14 4 20 Z" fill={RENK.kagit} />
  </g>
);

// --- platform logoları (sade, kodla çizilmiş; 100x100 kutu)
const YouTube = () => (
  <g><rect x={4} y={18} width={92} height={64} rx={20} fill="#FF0033" /><path d="M41 35 L66 50 L41 65 Z" fill="#fff" /></g>
);
const Instagram = () => (
  <g>
    <defs>
      <radialGradient id="ig-g" cx="25%" cy="105%" r="130%">
        <stop offset="0%" stopColor="#FFD776" /><stop offset="25%" stopColor="#F9A040" /><stop offset="50%" stopColor="#E1306C" />
        <stop offset="75%" stopColor="#B5279C" /><stop offset="100%" stopColor="#5B4FE0" />
      </radialGradient>
    </defs>
    <rect x={6} y={6} width={88} height={88} rx={26} fill="url(#ig-g)" />
    <rect x={24} y={24} width={52} height={52} rx={16} fill="none" stroke="#fff" strokeWidth={6} />
    <circle cx={50} cy={50} r={12} fill="none" stroke="#fff" strokeWidth={6} /><circle cx={66} cy={34} r={4} fill="#fff" />
  </g>
);
const TikTok = () => {
  const nota = (dx: number, dy: number, c: string) => (
    <g transform={`translate(${dx} ${dy})`} fill="none" stroke={c} strokeWidth={9} strokeLinecap="round">
      <path d="M54 22 V62" /><circle cx={42} cy={63} r={11} /><path d="M54 24 C 56 33 63 39 72 40" />
    </g>
  );
  return (
    <g><rect x={6} y={6} width={88} height={88} rx={24} fill="#111" />{nota(-2, -2, "#25F4EE")}{nota(2, 2, "#FE2C55")}{nota(0, 0, "#fff")}</g>
  );
};

const DW = 252, DH = 168;
const DUGME_X = [150, 414, 678]; // sol kenarlar (genişlik 252, aralık 12) → 150..930

const Dugme: React.FC<{ f: number; bas: number; dokun: number; renk: string; yazi: string; ikon: (t: number) => React.ReactNode }> = ({ f, bas, dokun, renk, yazi, ikon }) => {
  const g = ilerle(f, bas, bas + 10, firla);
  const t = ilerle(f, dokun, dokun + 4);
  const bas2 = f >= dokun && f < dokun + 6 ? 0.92 + 0.08 * ((f - dokun) / 6) : 1; // basılma
  const halka = ilerle(f, dokun, dokun + 12);
  return (
    <div style={{ position: "relative", width: DW, height: DH, transform: `scale(${g * bas2})`, opacity: Math.min(1, g * 2) }}>
      {halka > 0 && halka < 1 ? (
        <div style={{ position: "absolute", left: DW / 2 - 90 * (1 + halka), top: DH / 2 - 90 * (1 + halka), width: 180 * (1 + halka), height: 180 * (1 + halka),
          borderRadius: "50%", border: `8px solid ${renk}`, opacity: 1 - halka }} />
      ) : null}
      <div style={{ position: "absolute", inset: 0, background: renk, borderRadius: 40, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: 6, boxShadow: `0 8px 0 ${RENK.lacivert}` }}>
        <svg width={64} height={64} viewBox="0 0 24 24">{ikon(t)}</svg>
        <span style={{ fontFamily: FONT.metin, fontWeight: 800, fontSize: 38, color: RENK.kagit, whiteSpace: "nowrap" }}>{yazi}</span>
      </div>
    </div>
  );
};

/** f: bitiş ekranının kendi karesi (0'dan başlar). */
export const BitisEkrani: React.FC<{ f: number; soru?: string; vurgu?: string }> = ({ f, soru, vurgu }) => {
  const zemin = interpolate(f, [0, 6], [0, 1], kenet);
  const logo = ilerle(f, 0, 14, firla);
  const dikis = ilerle(f, 10, 30);
  const ad = ilerle(f, 10, 22);
  const kelimeler = (soru ?? "Beğen, takip et, paylaş!").split(" ");
  const alt = ilerle(f, 28, 40);
  const handle = ilerle(f, 62, 72);
  return (
    <div style={{ position: "absolute", inset: 0, background: RENK.kagit, opacity: zemin }}>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        {SEKILLER.map((s, i) => (
          <circle key={i} cx={s.x + Math.sin(f * 0.06 + i) * 16} cy={s.y + Math.cos(f * 0.05 + i * 2) * 20} r={s.r} fill={s.c} opacity={0.8} />
        ))}
        <path d={Array.from({ length: 40 }, (_, i) => `${i ? "L" : "M"}${60 + i * 25},${1640 + Math.sin(i * 0.9 + f * 0.3) * 22 * Math.sin((i / 39) * Math.PI)}`).join(" ")}
          fill="none" stroke={RENK.lavanta} strokeWidth={6} strokeLinecap="round" opacity={0.9} />
        <path d="M120 1760 L960 1760" stroke={RENK.seftali} strokeWidth={6} strokeDasharray="26 18" strokeDashoffset={-f * 2.5} />
      </svg>
      {/* rozet + ad */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center",
        transform: `scale(${0.7 + 0.3 * logo}) rotate(${(1 - logo) * -20}deg)`, opacity: Math.min(1, logo * 1.5) }}>
        <Logo boyut={280} dikis={dikis} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 500, textAlign: "center", fontFamily: FONT.baslik, fontWeight: 800,
        fontSize: 96, opacity: ad, transform: `translateY(${(1 - ad) * 20}px)` }}>
        <span style={{ color: RENK.lacivert }}>Duyma </span><span style={{ color: RENK.mercan }}>Sakın</span>
      </div>
      {/* soru */}
      <div style={{ position: "absolute", left: 120, right: 120, top: 660, textAlign: "center", fontFamily: FONT.baslik, fontWeight: 800,
        fontSize: 92, lineHeight: 1.1, color: RENK.lacivert }}>
        {kelimeler.map((k, i) => {
          const t = ilerle(f, 16 + i * 3, 24 + i * 3, firla);
          const v = vurgu && k.toLocaleLowerCase("tr-TR").startsWith(vurgu.toLocaleLowerCase("tr-TR"));
          return <span key={i} style={{ display: "inline-block", marginRight: "0.25em", color: v ? RENK.mercan : RENK.lacivert,
            opacity: Math.min(1, t * 1.5), transform: `translateY(${(1 - t) * 40}px) scale(${0.6 + 0.4 * t})` }}>{k}</span>;
        })}
      </div>
      {soru ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 880, textAlign: "center", fontFamily: FONT.metin, fontWeight: 600,
          fontSize: 44, color: RENK.lacivert, opacity: 0.75 * alt, transform: `translateY(${(1 - alt) * 16}px)` }}>
          Cevabını yorumlara yaz ↓
        </div>
      ) : null}
      {/* eylem düğmeleri */}
      <div style={{ position: "absolute", left: 150, width: 780, top: 990, display: "flex", justifyContent: "space-between" }}>
        <Dugme f={f} bas={34} dokun={DOKUNMA[0]} renk={RENK.mercan} yazi="Beğen" ikon={(t) => <Kalp dolu={t} />} />
        <Dugme f={f} bas={39} dokun={DOKUNMA[1]} renk={RENK.lacivert} yazi={f >= DOKUNMA[1] + 2 ? "Takiptesin" : "Takip et"} ikon={(t) => <Arti t={t} />} />
        <Dugme f={f} bas={44} dokun={DOKUNMA[2]} renk={RENK.teal} yazi="Paylaş" ikon={(t) => <Paylas t={t} />} />
      </div>
      {/* dokunan parmak: düğmeden düğmeye gider, DOKUNMA karelerinde basar */}
      {(() => {
        if (f < DOKUNMA[0] - 8 || f > DOKUNMA[2] + 10) return null;
        const hedef = (k: number) => ({ x: DUGME_X[k] + DW * 0.62, y: 990 + DH * 0.62 });
        let p = hedef(0);
        for (let k = 1; k < 3; k++) {
          const t = ilerle(f, DOKUNMA[k - 1] + 2, DOKUNMA[k] - 1);
          const a = hedef(k - 1), b = hedef(k);
          if (f > DOKUNMA[k - 1] + 2) p = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t - Math.sin(t * Math.PI) * 40 };
        }
        const gir = ilerle(f, DOKUNMA[0] - 8, DOKUNMA[0]);
        const bas = DOKUNMA.some((d) => f >= d && f < d + 4) ? 0.8 : 1;
        const cik = 1 - ilerle(f, DOKUNMA[2] + 4, DOKUNMA[2] + 10);
        return <div style={{ position: "absolute", left: p.x - 34, top: p.y - 34 + (1 - gir) * 120, width: 68, height: 68, borderRadius: "50%",
          background: "rgba(255,255,255,0.92)", border: `5px solid ${RENK.lacivert}`, boxShadow: "0 6px 14px rgba(34,38,74,0.35)",
          transform: `scale(${bas})`, opacity: Math.min(gir, cik) }} />;
      })()}
      {/* sosyal medya logoları */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1236, display: "flex", justifyContent: "center", gap: 60 }}>
        {[YouTube, Instagram, TikTok].map((L, i) => {
          const t = ilerle(f, 50 + i * 5, 62 + i * 5, firla);
          return (
            <svg key={i} width={160} height={160} viewBox="0 0 100 100" style={{ opacity: Math.min(1, t * 1.6),
              transform: `translateY(${(1 - t) * 80 + Math.sin(f * 0.15 + i) * 4}px) rotate(${(1 - t) * (i - 1) * 20}deg)` }}>
              <L />
            </svg>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 1420, textAlign: "center", fontFamily: FONT.metin, fontWeight: 800,
        fontSize: 56, letterSpacing: 1, color: RENK.lacivert, opacity: handle, transform: `translateY(${(1 - handle) * 16}px)` }}>
        @duymasakin
      </div>
    </div>
  );
};
