// Gündüz/dış mekânlar ve bilgi panoları (1080x1920 ekran koordinatı).
import React from "react";
import { DV } from "./motor";
import { Bas, Karabasan, Kisi, type Ifade } from "./karakterler";

/** Köy, gün batımı: tepeler (3 katman paralaks), ışıklı pencereli evler, yol, dolmuş, babaannenin kapısı. */
export const KoyDis: React.FC<{ f: number; dolmusX: number; kapiAcik?: number; babaanne?: number; sen?: number; senX?: number; px?: number }> = ({
  f, dolmusX, kapiAcik = 0, babaanne = 0, sen = 0, senX = 300, px = 0,
}) => (
  <g>
    <defs>
      <linearGradient id="koy-gok" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5B5FA8" /><stop offset="45%" stopColor="#F08A6C" /><stop offset="80%" stopColor="#FFD58A" /></linearGradient>
    </defs>
    <rect width={1080} height={1920} fill="url(#koy-gok)" />
    <circle cx={760 + px * 0.1} cy={820} r={120} fill="#FFE7A8" />
    <g transform={`translate(${px * 0.2} 0)`}><path d="M-200 900 C100 760 300 820 520 880 C760 760 1000 800 1300 900 L1300 1920 L-200 1920 Z" fill="#B76A8A" /></g>
    <g transform={`translate(${px * 0.45} 0)`}><path d="M-200 1000 C150 900 400 960 640 1010 C860 930 1080 960 1300 1020 L1300 1920 L-200 1920 Z" fill="#7E4F7E" /></g>
    {/* evler */}
    <g transform={`translate(${px * 0.7} 0)`}>
      {[[40, 1000, 200], [260, 1030, 170], [820, 1010, 190]].map(([x, y, w], i) => (
        <g key={i}><rect x={x} y={y} width={w} height={150} fill="#5A3E62" /><path d={`M${x - 20} ${y} L${x + w / 2} ${y - 70} L${x + w + 20} ${y} Z`} fill="#43304F" />
          <rect x={x + 30} y={y + 40} width={40} height={46} fill={DV.sicak.lamba} opacity={0.6 + 0.4 * Math.sin(f * 0.05 + i)} /></g>
      ))}
    </g>
    {/* babaannenin evi (ön) */}
    <g transform={`translate(${px} 0)`}>
      <rect x={480} y={980} width={520} height={480} fill="#F3D9AE" />
      <path d="M440 990 L740 800 L1040 990 Z" fill="#B5553F" />
      <rect x={540} y={1060} width={110} height={110} fill={DV.sicak.lamba} /><rect x={590} y={1060} width={8} height={110} fill={DV.ahsap.koyu} />
      <rect x={760} y={1180} width={170} height={280} fill="#3B2A22" />
      <rect x={760} y={1180} width={170 * (1 - kapiAcik * 0.85)} height={280} fill={DV.ahsap.orta} />
      {kapiAcik > 0 ? <rect x={760 + 170 * (1 - kapiAcik * 0.85)} y={1180} width={170 * kapiAcik * 0.85} height={280} fill={DV.sicak.parilti} opacity={0.8} /> : null}
      {babaanne > 0 ? <g opacity={babaanne}><Kisi tip="babaanne" x={850} y={1330} olcek={0.62} f={f} ifade="gulumse" kolSag={-150 + Math.sin(f * 0.4) * 20} /></g> : null}
    </g>
    {/* yol ve dolmuş */}
    <path d="M-100 1460 L1180 1460 L1180 1920 L-100 1920 Z" fill="#4E3A55" />
    <path d={`M-100 1680 L1180 1680`} stroke="#F4BE4F" strokeWidth={10} strokeDasharray="70 60" strokeDashoffset={-px} opacity={0.6} />
    <g transform={`translate(${dolmusX} 1430)`}>
      <rect x={0} y={0} width={520} height={240} rx={40} fill="#F4F1EA" />
      <rect x={0} y={150} width={520} height={40} fill={DV.mercan} />
      {[30, 150, 270, 390].map((x) => <rect key={x} x={x} y={30} width={100} height={90} rx={14} fill="#9FB2D6" />)}
      <circle cx={110} cy={250} r={46} fill="#2A2233" /><circle cx={410} cy={250} r={46} fill="#2A2233" />
      <circle cx={110} cy={250} r={18} fill="#9AA3B5" /><circle cx={410} cy={250} r={18} fill="#9AA3B5" />
    </g>
    {sen > 0 ? (
      <g opacity={sen}>
        <Kisi tip="sen" x={senX} y={1560} olcek={0.78} f={f} ifade="normal" bak={{ x: 1, y: -0.3 }} />
        <rect x={senX - 150} y={1540} width={50} height={160} rx={20} fill={DV.hardal} />
      </g>
    ) : null}
  </g>
);

/** Mutfak (gündüz): pencere, raf, masa; babaanne ve sen; çay, çorba, sandık. */
export const Mutfak: React.FC<{
  f: number; babaanneIfade?: Ifade; senIfade?: Ifade; babaanneKonus?: number; corba?: number; cay?: number; sarilma?: number; muska?: number; bardakKoy?: number; bakis?: number;
}> = ({ f, babaanneIfade = "gulumse", senIfade = "normal", babaanneKonus = 0, corba = 0, cay = 0, sarilma = 0, muska = 0, bardakKoy = 0, bakis = 0 }) => (
  <g>
    <rect y={-500} width={1080} height={2920} fill={DV.gun.duvar} />
    {Array.from({ length: 6 }, (_, i) => Array.from({ length: 4 }, (_, j) => <rect key={`${i}-${j}`} x={i * 180 + 10} y={1000 + j * 90} width={170} height={80} fill="#EFDDBE" />))}
    <rect x={620} y={260} width={380} height={460} rx={16} fill={DV.ahsap.orta} />
    <rect x={640} y={280} width={340} height={420} fill={DV.gun.gok} />
    <circle cx={900} cy={360} r={50} fill={DV.gun.gunes} />
    <path d="M640 600 C720 560 800 600 880 560 C940 540 980 570 980 600 L980 700 L640 700 Z" fill="#9CCB8E" />
    <path d="M640 280 L740 280 C720 420 700 560 640 700 Z" fill={DV.mercan} opacity={0.85} />
    <rect x={80} y={360} width={420} height={24} fill={DV.ahsap.orta} />
    {[110, 200, 290, 380].map((x, i) => <rect key={x} x={x} y={270} width={64} height={90} rx={14} fill={[DV.hardal, DV.lavanta, DV.mercan, "#9CCB8E"][i]} />)}
    {/* karakterler */}
    <Kisi tip="babaanne" x={760 - sarilma * 140} y={1180} olcek={1.05} f={f} ifade={babaanneIfade} konus={babaanneKonus} bak={{ x: -1 + bakis, y: 0 }} kolSol={sarilma * 70} tohum={7} />
    <Kisi tip="sen" x={310 + sarilma * 80} y={1200} olcek={1.0} f={f} ifade={senIfade} bak={{ x: 1, y: 0 }} kolSag={-sarilma * 60} tohum={2} />
    {/* masa */}
    <rect x={-20} y={1360} width={1120} height={80} rx={20} fill={DV.ahsap.acik} />
    <rect x={-20} y={1440} width={1120} height={980} fill={DV.ahsap.orta} />
    <path d="M-20 1360 L1100 1360 L1100 1400 L-20 1400 Z" fill="#F3EEE6" opacity={0.6} />
    {/* çaydanlık */}
    <g transform="translate(540 1260)"><rect x={-70} y={-40} width={140} height={110} rx={40} fill="#C0392B" /><rect x={-50} y={-110} width={100} height={80} rx={30} fill="#D35445" />
      <path d="M70 0 C110 -10 120 -40 130 -60" stroke="#C0392B" strokeWidth={16} fill="none" strokeLinecap="round" /></g>
    {/* çay bardakları */}
    {[[380, 0], [700, 1]].map(([x, i]) => (
      <g key={x} transform={`translate(${x} ${1300 - (i === 1 ? bardakKoy * -0 : 0)})`}>
        <ellipse cx={0} cy={62} rx={52} ry={12} fill="#E9E2D6" />
        <path d="M-28 -30 C-34 10 -22 30 -18 56 L18 56 C22 30 34 10 28 -30 Z" fill="#fff" opacity={0.55} />
        <path d={`M-26 ${-20 + (1 - cay) * 60} C-30 10 -20 30 -16 54 L16 54 C20 30 30 10 26 ${-20 + (1 - cay) * 60} Z`} fill="#B5431F" opacity={0.85} />
        {cay > 0.5 ? [0, 1].map((k) => <path key={k} d={`M${-8 + k * 14} ${-50 - ((f * 1.2 + k * 20) % 60)} q10 -15 0 -30`} stroke="#fff" strokeWidth={4} fill="none" opacity={0.5} />) : null}
      </g>
    ))}
    {corba > 0 ? (
      <g transform={`translate(${380 + (1 - corba) * 200} 1330)`} opacity={corba}>
        <ellipse cx={0} cy={0} rx={130} ry={40} fill="#F3EEE6" /><ellipse cx={0} cy={-8} rx={110} ry={28} fill="#E8913F" />
        {[0, 1, 2].map((k) => <path key={k} d={`M${-40 + k * 40} ${-50 - ((f * 1.5 + k * 25) % 80)} q14 -20 0 -40`} stroke="#fff" strokeWidth={5} fill="none" opacity={0.6} />)}
      </g>
    ) : null}
    {muska > 0 ? <g transform={`translate(540 ${1180 - muska * 60}) scale(${0.6 + muska * 0.4})`} opacity={muska}><path d="M-60 -50 L60 -50 L0 60 Z" fill={DV.mercan} /><path d="M-40 -36 L40 -36 L0 40 Z" fill="none" stroke={DV.hardal} strokeWidth={4} strokeDasharray="10 6" /></g> : null}
    <circle cx={820} cy={420} r={900} fill="url(#dv-lambaIsik)" opacity={0.25} style={{ mixBlendMode: "screen" }} />
  </g>
);

/** Sandık yakın: kapak açılır, toz uçar, içinde kumaşa sarılı muska. */
export const SandikYakin: React.FC<{ f: number; ac: number; muska?: number }> = ({ f, ac, muska = 0 }) => (
  <g>
    <rect width={1080} height={1920} fill={DV.gun.duvar} />
    <rect y={1500} width={1080} height={420} fill={DV.ahsap.orta} />
    <rect x={120} y={880} width={840} height={640} rx={30} fill={DV.ahsap.orta} />
    <rect x={120} y={880} width={840} height={60} fill={DV.ahsap.koyu} />
    {[300, 780].map((x) => <rect key={x} x={x - 20} y={880} width={40} height={640} fill="#C9A24A" />)}
    <rect x={160} y={920} width={760} height={120} fill="#2A1C15" opacity={ac} />
    {muska > 0 ? <g transform={`translate(540 ${960 - muska * 160})`} opacity={muska}><path d="M-80 -70 L80 -70 L0 80 Z" fill={DV.mercan} /><path d="M-56 -52 L56 -52 L0 56 Z" fill="none" stroke={DV.hardal} strokeWidth={6} strokeDasharray="14 8" /></g> : null}
    <g transform={`rotate(${-ac * 70} 120 880)`}>
      <path d="M110 880 C110 720 970 720 970 880 Z" fill={DV.ahsap.acik} />
      {[300, 780].map((x) => <rect key={x} x={x - 20} y={760} width={40} height={120} fill="#C9A24A" />)}
      <rect x={510} y={850} width={60} height={70} rx={10} fill="#C9A24A" />
    </g>
    {ac > 0.2 ? Array.from({ length: 18 }, (_, i) => <circle key={i} cx={200 + ((i * 131) % 700)} cy={860 - ((f * (2 + (i % 3)) + i * 40) % 500)} r={4 + (i % 3) * 2} fill="#FFF1C9" opacity={0.6} />) : null}
    <circle cx={540} cy={700} r={900} fill="url(#dv-lambaIsik)" opacity={0.25} style={{ mixBlendMode: "screen" }} />
  </g>
);

/** Muayenehane (gündüz): doktor masada, duvarda bilgi panosu (pano içeriği dışarıdan). */
export const Muayene: React.FC<{ f: number; doktorIfade?: Ifade; konus?: number; senIfade?: Ifade; pano?: React.ReactNode; parmak?: number }> = ({ f, doktorIfade = "gulumse", konus = 0, senIfade = "normal", pano, parmak = 0 }) => (
  <g>
    <rect y={-500} width={1080} height={2920} fill="#DDEBEA" />
    <rect y={1480} width={1080} height={940} fill="#9BB7B2" />
    <rect x={60} y={200} width={420} height={560} rx={20} fill="#fff" />
    <g transform="translate(60 200)">{pano}</g>
    <rect x={640} y={260} width={360} height={420} rx={16} fill="#fff" />
    <rect x={660} y={280} width={320} height={380} fill={DV.gun.gok} />
    <circle cx={900} cy={360} r={44} fill={DV.gun.gunes} />
    <Kisi tip="doktor" x={540} y={1140} olcek={1.15} f={f} ifade={doktorIfade} konus={konus} kolSag={parmak > 0 ? -150 * parmak : -8} tohum={9} />
    {parmak > 0 ? <g transform={`translate(${540 + 138 * 1.15} ${1140 - 160 * parmak})`}><rect x={-12} y={-70} width={24} height={70} rx={12} fill={DV.ten} /></g> : null}
    <rect x={-20} y={1300} width={1120} height={70} rx={14} fill={DV.ahsap.acik} />
    <rect x={-20} y={1370} width={1120} height={1060} fill={DV.ahsap.orta} />
    <rect x={160} y={1240} width={220} height={60} rx={6} fill="#fff" /><rect x={700} y={1230} width={60} height={70} rx={10} fill={DV.mercan} />
    <g transform="translate(150 1560) scale(0.85)"><Bas tip="sen" ifade={senIfade} f={f} bak={{ x: 0.6, y: -0.8 }} tohum={2} /></g>
    <g transform="translate(930 1560) scale(0.85)"><Bas tip="babaanne" ifade="ciddi" f={f} bak={{ x: -0.6, y: -0.8 }} tohum={7} /></g>
  </g>
);

/** Bilgi panoları (420x560 kutuda çizilir; muayenehane panosu ya da tam ekran kart olarak büyütülür). */
export const PanoBeyin: React.FC<{ f: number; beyin: number; beden: number; kilit: number }> = ({ f, beyin, beden, kilit }) => (
  <g>
    <rect width={420} height={560} rx={20} fill="#fff" />
    <circle cx={210} cy={150} r={90} fill="#E4E8F2" />
    <path d="M150 150 C140 100 190 80 210 100 C230 80 280 100 270 150 C290 180 250 210 210 200 C170 210 130 180 150 150 Z" fill={beyin > 0 ? DV.hardal : "#C9CFDC"} />
    {beyin > 0 ? <circle cx={210} cy={150} r={110 + Math.sin(f * 0.3) * 6} fill="none" stroke={DV.hardal} strokeWidth={6} opacity={beyin * 0.7} /> : null}
    <rect x={120} y={260} width={180} height={240} rx={60} fill={beden > 0 ? "#9AA3B5" : "#E4E8F2"} />
    {beden > 0 ? <text x={310} y={300} fontFamily="Inter" fontWeight={800} fontSize={44} fill={DV.lavanta} opacity={beden}>z</text> : null}
    {kilit > 0 ? <g transform="translate(210 380)" opacity={kilit}><rect x={-46} y={-20} width={92} height={70} rx={14} fill={DV.lacivert} /><path d="M-28 -20 V-46 C-28 -80 28 -80 28 -46 V-20" stroke={DV.lacivert} strokeWidth={14} fill="none" /></g> : null}
  </g>
);
export const PanoYuz: React.FC<{ f: number; yanan: number; kalan?: number }> = ({ f, yanan }) => (
  <g>
    <rect width={420} height={560} rx={20} fill="#fff" />
    {Array.from({ length: 100 }, (_, i) => {
      const x = 42 + (i % 10) * 37, y = 60 + Math.floor(i / 10) * 48;
      const sira = [13, 27, 34, 46, 58, 61, 79, 92].indexOf(i);
      const yan = sira >= 0 && yanan > sira;
      return <g key={i} transform={`translate(${x} ${y})`}><circle cx={0} cy={-8} r={7} fill={yan ? DV.mercan : "#C9CFDC"} /><path d="M-11 14 Q0 -2 11 14 Z" fill={yan ? DV.mercan : "#C9CFDC"} /></g>;
    })}
  </g>
);
export const PanoStres: React.FC<{ f: number; kitap: number; ay: number; ok: number }> = ({ f, kitap, ay, ok }) => (
  <g>
    <rect width={420} height={560} rx={20} fill="#fff" />
    {Array.from({ length: 5 }, (_, i) => <rect key={i} x={50 + (i % 2) * 14} y={420 - i * 46 * kitap} width={170} height={40} rx={6} fill={[DV.mercan, DV.hardal, DV.lavanta, "#9CCB8E", DV.mercan][i]} opacity={kitap} />)}
    <g opacity={ay}><circle cx={310} cy={140} r={60} fill={DV.gece.gok} /><circle cx={330} cy={130} r={30} fill={DV.gece.ay} /><circle cx={342} cy={122} r={26} fill={DV.gece.gok} />
      <ellipse cx={310} cy={300} rx={70} ry={42} fill="#fff" stroke={DV.lacivert} strokeWidth={8} /><circle cx={310} cy={300} r={20} fill={DV.lacivert} /></g>
    {ok > 0 ? <path d={`M330 ${500} L330 ${500 - ok * 120} M300 ${530 - ok * 120} L330 ${500 - ok * 140} L360 ${530 - ok * 120}`} stroke={DV.mercan} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
  </g>
);

/** Masal sayfası: eski resimli kitap sayfasında, uyuyanın göğsüne çöken karaltı (halk anlatısı). */
export const MasalSayfasi: React.FC<{ f: number; cok: number; bas: number; sayfa?: number }> = ({ f, cok, bas, sayfa = 1 }) => (
  <g>
    <rect width={1080} height={1920} fill="#5B3F33" />
    <g transform={`translate(540 960) rotate(${(1 - sayfa) * -6}) scale(${0.9 + sayfa * 0.1}) translate(-540 -960)`}>
      <rect x={70} y={230} width={940} height={1460} rx={16} fill="#F1E3C6" />
      <rect x={110} y={270} width={860} height={1380} fill="none" stroke="#B99A6B" strokeWidth={6} />
      <clipPath id="masal-k"><rect x={140} y={300} width={800} height={1320} /></clipPath>
      <g clipPath="url(#masal-k)">
        <rect x={140} y={300} width={800} height={1320} fill="#E9D3A8" />
        <circle cx={760} cy={480} r={70} fill="#FFF3D2" />
        <rect x={180} y={1100} width={720} height={260} rx={40} fill="#8A5A3C" />
        <rect x={220} y={1050} width={220} height={110} rx={50} fill="#F6EEDC" />
        <g transform="translate(330 1080) scale(0.55) rotate(-90)"><Bas tip="sen" ifade={bas > 0.5 ? "dehset" : "uyku"} f={f} yatik tohum={11} /></g>
        <path d={`M400 ${1120 + bas * 20} C560 ${1060 + bas * 50} 760 ${1070 + bas * 50} 880 1120 L880 1300 L400 1300 Z`} fill="#B5553F" />
        <g transform={`translate(0 ${-(1 - cok) * 500})`} opacity={Math.min(1, cok * 1.5)}>
          <Karabasan x={620} y={1020 + bas * 30} olcek={0.7 * (1 - bas * 0.1)} f={f} kollar={0.8} />
        </g>
      </g>
      <rect x={140} y={300} width={800} height={1320} fill="#C9A26B" opacity={0.18} style={{ mixBlendMode: "multiply" }} />
    </g>
  </g>
);
