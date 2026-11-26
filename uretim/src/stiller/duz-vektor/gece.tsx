// Gece mekânları ve yakın planlar (1080x1920 ekran koordinatı). Işık: lamba 0..1 (sıcak), ay 0..1 (soğuk mavi gece).
import React from "react";
import { DV } from "./motor";
import { Bas, Karabasan, Kisi, type Ifade } from "./karakterler";

/** Gece/lamba ışık katmanı: sahnenin en üstüne konur. */
export const Isik: React.FC<{ lamba: number; ay: number; lx: number; ly: number; r?: number }> = ({ lamba, ay, lx, ly, r = 900 }) => (
  <g pointerEvents="none">
    <rect width={1080} height={1920} fill="#26305E" opacity={Math.max(0, ay * 0.4 - lamba * 0.3)} style={{ mixBlendMode: "multiply" }} />
    <rect width={1080} height={1920} fill="#6A7BC5" opacity={ay * 0.16} style={{ mixBlendMode: "screen" }} />
    {lamba > 0 ? <circle cx={lx} cy={ly} r={r} fill="url(#dv-lambaIsik)" opacity={lamba * 0.75} style={{ mixBlendMode: "screen" }} /> : null}
  </g>
);

const Tahta: React.FC<{ renk?: string }> = ({ renk = DV.ahsap.orta }) => (
  <g>
    <rect width={1080} height={1920} fill={renk} />
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={i * 124} y={0} width={4} height={1920} fill={DV.ahsap.koyu} opacity={0.5} />)}
    {Array.from({ length: 22 }, (_, i) => <rect key={`k${i}`} x={(i % 9) * 124 + 4} y={(i * 337) % 1920} width={120} height={3} fill={DV.ahsap.koyu} opacity={0.35} />)}
  </g>
);

export type YatakUstProps = {
  f: number; lamba?: number; ay?: number; ifade?: Ifade; acik?: number; bak?: { x: number; y: number }; kolTitre?: number; parmak?: number;
  kb?: { gor: number; netlik?: number; goz?: number; dagil?: number; y?: number; olcek?: number }; basinc?: number; muska?: number; nefes?: number;
};
/** Yatak, tepeden görünüm: yüz kameraya bakar. Karabasan göğüste oturur. */
export const YatakUst: React.FC<YatakUstProps> = ({ f, lamba = 1, ay = 0, ifade = "uyku", acik, bak, kolTitre = 0, parmak = 0, kb, basinc = 0, muska = 0, nefes = 1 }) => {
  const n = Math.sin(f * 0.09) * 6 * nefes;
  const tit = kolTitre * Math.sin(f * 2.1) * 4;
  return (
    <g>
      <Tahta />
      <rect x={40} y={1520} width={1000} height={420} rx={30} fill="#8E3B33" />
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${120 + i * 140},1640 l40,50 l-40,50 l-40,-50 Z`} fill={DV.hardal} opacity={0.75} />)}
      {/* komodin + lamba */}
      <rect x={14} y={250} width={170} height={210} rx={14} fill={DV.ahsap.acik} />
      <circle cx={99} cy={350} r={62} fill={lamba > 0.5 ? DV.sicak.parilti : "#CFC6B8"} />
      <circle cx={99} cy={350} r={30} fill={lamba > 0.5 ? "#FFF6DA" : "#B8AE9F"} />
      {/* karyola */}
      <rect x={196} y={226} width={700} height={1400} rx={34} fill={DV.ahsap.koyu} />
      <rect x={196} y={226} width={700} height={70} rx={30} fill={DV.ahsap.orta} />
      <rect x={226} y={300} width={640} height={1300} rx={20} fill="#EDE6DA" />
      {/* yastık + saç */}
      <rect x={300} y={318} width={490} height={250} rx={90} fill={DV.yastik} />
      <path d="M402 360 C380 300 700 300 680 360 C720 420 700 520 640 540 L440 540 C380 520 360 420 402 360 Z" fill={DV.sac} />
      <g transform="translate(540 452) scale(1.12)"><Bas tip="sen" ifade={ifade} f={f} acik={acik} bak={bak} yatik tohum={3} /></g>
      {/* yorgan */}
      <g transform={`translate(0 ${n * 0.3})`}>
        <path d={`M228 ${596 + basinc * 30} C400 ${570 + n + basinc * 60} 680 ${570 + n + basinc * 60} 864 ${596 + basinc * 30} L864 1580 L228 1580 Z`} fill={DV.yorgan} />
        <rect x={228} y={592} width={636} height={46} rx={14} fill="#F3EEE6" />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 290 + (i % 4) * 170, y = 760 + Math.floor(i / 4) * 260;
          return <path key={i} d={`M${x},${y - 50} l50,50 l-50,50 l-50,-50 Z`} fill={DV.yorganDesen} opacity={0.85} />;
        })}
        <rect x={228} y={1500} width={636} height={80} fill="#B84E3B" />
      </g>
      {/* kollar (yorgan üstünde) */}
      {[-1, 1].map((t) => (
        <g key={t} transform={`rotate(${t * (6 + (t < 0 ? tit : 0))} ${540 + t * 190} 640)`}>
          <rect x={540 + t * 190 - 34} y={620} width={68} height={330} rx={34} fill={DV.sen} />
          <ellipse cx={540 + t * 190} cy={970} rx={36} ry={42} fill={DV.ten} />
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={540 + t * 190 - 30 + k * 18} y={985} width={14} height={k === (t < 0 ? 0 : 3) ? 44 - parmak * 22 : 40} rx={7} fill={DV.ten}
              transform={k === (t < 0 ? 0 : 3) && parmak > 0 ? `rotate(${t * parmak * -25} ${540 + t * 190 - 24 + k * 18} 990)` : undefined} />
          ))}
        </g>
      ))}
      {muska > 0 ? <path d="M640 330 l40 0 l-20 34 Z" fill={DV.mercan} opacity={muska} /> : null}
      {kb && kb.gor > 0 ? (
        <g opacity={kb.gor}>
          <Karabasan x={540} y={kb.y ?? 860} olcek={kb.olcek ?? 1.05} f={f} netlik={kb.netlik ?? 1} goz={kb.goz ?? 1} dagil={kb.dagil ?? 0} kollar={0.9} />
        </g>
      ) : null}
      <Isik lamba={lamba} ay={ay} lx={99} ly={350} r={1100} />
      {ay > 0 ? <path d="M1080 700 L700 1000 L760 1300 L1080 1000 Z" fill={DV.gece.ay} opacity={ay * 0.12} /> : null}
    </g>
  );
};

/** Oda, önden geniş: dolap+ayna (sol), pencere+ay (sağ), yatak (ön). */
export const OdaGenis: React.FC<{
  f: number; lamba?: number; ay?: number; ayna?: "bos" | "yatak" | "karabasan"; yatakDolu?: boolean; ifade?: Ifade;
  ayakta?: { babaanne?: number; sen?: number }; aynaParla?: number; gun?: number;
}> = ({ f, lamba = 1, ay = 0, ayna = "bos", yatakDolu = false, ifade = "uyku", ayakta, aynaParla = 0, gun = 0 }) => (
  <g>
    <rect y={-500} width={1080} height={2920} fill={DV.sicak.duvar} />
    <rect y={-500} width={1080} height={620} fill="#E6C796" />
    <rect y={1320} width={1080} height={1100} fill={DV.ahsap.orta} />
    {/* pencere */}
    <rect x={690} y={330} width={300} height={420} rx={14} fill={DV.ahsap.koyu} />
    <rect x={710} y={350} width={260} height={380} fill={DV.gece.gok} />
    {gun > 0 ? <rect x={710} y={350} width={260} height={380} fill={DV.gun.gok} opacity={gun} /> : null}
    <circle cx={880} cy={440} r={46} fill={DV.gece.ay} /><circle cx={900} cy={430} r={42} fill={DV.gece.gok} />
    {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={725 + ((i * 97) % 240)} cy={370 + ((i * 53) % 340)} r={2.5} fill="#fff" opacity={0.6 + 0.4 * Math.sin(f * 0.1 + i)} />)}
    <rect x={837} y={350} width={8} height={380} fill={DV.ahsap.koyu} />
    <path d={`M700 340 C760 ${500 + Math.sin(f * 0.04) * 10} 720 640 680 760 L660 760 L660 340 Z`} fill={DV.lavanta} />
    {/* duvar saati */}
    <circle cx={540} cy={300} r={70} fill={DV.ahsap.acik} /><circle cx={540} cy={300} r={56} fill="#FBF6EC" />
    <path d={`M540 300 L540 258 M540 300 L${540 + Math.cos(f * 0.02) * 34} ${300 + Math.sin(f * 0.02) * 34}`} stroke={DV.lacivert} strokeWidth={6} strokeLinecap="round" />
    {/* dolap + ayna */}
    <rect x={50} y={260} width={400} height={1080} rx={16} fill={DV.ahsap.orta} />
    <rect x={70} y={280} width={360} height={60} fill={DV.ahsap.koyu} />
    <rect x={100} y={370} width={300} height={880} rx={140} fill="#9FB2D6" />
    <clipPath id="ayna-k"><rect x={100} y={370} width={300} height={880} rx={140} /></clipPath>
    <g clipPath="url(#ayna-k)">
      <rect x={100} y={370} width={300} height={880} fill={DV.gece.duvarAcik} opacity={0.6} />
      {ayna !== "bos" ? (
        <g transform="translate(250 900) scale(-0.42 0.42)">
          <rect x={-330} y={-260} width={660} height={700} rx={30} fill={DV.ahsap.koyu} />
          <rect x={-300} y={-240} width={600} height={240} rx={60} fill={DV.yastik} />
          <g transform="translate(0 -120)"><Bas tip="sen" ifade={ifade} f={f} yatik /></g>
          <rect x={-300} y={-10} width={600} height={430} rx={20} fill={DV.yorgan} />
          {ayna === "karabasan" ? <Karabasan x={0} y={160} olcek={0.95} f={f} kollar={0.6} /> : null}
        </g>
      ) : null}
      <path d="M120 420 L240 380 L160 900 L110 960 Z" fill="#fff" opacity={0.12 + aynaParla * 0.25} />
    </g>
    <circle cx={430} cy={820} r={10} fill={DV.hardal} />
    {/* yatak (ayak ucundan) */}
    <rect x={480} y={1060} width={560} height={420} rx={40} fill={DV.ahsap.koyu} />
    <rect x={510} y={1040} width={500} height={150} rx={60} fill={DV.yastik} />
    {yatakDolu ? <g transform="translate(760 1090) scale(0.6)"><Bas tip="sen" ifade={ifade} f={f} tohum={5} /></g> : null}
    <path d={`M500 1170 C620 ${yatakDolu ? 1120 : 1150} 900 ${yatakDolu ? 1120 : 1150} 1020 1170 L1020 1460 L500 1460 Z`} fill={DV.yorgan} />
    {Array.from({ length: 4 }, (_, i) => <path key={i} d={`M${580 + i * 120},1260 l36,36 l-36,36 l-36,-36 Z`} fill={DV.yorganDesen} />)}
    <rect x={470} y={1420} width={590} height={140} rx={20} fill={DV.ahsap.orta} />
    {/* komodin + lamba */}
    <rect x={40} y={1340} width={230} height={260} rx={12} fill={DV.ahsap.acik} />
    <path d="M90 1340 L130 1220 L190 1220 L230 1340 Z" fill={lamba > 0.5 ? DV.sicak.lamba : "#C9BCA6"} />
    <rect x={150} y={1340} width={20} height={0} />
    {ayakta?.babaanne ? <g opacity={ayakta.babaanne}><Kisi tip="babaanne" x={790} y={1180} olcek={0.9} f={f} ifade="gulumse" kolSol={60} konus={0.5} tohum={7} /></g> : null}
    {ayakta?.sen ? <g opacity={ayakta.sen}><Kisi tip="sen" x={430} y={1250} olcek={0.9} f={f} ifade="normal" bak={{ x: -1, y: -0.2 }} tohum={2} /></g> : null}
    {gun > 0 ? <rect width={1080} height={1920} fill={DV.gun.gunes} opacity={gun * 0.25} style={{ mixBlendMode: "screen" }} /> : null}
    <Isik lamba={lamba} ay={ay} lx={160} ly={1260} r={1000} />
  </g>
);

/** Ayna yakın plan: aynada yatak ve (isteğe bağlı) göğüste oturan karabasan. */
export const AynaYakin: React.FC<{ f: number; kb?: number; kbGoz?: number; kbBak?: number; ay?: number }> = ({ f, kb = 0, kbGoz = 0, kbBak = 0, ay = 1 }) => (
  <g>
    <rect width={1080} height={1920} fill={DV.ahsap.orta} />
    <rect x={60} y={120} width={960} height={1680} rx={420} fill={DV.ahsap.koyu} />
    <clipPath id="ayna-y"><rect x={110} y={170} width={860} height={1580} rx={390} /></clipPath>
    <g clipPath="url(#ayna-y)">
      <rect x={110} y={170} width={860} height={1580} fill="#2E3A6A" />
      <g transform="translate(540 1000) scale(-1.05 1.05)">
        <rect x={-380} y={-560} width={760} height={1280} rx={40} fill={DV.ahsap.koyu} />
        <rect x={-340} y={-520} width={680} height={260} rx={90} fill={DV.yastik} />
        <g transform="translate(0 -390) scale(1)"><Bas tip="sen" ifade="dehset" f={f} yatik tohum={8} /></g>
        <rect x={-350} y={-250} width={700} height={900} rx={30} fill={DV.yorgan} />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${-220 + (i % 3) * 220},${-60 + Math.floor(i / 3) * 280} l50,50 l-50,50 l-50,-50 Z`} fill={DV.yorganDesen} />)}
        {kb > 0 ? <g opacity={kb}><Karabasan x={0} y={-40} olcek={1.3} f={f} goz={kbGoz} egim={kbBak * -12} /></g> : null}
      </g>
      <rect x={110} y={170} width={860} height={1580} fill="#5C6FB8" opacity={0.18} style={{ mixBlendMode: "screen" }} />
      <path d="M180 400 L420 260 L260 1300 L170 1420 Z" fill="#fff" opacity={0.08} />
      <path d="M760 1500 L930 1100 L950 1300 L840 1640 Z" fill="#fff" opacity={0.06} />
    </g>
    <Isik lamba={0} ay={ay} lx={0} ly={0} />
  </g>
);

/** Göz yakın plan (tek göz, ekranı doldurur). */
export const GozYakin: React.FC<{ f: number; acik: number; bak?: { x: number; y: number }; ifade?: Ifade; ay?: number; lamba?: number }> = ({ f, acik, bak, ifade = "korku", ay = 0, lamba = 1 }) => (
  <g>
    <rect width={1080} height={1920} fill={DV.ten} />
    {/* göz ekranın üst yarısında (y≈700): altyazı bandı (1040-1186) gözün üstüne binmez */}
    <g transform="translate(540 700) scale(9) translate(36 -6)"><Bas tip="sen" ifade={ifade} f={f} acik={acik} bak={bak} tohum={4} /></g>
    <Isik lamba={lamba} ay={ay} lx={200} ly={300} r={1300} />
  </g>
);

/** El yakın plan: yorgan üstünde el; serçe parmak `parmak` 0→1 kıpırdar, `titre` gerilim. */
export const ElYakin: React.FC<{ f: number; parmak?: number; titre?: number; ay?: number; lamba?: number; vurgu?: number }> = ({ f, parmak = 0, titre = 0, ay = 0, lamba = 1, vurgu = 0 }) => {
  const t = titre * Math.sin(f * 2.3) * 3;
  return (
    <g>
      <rect width={1080} height={1920} fill={DV.yorgan} />
      {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${(i % 3) * 420 + 120},${Math.floor(i / 3) * 700 + 260} l110,110 l-110,110 l-110,-110 Z`} fill={DV.yorganDesen} opacity={0.8} />)}
      <g transform={`translate(${540 + t} 1000)`}>
        <rect x={-150} y={-900} width={300} height={700} rx={150} fill={DV.sen} />
        <ellipse cx={0} cy={-120} rx={170} ry={190} fill={DV.ten} />
        {[-1, -0.33, 0.33, 1].map((k, i) => {
          const serce = i === 3;
          const aci = serce ? -parmak * 28 + Math.sin(f * 3) * titre * 3 : 0;
          return (
            <g key={i} transform={`rotate(${aci} ${k * 110} 20)`}>
              <rect x={k * 110 - 34} y={0} width={68} height={serce ? 200 : 250 - Math.abs(k) * 30} rx={34} fill={DV.ten} />
              <rect x={k * 110 - 22} y={serce ? 160 : 200 - Math.abs(k) * 30} width={44} height={30} rx={12} fill="#F7DCCB" />
            </g>
          );
        })}
        <rect x={-260} y={-140} width={90} height={190} rx={45} fill={DV.ten} transform="rotate(-38 -215 -45)" />
        {vurgu > 0 ? <circle cx={110} cy={130} r={150} fill="none" stroke={DV.hardal} strokeWidth={10} opacity={vurgu} strokeDasharray="30 20" /> : null}
      </g>
      <Isik lamba={lamba} ay={ay} lx={100} ly={200} r={1400} />
    </g>
  );
};

/** Yastık yakın: yastık kalkar, altında muska; isteğe bağlı karanlık parmak çekilir. */
export const YastikMuska: React.FC<{ f: number; kalk: number; muska: number; parla?: number; parmak?: number; ay?: number; lamba?: number }> = ({ f, kalk, muska, parla = 0, parmak = 0, ay = 0, lamba = 1 }) => (
  <g>
    <rect width={1080} height={1920} fill="#EDE6DA" />
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={0} y={i * 200 + 90} width={1080} height={6} fill="#D8CFC0" />)}
    {muska > 0 ? (
      <g transform="translate(540 1050)" opacity={muska}>
        {parla > 0 ? <circle r={300} fill="url(#dv-lambaIsik)" opacity={parla} /> : null}
        <path d="M-30 -200 C-60 -260 60 -260 30 -200" fill="none" stroke="#7A5A3A" strokeWidth={10} />
        <path d="M-170 -180 L170 -180 L0 160 Z" fill={DV.mercan} />
        <path d="M-130 -150 L130 -150 L0 110 Z" fill="none" stroke={DV.hardal} strokeWidth={8} strokeDasharray="22 14" />
        <circle cx={0} cy={-80} r={20} fill={DV.hardal} />
      </g>
    ) : null}
    {parmak > 0 ? (
      <g filter="url(#dv-duman)" opacity={Math.min(1, parmak * 2)}>
        <path d={`M1080 ${1180} C${1000 - parmak * 260} 1170 ${760 - parmak * 120} 1150 ${700 + (1 - parmak) * 420} 1120 L${700 + (1 - parmak) * 420} 1150 C${820} 1190 1000 1210 1080 1220 Z`} fill={DV.karanlik} />
      </g>
    ) : null}
    <g transform={`translate(0 ${-kalk * 900}) rotate(${-kalk * 8} 540 900)`}>
      <rect x={60} y={300} width={960} height={1100 - kalk * 200} rx={200} fill={DV.yastik} />
      <path d="M200 500 C400 560 680 560 880 500" stroke="#DED6C8" strokeWidth={10} fill="none" />
      <rect x={60} y={1340 - kalk * 200} width={960} height={60} rx={30} fill="#000" opacity={0.08 + kalk * 0.15} />
    </g>
    <Isik lamba={lamba} ay={ay} lx={100} ly={100} r={1500} />
  </g>
);

/** Duvar saati yakın: sarkaç sallanır; gece ise ay ışığı. akrep/yelkovan `saat` (0..12). */
export const SaatYakin: React.FC<{ f: number; saat?: number; ay?: number; lamba?: number }> = ({ f, saat = 2, ay = 1, lamba = 0 }) => {
  const s = Math.sin(f * (Math.PI / 30)) * 18;
  return (
    <g>
      <rect width={1080} height={1920} fill={DV.sicak.duvar} />
      <rect x={290} y={260} width={500} height={1400} rx={60} fill={DV.ahsap.orta} />
      <circle cx={540} cy={620} r={220} fill={DV.ahsap.koyu} /><circle cx={540} cy={620} r={190} fill="#FBF6EC" />
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <circle key={i} cx={540 + Math.sin(a) * 160} cy={620 - Math.cos(a) * 160} r={i % 3 ? 6 : 11} fill={DV.lacivert} />; })}
      <path d={`M540 620 L${540 + Math.sin((saat / 12) * Math.PI * 2) * 90} ${620 - Math.cos((saat / 12) * Math.PI * 2) * 90}`} stroke={DV.lacivert} strokeWidth={14} strokeLinecap="round" />
      <path d={`M540 620 L${540 + Math.sin((f / 900) * Math.PI * 2) * 140} ${620 - Math.cos((f / 900) * Math.PI * 2) * 140}`} stroke={DV.lacivert} strokeWidth={8} strokeLinecap="round" />
      <circle cx={540} cy={620} r={14} fill={DV.mercan} />
      <rect x={350} y={880} width={380} height={700} rx={30} fill="#3B2A22" />
      <g transform={`rotate(${s} 540 900)`}><rect x={532} y={900} width={16} height={480} fill={DV.hardal} /><circle cx={540} cy={1400} r={70} fill={DV.hardal} /></g>
      <Isik lamba={lamba} ay={ay} lx={540} ly={620} />
    </g>
  );
};

/** Işık düğmesi yakın: parmak düğmeye basar; acik 1 → kapalı 0. */
export const DugmeYakin: React.FC<{ f: number; durum: number; bas: number }> = ({ f, durum, bas }) => (
  <g>
    <rect width={1080} height={1920} fill={DV.sicak.duvar} />
    {/* duvar kâğıdı deseni (boş alan kalmasın) */}
    {Array.from({ length: 48 }, (_, i) => {
      const x = (i % 6) * 200 + ((Math.floor(i / 6) % 2) * 100) + 40, y = Math.floor(i / 6) * 250 + 60;
      return <path key={i} d={`M${x} ${y} C${x + 18} ${y + 20} ${x + 18} ${y + 44} ${x} ${y + 60} C${x - 18} ${y + 44} ${x - 18} ${y + 20} ${x} ${y} Z`} fill="#E2C597" />;
    })}
    <rect x={0} y={1500} width={1080} height={420} fill="#E6C796" />
    <rect x={0} y={1490} width={1080} height={24} fill={DV.ahsap.orta} />
    <rect x={340} y={640} width={400} height={560} rx={50} fill="#F7F1E6" />
    <rect x={480} y={760} width={120} height={320} rx={40} fill="#E2D9C8" />
    <rect x={490} y={durum > 0.5 ? 770 : 920} width={100} height={150} rx={30} fill="#CFC3AE" />
    <g transform={`translate(${760 - bas * 140} ${980 - bas * 60})`}>
      <rect x={0} y={-40} width={420} height={110} rx={55} fill={DV.ten} />
      <rect x={300} y={-60} width={400} height={180} rx={70} fill={DV.sen} />
    </g>
    <Isik lamba={durum} ay={1 - durum} lx={300} ly={300} r={1500} />
  </g>
);

/** Koridor (tek noktalı perspektif): sonunda ay ışıklı pencere; sağda babaannenin aralık kapısı. */
export const Koridor: React.FC<{ f: number; aralik?: number; isik?: number; saatSal?: number; ay?: number }> = ({ f, aralik = 0, isik = 0, ay = 1 }) => {
  const VX = 540, VY = 860;
  return (
    <g>
      <rect width={1080} height={1920} fill={DV.sicak.duvar} />
      <path d={`M0 0 L1080 0 L${VX + 170} ${VY - 260} L${VX - 170} ${VY - 260} Z`} fill="#E6C796" />
      <path d={`M0 1920 L1080 1920 L${VX + 170} ${VY + 200} L${VX - 170} ${VY + 200} Z`} fill={DV.ahsap.orta} />
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${i * 180} 1920 L${VX - 170 + i * 57} ${VY + 200}`} stroke={DV.ahsap.koyu} strokeWidth={4} opacity={0.5} />)}
      <path d={`M0 0 L${VX - 170} ${VY - 260} L${VX - 170} ${VY + 200} L0 1920 Z`} fill="#E9CFA2" />
      <path d={`M1080 0 L${VX + 170} ${VY - 260} L${VX + 170} ${VY + 200} L1080 1920 Z`} fill="#E2C597" />
      {/* uçtaki pencere */}
      <rect x={VX - 170} y={VY - 260} width={340} height={460} fill="#E9CFA2" />
      <rect x={VX - 90} y={VY - 190} width={180} height={260} rx={8} fill={DV.gece.gok} />
      <circle cx={VX + 30} cy={VY - 130} r={30} fill={DV.gece.ay} />
      {/* sol duvarda kapı ve saat */}
      <path d={`M60 520 L300 700 L300 1340 L60 1600 Z`} fill={DV.ahsap.orta} />
      <circle cx={360} cy={560} r={46} fill={DV.ahsap.acik} /><circle cx={360} cy={560} r={36} fill="#FBF6EC" />
      <path d={`M360 560 L360 534 M360 560 L${360 + Math.sin(f * 0.1) * 6} 590`} stroke={DV.lacivert} strokeWidth={4} />
      {/* sağ duvarda babaannenin kapısı */}
      <path d={`M1020 500 L790 700 L790 1330 L1020 1580 Z`} fill="#3B2A22" />
      {isik > 0 ? <path d={`M790 1330 L1020 1580 L${700 - isik * 300} 1920 L${560 - isik * 160} 1920 Z`} fill={DV.sicak.parilti} opacity={isik * 0.5} /> : null}
      {aralik > 0 ? <path d={`M1020 500 L790 700 L790 1330 L1020 1580 Z`} fill={DV.sicak.lamba} opacity={isik * 0.9} /> : null}
      <path d={`M1020 500 L${1020 - 230 * (1 - aralik * 0.25)} 700 L${1020 - 230 * (1 - aralik * 0.25)} 1330 L1020 1580 Z`} fill={DV.ahsap.orta} />
      <circle cx={1020 - 200 * (1 - aralik * 0.25)} cy={1020} r={12} fill={DV.hardal} />
      <Isik lamba={0} ay={ay} lx={0} ly={0} />
      {isik > 0 ? <circle cx={900} cy={1100} r={700} fill="url(#dv-lambaIsik)" opacity={isik * 0.45} style={{ mixBlendMode: "screen" }} /> : null}
    </g>
  );
};

/** Çıplak ayaklar, tahtada (tepeden). adim 0→1 bir adım. */
export const Ayaklar: React.FC<{ f: number; adim: number; geri?: boolean; ay?: number }> = ({ f, adim, geri = false, ay = 1 }) => {
  const ayak = (x: number, y: number, kalk: number) => (
    <g transform={`translate(${x} ${y - kalk * 120}) scale(${1 + kalk * 0.08})`}>
      <ellipse cx={0} cy={0} rx={95} ry={210} fill={DV.ten} />
      {[-60, -28, 4, 34, 60].map((dx, i) => <ellipse key={i} cx={dx} cy={-200 + Math.abs(dx) * 0.6} rx={i === 0 ? 26 : 20} ry={i === 0 ? 30 : 24} fill={DV.ten} />)}
      <rect x={-90} y={150} width={180} height={300} rx={80} fill="#8FA3C9" />
    </g>
  );
  const y = geri ? adim * 120 : -adim * 120;
  return (
    <g>
      <Tahta />
      {ayak(380, 1050 + y, Math.sin(adim * Math.PI))}
      {ayak(700, 1150, 0)}
      <Isik lamba={0} ay={ay} lx={0} ly={0} />
    </g>
  );
};

/** Babaannenin odası: yatakta uyuyan babaanne, gece lambası, duvarda gölge. golge 0 = yatan gölge, 1 = ayakta. */
export const BabaanneOda: React.FC<{ f: number; golge?: number; kol?: number; bas?: number; goz?: number }> = ({ f, golge = 0, kol = 0, bas = 0, goz = 0 }) => {
  const n = Math.sin(f * 0.07) * 5;
  const h = 300 + golge * 820;
  return (
    <g>
      <rect y={-500} width={1080} height={2920} fill={DV.sicak.duvar} />
      <rect y={1380} width={1080} height={1040} fill={DV.ahsap.orta} />
      {/* duvardaki gölge */}
      <g filter="url(#dv-bulanik)" opacity={0.78}>
        <ellipse cx={540} cy={1350} rx={420 - golge * 300} ry={60 + golge * 10} fill="#3A2D3E" />
        {golge > 0.02 ? (
          <g transform={`translate(600 1340)`}>
            <path d={`M-70 0 L-60 ${-h + 140} C-80 ${-h + 60} -40 ${-h} 0 ${-h} C40 ${-h} 80 ${-h + 60} 60 ${-h + 140} L70 0 Z`} fill="#3A2D3E" opacity={Math.min(1, golge * 1.5)} />
            <g transform={`translate(0 ${-h + 70}) rotate(${bas * 25})`}><ellipse cx={0} cy={0} rx={75} ry={90} fill="#3A2D3E" /></g>
            <path d={`M-60 ${-h + 200} C-140 ${-h + 400} -160 ${-200} -150 ${-20 + kol * 30} M60 ${-h + 200} C140 ${-h + 400} 160 -200 150 ${-20 + kol * 30}`} stroke="#3A2D3E" strokeWidth={26} fill="none" strokeLinecap="round" opacity={Math.min(1, golge * 1.5)} />
          </g>
        ) : null}
      </g>
      {goz > 0 ? (
        <g opacity={goz} transform={`translate(${600 + bas * 20} ${1340 - h + 70})`}>
          <ellipse cx={-26} cy={0} rx={40} ry={26} fill="url(#dv-gozIsik)" filter="url(#dv-parilti)" />
          <ellipse cx={26} cy={0} rx={40} ry={26} fill="url(#dv-gozIsik)" filter="url(#dv-parilti)" />
          <circle cx={-26} cy={0} r={7} fill="#FFD3A0" /><circle cx={26} cy={0} r={7} fill="#FFD3A0" />
        </g>
      ) : null}
      {/* gece lambası */}
      <rect x={60} y={1260} width={200} height={300} rx={12} fill={DV.ahsap.acik} />
      <path d="M100 1260 L130 1140 L190 1140 L220 1260 Z" fill={DV.sicak.lamba} />
      {/* yatak ve babaanne */}
      <rect x={300} y={1400} width={760} height={380} rx={30} fill={DV.ahsap.koyu} />
      <rect x={330} y={1350} width={260} height={130} rx={60} fill={DV.yastik} />
      <g transform="translate(460 1400) scale(0.75) rotate(-8)"><Bas tip="babaanne" ifade="uyku" f={f} tohum={7} /></g>
      <path d={`M520 ${1440 + n} C700 ${1380 + n} 950 ${1400 + n} 1040 1450 L1040 1760 L420 1760 C420 1600 460 1500 520 ${1440 + n} Z`} fill={DV.babaanne} />
      {Array.from({ length: 4 }, (_, i) => <circle key={i} cx={620 + i * 110} cy={1560 + (i % 2) * 60} r={22} fill={DV.lavanta} />)}
      <circle cx={160} cy={1200} r={760} fill="url(#dv-lambaIsik)" opacity={0.55} style={{ mixBlendMode: "screen" }} />
      <rect width={1080} height={1920} fill="#26305E" opacity={0.18} style={{ mixBlendMode: "multiply" }} />
    </g>
  );
};

/** Çekmece yakın: muska konur, çekmece kapanır (kapan 0→1). */
export const Cekmece: React.FC<{ f: number; kapan: number; lamba?: number }> = ({ f, kapan, lamba = 1 }) => (
  <g>
    <rect y={-500} width={1080} height={2920} fill={DV.sicak.duvar} />
    <rect y={1500} width={1080} height={920} fill={DV.ahsap.orta} />
    {/* üstte: babaannenin gençlik fotoğrafı (çerçeveli) ve küçük vazo */}
    <rect x={150} y={90} width={300} height={380} rx={14} fill={DV.ahsap.koyu} />
    <rect x={172} y={112} width={256} height={336} fill="#E9D8B4" />
    <g transform="translate(300 260) scale(0.62)"><Bas tip="babaanne" ifade="gulumse" f={40} tohum={12} /></g>
    <rect x={172} y={112} width={256} height={336} fill="#B99A6B" opacity={0.3} style={{ mixBlendMode: "multiply" }} />
    <path d="M720 470 C680 380 700 300 740 260 L800 260 C840 300 860 380 820 470 Z" fill={DV.lavanta} />
    {[0, 1, 2].map((i) => <circle key={i} cx={740 + i * 30} cy={200 - (i % 2) * 30} r={26} fill={[DV.mercan, DV.hardal, DV.mercan][i]} />)}
    <rect x={60} y={500} width={960} height={1000} rx={30} fill={DV.ahsap.orta} />
    {/* açıkken çekmecenin içi ön yüzün üstünde görünür; kapandıkça (kapan→1) iç kısım kaybolur */}
    {kapan < 1 ? (
      <g>
        <clipPath id="cekmece-ic"><rect x={120} y={1000 - (1 - kapan) * 330} width={840} height={(1 - kapan) * 330} /></clipPath>
        <rect x={120} y={1000 - (1 - kapan) * 330} width={840} height={(1 - kapan) * 330} fill="#2A1C15" />
        <g clipPath="url(#cekmece-ic)">
          <g transform={`translate(540 ${1000 - (1 - kapan) * 170}) rotate(12)`}><path d="M-110 -90 L110 -90 L0 120 Z" fill={DV.mercan} /><path d="M-80 -70 L80 -70 L0 90 Z" fill="none" stroke={DV.hardal} strokeWidth={6} strokeDasharray="16 10" /></g>
        </g>
      </g>
    ) : null}
    <rect x={120} y={1000} width={840} height={420} rx={20} fill={DV.ahsap.koyu} />
    <rect x={150} y={1030} width={780} height={360} rx={14} fill={DV.ahsap.orta} />
    <rect x={470} y={1180} width={140} height={34} rx={17} fill={DV.hardal} />
    <Isik lamba={lamba} ay={1 - lamba} lx={540} ly={300} r={1400} />
  </g>
);

/** Kapı kolu yakın: kol kendi kendine yavaşça döner (don 0→1). */
export const KapiKolu: React.FC<{ f: number; don: number; golge?: number }> = ({ f, don, golge = 0 }) => (
  <g>
    <rect width={1080} height={1920} fill={DV.ahsap.acik} />
    {Array.from({ length: 5 }, (_, i) => <rect key={i} x={i * 230 + 20} y={0} width={6} height={1920} fill={DV.ahsap.koyu} opacity={0.4} />)}
    <rect x={380} y={640} width={320} height={640} rx={60} fill="#C9A24A" />
    <circle cx={540} cy={900} r={70} fill="#E2BE63" />
    <g transform={`rotate(${don * 38} 540 900)`}><rect x={540} y={860} width={380} height={80} rx={40} fill="#E2BE63" /></g>
    <rect x={505} y={1050} width={70} height={130} rx={30} fill="#2A1C15" />
    <path d={`M0 1920 L1080 1920 L1080 ${1840 - don * 40} L0 ${1840 - don * 40} Z`} fill={DV.sicak.lamba} opacity={0.35 + don * 0.2} />
    {golge > 0 ? <rect x={-300 + golge * 1500} y={1820} width={260} height={100} fill="#0B0C1A" opacity={0.85} filter="url(#dv-bulanik)" /> : null}
    <Isik lamba={0} ay={1} lx={0} ly={0} />
  </g>
);
