// Karakter düzeni (önden görünüm, temiz düz vektör): Bas (yüz + ifade) ve Govde (büst/oturan).
// Yerel koordinat: başın merkezi (0,0), baş yarıçapı ~100. Her şey `olcek` ile büyür.
// İfadeler: normal | korku | dehset | gulumse | ciddi | uyku | saskin | gerilim. Göz kırpma `f` ile otomatik.
import React from "react";
import { DV } from "./motor";
import { gurultu } from "../../motor/yardimci";

export type Tip = "sen" | "babaanne" | "doktor";
export type Ifade = "normal" | "korku" | "dehset" | "gulumse" | "ciddi" | "uyku" | "saskin" | "gerilim";

const kirpma = (f: number, tohum: number) => {
  // 3-4 sn'de bir, 5 karelik kırpma; deterministik
  const p = 100 + Math.floor(gurultu(tohum, 3) * 30);
  const k = (f + tohum * 37) % p;
  return k < 5 ? [1, 0.4, 0.05, 0.4, 1][k] : 1;
};

export type BasProps = {
  tip: Tip; ifade?: Ifade; f: number; bak?: { x: number; y: number }; acik?: number; konus?: number; tohum?: number; yatik?: boolean;
};

export const Bas: React.FC<BasProps> = ({ tip, ifade = "normal", f, bak = { x: 0, y: 0 }, acik, konus = 0, tohum = 1, yatik = false }) => {
  const gozAcik = acik ?? (ifade === "uyku" ? 0.02 : ifade === "dehset" ? 1.25 : ifade === "korku" ? 1.12 : ifade === "gulumse" ? 0.75 : 1) * kirpma(f, tohum);
  // kas[0] > 0: kaşların iç ucu yukarı (endişe/korku); < 0: iç uç aşağı (ciddi/gerilim). kas[1]: kaşı kaldırma
  const kas = { normal: [0, 0], korku: [16, 10], dehset: [20, 16], gulumse: [4, 4], ciddi: [-10, -4], uyku: [0, -2], saskin: [0, 14], gerilim: [-12, -4] }[ifade];
  const bx = Math.max(-1, Math.min(1, bak.x)) * 8, by = Math.max(-1, Math.min(1, bak.y)) * 6;
  const agizAc = konus > 0 ? (Math.sin(f * 0.9) * 0.5 + 0.5) * konus : 0;
  const goz = (sx: number) => {
    const ry = 21 * Math.min(1.3, gozAcik);
    return (
      <g transform={`translate(${sx * 36} 6)`}>
        {gozAcik < 0.12 ? (
          <path d={ifade === "uyku" || yatik ? "M-18 2 Q0 12 18 2" : "M-18 0 Q0 8 18 0"} fill="none" stroke={DV.lacivert} strokeWidth={5} strokeLinecap="round" />
        ) : (
          <>
            <ellipse rx={19} ry={ry} fill="#fff" />
            <clipPath id={`gz-${tip}-${sx}-${tohum}`}><ellipse rx={19} ry={ry} /></clipPath>
            <g clipPath={`url(#gz-${tip}-${sx}-${tohum})`}>
              <circle cx={bx} cy={by} r={ifade === "dehset" ? 9 : 12.5} fill={tip === "babaanne" ? "#5A4636" : "#3A2A24"} />
              <circle cx={bx} cy={by} r={ifade === "dehset" ? 4 : 6} fill="#120c10" />
              <circle cx={bx + 4} cy={by - 5} r={3.6} fill="#fff" />
            </g>
          </>
        )}
        <rect x={-18} y={-34 - (ifade === "dehset" ? 8 : 0)} width={36} height={8} rx={4} fill={tip === "sen" ? DV.sac : "#6D6272"}
          transform={`translate(0 ${-kas[1] * 0.7}) rotate(${sx * kas[0] * 0.8} 0 -30)`} />
      </g>
    );
  };
  const agiz = () => {
    switch (ifade) {
      case "korku": return <ellipse cx={0} cy={52} rx={11} ry={9 + agizAc * 6} fill="#6B2E35" />;
      case "dehset": return <ellipse cx={0} cy={55} rx={15} ry={18} fill="#4E1F28" />;
      case "gulumse": return <path d={`M-24 44 Q0 ${66 + agizAc * 6} 24 44`} fill="none" stroke="#8A3B3F" strokeWidth={6} strokeLinecap="round" />;
      case "ciddi": case "gerilim": return agizAc > 0.1 ? <ellipse cx={0} cy={50} rx={14} ry={3 + agizAc * 8} fill="#6B2E35" /> : <path d="M-16 50 L16 50" stroke="#8A3B3F" strokeWidth={6} strokeLinecap="round" />;
      case "saskin": return <ellipse cx={0} cy={52} rx={9} ry={11} fill="#6B2E35" />;
      case "uyku": return <path d="M-10 50 Q0 54 10 50" fill="none" stroke="#8A3B3F" strokeWidth={5} strokeLinecap="round" />;
      default: return agizAc > 0.1 ? <ellipse cx={0} cy={50} rx={13} ry={3 + agizAc * 9} fill="#6B2E35" /> : <path d="M-16 47 Q0 56 16 47" fill="none" stroke="#8A3B3F" strokeWidth={6} strokeLinecap="round" />;
    }
  };
  return (
    <g>
      {/* arka saç / yazma */}
      {tip === "sen" ? <path d="M-104 10 C-112 -70 -60 -118 0 -118 C60 -118 112 -70 104 10 C100 40 90 60 84 70 L-84 70 C-90 60 -100 40 -104 10 Z" fill={DV.sac} /> : null}
      {tip === "babaanne" ? <path d="M-118 0 C-120 -80 -66 -128 0 -128 C66 -128 120 -80 118 0 C116 60 106 110 96 140 L-96 140 C-106 110 -116 60 -118 0 Z" fill={DV.yazma} /> : null}
      {/* kulaklar */}
      {tip !== "babaanne" ? <><circle cx={-92} cy={14} r={16} fill={DV.tenGolge} /><circle cx={92} cy={14} r={16} fill={DV.tenGolge} /></> : null}
      {/* yüz */}
      <ellipse cx={0} cy={8} rx={90} ry={98} fill={DV.ten} />
      <ellipse cx={0} cy={60} rx={70} ry={40} fill={DV.tenGolge} opacity={0.25} />
      {/* ön saç */}
      {tip === "sen" ? <path d="M-92 -10 C-96 -80 -50 -108 4 -106 C58 -104 98 -76 92 -14 C74 -40 50 -58 18 -62 C6 -40 -30 -36 -50 -50 C-64 -36 -80 -24 -92 -10 Z" fill={DV.sac} /> : null}
      {tip === "doktor" ? <path d="M-90 -20 C-92 -84 -44 -106 4 -104 C56 -102 94 -78 90 -20 C76 -60 40 -72 0 -72 C-40 -72 -76 -60 -90 -20 Z" fill={DV.sacGri} /> : null}
      {tip === "babaanne" ? (
        <>
          <path d="M-96 -14 C-96 -86 -52 -114 0 -114 C52 -114 96 -86 96 -14 C70 -54 36 -66 0 -66 C-36 -66 -70 -54 -96 -14 Z" fill={DV.yazma} />
          {Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (0.12 + i * 0.095); return <circle key={i} cx={Math.cos(a) * -100} cy={-14 - Math.sin(a) * 58} r={5} fill={DV.yazmaDesen} opacity={0.8} />; })}
          <path d="M-60 -60 C-50 -66 -40 -66 -30 -60 M30 -60 C40 -66 50 -66 60 -60" stroke={DV.lavanta} strokeWidth={4} fill="none" opacity={0.8} />
        </>
      ) : null}
      {goz(-1)}{goz(1)}
      {/* burun, yanak */}
      <path d="M-6 26 Q0 34 6 26" fill="none" stroke={DV.tenGolge} strokeWidth={5} strokeLinecap="round" />
      <ellipse cx={-54} cy={34} rx={15} ry={9} fill={DV.yanak} opacity={ifade === "dehset" ? 0.15 : 0.45} />
      <ellipse cx={54} cy={34} rx={15} ry={9} fill={DV.yanak} opacity={ifade === "dehset" ? 0.15 : 0.45} />
      {agiz()}
      {/* babaanne: gülüş çizgileri + yuvarlak gözlük; doktor: köşeli gözlük */}
      {tip === "babaanne" ? (
        <g fill="none" stroke="#B7836A" strokeWidth={3} strokeLinecap="round" opacity={0.7}>
          <path d="M-70 4 l-8 -4 M-70 12 l-9 2 M70 4 l8 -4 M70 12 l9 2" />
          <circle cx={-36} cy={6} r={28} stroke="#8D6E63" strokeWidth={4} /><circle cx={36} cy={6} r={28} stroke="#8D6E63" strokeWidth={4} />
          <path d="M-8 6 L8 6" stroke="#8D6E63" strokeWidth={4} />
        </g>
      ) : null}
      {tip === "doktor" ? (
        <g fill="none" stroke={DV.lacivert} strokeWidth={4}><rect x={-62} y={-14} width={50} height={38} rx={8} /><rect x={12} y={-14} width={50} height={38} rx={8} /><path d="M-12 2 L12 2" /></g>
      ) : null}
      {/* korku teri */}
      {ifade === "dehset" || ifade === "korku" ? <path d={`M70 ${-30 + ((f * 0.6) % 30)} q6 10 0 16 q-6 -6 0 -16 Z`} fill="#BFE3F2" opacity={0.85} /> : null}
    </g>
  );
};

export type GovdeProps = { tip: Tip; kolSol?: number; kolSag?: number; f: number; nefes?: number };
/** Büst gövde (omuzlar + kollar). (0,0) = boyun; aşağı doğru ~260 px. Kol açısı derece (0 = aşağı). */
export const Govde: React.FC<GovdeProps> = ({ tip, kolSol = 8, kolSag = -8, f, nefes = 1 }) => {
  const renk = tip === "sen" ? DV.sen : tip === "babaanne" ? DV.babaanne : DV.doktor;
  const n = Math.sin(f * 0.08) * 3 * nefes;
  const kol = (taraf: number, aci: number) => (
    <g transform={`translate(${taraf * 120} ${40}) rotate(${aci})`}>
      <rect x={-26} y={-10} width={52} height={190} rx={26} fill={renk} />
      <circle cx={0} cy={186} r={26} fill={DV.ten} />
    </g>
  );
  return (
    <g transform={`translate(0 ${n})`}>
      {kol(-1, kolSol)}{kol(1, kolSag)}
      <path d="M-150 260 C-150 90 -110 20 0 20 C110 20 150 90 150 260 Z" fill={renk} />
      {tip === "sen" ? <path d="M-70 22 C-60 70 60 70 70 22" fill="none" stroke={DV.senKoyu} strokeWidth={14} strokeLinecap="round" /> : null}
      {tip === "sen" ? <><path d="M-20 60 L-24 120 M20 60 L24 120" stroke={DV.yazma} strokeWidth={6} strokeLinecap="round" /></> : null}
      {tip === "babaanne" ? <><path d="M-36 22 L0 110 L36 22 Z" fill="#F6C2A2" /><circle cx={-6} cy={150} r={7} fill={DV.hardal} /><circle cx={-6} cy={190} r={7} fill={DV.hardal} /></> : null}
      {tip === "doktor" ? (
        <><path d="M-40 22 L0 120 L40 22 Z" fill="#9FB7D9" /><path d="M-40 22 L-10 130 L-60 130 Z M40 22 L10 130 L60 130 Z" fill="#E3E7EF" />
          <path d="M-56 40 C-70 120 -10 150 0 120" fill="none" stroke={DV.lacivert} strokeWidth={6} /><circle cx={0} cy={124} r={10} fill="#9AA3B5" /></>
      ) : null}
      <rect x={-26} y={-6} width={52} height={34} fill={DV.tenGolge} />
    </g>
  );
};

/** Büst karakter: gövde + baş. (x,y) = boyun noktası. */
export const Kisi: React.FC<BasProps & { x: number; y: number; olcek?: number; kolSol?: number; kolSag?: number; egim?: number }> = ({ x, y, olcek = 1, kolSol, kolSag, egim = 0, ...bas }) => (
  <g transform={`translate(${x} ${y}) scale(${olcek}) rotate(${egim})`}>
    <Govde tip={bas.tip} kolSol={kolSol} kolSag={kolSag} f={bas.f} />
    <g transform="translate(0 -96)"><Bas {...bas} /></g>
  </g>
);

/** Karabasan: kaynayan duman bedeni, kor gözler. netlik 0 = biçimsiz gölge, 1 = net. dagil 0→1 dağılır. */
export const Karabasan: React.FC<{ x: number; y: number; olcek?: number; f: number; netlik?: number; goz?: number; dagil?: number; egim?: number; kollar?: number }> = ({
  x, y, olcek = 1, f, netlik = 1, goz = 1, dagil = 0, egim = 0, kollar = 1,
}) => {
  const op = 1 - dagil;
  const nefes = 1 + Math.sin(f * 0.12) * 0.03;
  const parca = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2, r = 60 + (i % 3) * 30;
    return { x: Math.cos(a) * r + dagil * Math.cos(a) * 420 + dagil * 260, y: Math.sin(a) * r * 1.2 - dagil * 300 - i * dagil * 8, r: 30 + (i % 4) * 10 };
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${olcek * nefes}) rotate(${egim})`}>
      <g filter="url(#dv-duman)" opacity={op * (0.55 + 0.45 * netlik)}>
        {/* gövde: kambur, başı önde */}
        <path d="M-170 160 C-200 40 -150 -90 -40 -120 C-10 -200 90 -210 120 -140 C170 -110 200 0 180 160 Z" fill={DV.karanlik} />
        <circle cx={40} cy={-150} r={95 * (0.7 + 0.3 * netlik)} fill={DV.karanlik} />
        {kollar > 0 ? (
          <g opacity={kollar}>
            <path d={`M-120 0 C-220 40 -260 140 -250 ${260 + Math.sin(f * 0.07) * 10} L-230 270 C-226 160 -190 90 -100 60 Z`} fill={DV.karanlik} />
            <path d={`M150 0 C250 40 290 140 280 ${260 + Math.cos(f * 0.07) * 10} L260 270 C256 160 220 90 130 60 Z`} fill={DV.karanlik} />
            {[-1, 1].map((t) => [0, 1, 2, 3].map((k) => (
              <path key={`${t}${k}`} d={`M${t > 0 ? 270 : -240} 262 l${t * (k * 12 - 18)} ${50 + k * 6}`} stroke={DV.karanlik} strokeWidth={12} strokeLinecap="round" />
            )))}
          </g>
        ) : null}
        {parca.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={p.r * (1 + dagil)} fill={DV.karanlik} opacity={dagil > 0 ? 1 - dagil : 0} />)}
      </g>
      {/* gözler */}
      {goz > 0.02 ? (
        <g opacity={goz * op}>
          <ellipse cx={0} cy={-160} rx={60} ry={40} fill="url(#dv-gozIsik)" opacity={0.6} filter="url(#dv-parilti)" />
          <ellipse cx={80} cy={-160} rx={60} ry={40} fill="url(#dv-gozIsik)" opacity={0.6} filter="url(#dv-parilti)" />
          <path d="M-22 -164 Q0 -184 22 -164 Q0 -152 -22 -164 Z" fill="#FFD3A0" />
          <path d="M58 -164 Q80 -184 102 -164 Q80 -152 58 -164 Z" fill="#FFD3A0" />
          <circle cx={0} cy={-166} r={5} fill={DV.goz} /><circle cx={80} cy={-166} r={5} fill={DV.goz} />
        </g>
      ) : null}
    </g>
  );
};
