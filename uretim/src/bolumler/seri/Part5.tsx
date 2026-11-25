// KARABASAN · PART 5 — "Son gece".
import React from "react";
import { interpolate } from "remotion";
import bolum from "../../../../bolumler/seri-karabasan/part5/bolum.json";
import zaman from "../../../../bolumler/seri-karabasan/part5/zaman.json";
import type { Cekim } from "../../motor/cekim";
import { firla, ilerle, kenet } from "../../motor/yardimci";
import { ElYakin, OdaGenis, YastikMuska, YatakUst } from "../../stiller/duz-vektor/gece";
import { Muayene, PanoBeyin } from "../../stiller/duz-vektor/gunduz";
import { DV } from "../../stiller/duz-vektor/motor";
import { SeriVideo } from "./SeriVideo";

const hizli = (t: number) => firla(Math.min(1, t * 4.5));

export const cekimler5 = (O: Record<string, number>): Cekim[] => [
  { bas: 0, k0: { s: 1.5, cx: 540, cy: 760 }, k1: { s: 2.1, cx: 540, cy: 700 }, kEgri: hizli, flas: (lf) => interpolate(lf, [0, 6], [0.45, 0], kenet),
    ciz: (lf, f) => <YatakUst f={f} lamba={0.35} ay={0.8} ifade="dehset" basinc={1} kb={{ gor: 1, netlik: 1, goz: 1, y: 760, olcek: 1.1 }} /> },
  { bas: O.duman, k0: { s: 2.1, cx: 540, cy: 700 }, k1: { s: 2.6, cx: 540, cy: 620 },
    flas: (lf) => (lf + O.duman > O.gozler && lf + O.duman < O.gozler + 8 ? 0.25 : 0),
    ciz: (lf, f) => <YatakUst f={f} lamba={0.35} ay={0.8} ifade="dehset" basinc={1} kb={{ gor: 1, netlik: 1, goz: f > O.gozler ? 1.3 : 1, y: 740 + Math.sin(f * 0.1) * 10, olcek: 1.15 }} /> },
  { bas: O.sikisti, k0: { s: 2.6, cx: 540, cy: 600 }, k1: { s: 3.0, cx: 540, cy: 580 },
    sarsinti: (lf) => (lf + O.sikisti > O.panik ? 0.6 : 0.2),
    ciz: (lf, f) => <YatakUst f={f} lamba={0.35} ay={0.8} ifade="dehset" basinc={1} nefes={2} kb={{ gor: 1, netlik: 1, goz: 1, y: 760 }} /> },
  { bas: O["doktor-ses"], gecis: "cozul", k0: { s: 1.3, cx: 540, cy: 1180 }, k1: { s: 1.55, cx: 540, cy: 1200 },
    ciz: (lf, f) => (
      <g><Muayene f={f} doktorIfade="gulumse" konus={0.7} parmak={ilerle(f, O.kucuk, O.kucuk + 10, firla)} pano={<PanoBeyin f={f} beyin={1} beden={1} kilit={0} />} />
        <rect width={1080} height={1920} fill="#F3D9AE" opacity={0.25} style={{ mixBlendMode: "multiply" }} /></g>
    ) },
  { bas: O["parmak-goster"], k0: { s: 1.0, cx: 540, cy: 1050 }, k1: { s: 1.2, cx: 620, cy: 1100 },
    ciz: (lf, f) => <ElYakin f={f} vurgu={ilerle(f, O["parmak-goster"], O["parmak-goster"] + 10)} ay={0.8} lamba={0.4} /> },
  { bas: O["nefes-al"], k0: { s: 1.55, cx: 540, cy: 1200 }, k1: { s: 1.7, cx: 540, cy: 1210 },
    ciz: (lf, f) => <Muayene f={f} doktorIfade="gulumse" konus={0.5} pano={<PanoBeyin f={f} beyin={1} beden={1} kilit={0} />} /> },
  { bas: O.al - 4, gecis: "cozul", k0: { s: 2.2, cx: 540, cy: 620 }, k1: { s: 2.0, cx: 540, cy: 660 },
    ciz: (lf, f) => (
      <g><YatakUst f={f} lamba={0.35} ay={0.8} ifade="gerilim" acik={0.6} basinc={1} nefes={2.5} kb={{ gor: 1, netlik: 0.9, goz: 1, y: 800 }} />
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={420 + i * 80} cy={330} r={22} fill={DV.hardal} opacity={ilerle(f, O.say + i * 9, O.say + i * 9 + 4)} />)}
        {f > O.ver ? <ellipse cx={540} cy={560 - (f - O.ver) * 2} rx={60 + (f - O.ver) * 3} ry={30 + (f - O.ver)} fill="#fff" opacity={Math.max(0, 0.45 - (f - O.ver) * 0.012)} filter="url(#dv-yumusak)" /> : null}
      </g>
    ) },
  { bas: O.serce - 4, gecis: "cozul", k0: { s: 1.1, cx: 620, cy: 1100 }, k1: { s: 1.5, cx: 660, cy: 1150 },
    flas: (lf) => (lf + O.serce - 4 > O.oynadi && lf + O.serce - 4 < O.oynadi + 10 ? 0.35 : 0),
    ciz: (lf, f) => <ElYakin f={f} vurgu={0.8} titre={f > O.kipirda2 ? 1.6 : f > O.kipirda1 ? 1 : 0.4} parmak={ilerle(f, O.oynadi, O.oynadi + 6, firla)} ay={0.8} lamba={0.4} /> },
  { bas: O.dagil - 4, gecis: "cozul", k0: { s: 1.5, cx: 540, cy: 760 }, k1: { s: 1.05, cx: 540, cy: 900 },
    ciz: (lf, f) => <YatakUst f={f} lamba={0.35} ay={0.8} ifade="saskin" basinc={1 - ilerle(f, O.dagil, O.dagildi)} kb={{ gor: 1, netlik: 1, goz: 1 - ilerle(f, O.dagil, O.dagil + 20), dagil: ilerle(f, O.dagil, O.dagildi + 10), y: 800 }} /> },
  { bas: O.safak, gecis: "flas", k0: { s: 1.0, cx: 540, cy: 1150 }, k1: { s: 1.2, cx: 760, cy: 1250 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={0} ay={0} gun={ilerle(f, O.safak, O.safak + 30)} yatakDolu ifade="gulumse" /> },
  { bas: O.kahvalti, gecis: "cozul", k0: { s: 1.05, cx: 540, cy: 1250 }, k1: { s: 1.15, cx: 520, cy: 1290 },
    ciz: (lf, f) => <MutfakSahne f={f} O={O} /> },
  { bas: O.bakis, k0: { s: 2.0, cx: 760, cy: 1250 }, k1: { s: 2.4, cx: 760, cy: 1240 },
    ciz: (lf, f) => <MutfakSahne f={f} O={O} /> },
  { bas: O.koyamadim, k0: { s: 2.1, cx: 330, cy: 1260 }, k1: { s: 2.5, cx: 320, cy: 1270 },
    ciz: (lf, f) => <MutfakSahne f={f} O={O} /> },
  { bas: O.yastik, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.35, cx: 560, cy: 1000 },
    ciz: (lf, f) => <YastikMuska f={f} kalk={1} muska={1} parla={0.5 + 0.3 * Math.sin(f * 0.15)} parmak={ilerle(f, O.kim, O.kim + 40)} lamba={0.2} ay={0.2} /> },
];

import { Mutfak } from "../../stiller/duz-vektor/gunduz";
const MutfakSahne: React.FC<{ f: number; O: Record<string, number> }> = ({ f, O }) => (
  <Mutfak f={f} cay={1} babaanneIfade={f > O.bakis ? (f > O.kiyamadim ? "normal" : "ciddi") : "gulumse"} senIfade={f > O.koyamadim ? "dehset" : "normal"}
    babaanneKonus={f > O.kiyamadim && f < O.yastik ? 0.6 : 0} muska={f > O.muska && f < O.bardak ? ilerle(f, O.muska, O.muska + 10) : 0}
    bakis={f > O.bakis ? 1 : 0} />
);

export const Part5: React.FC<{ temiz?: boolean }> = ({ temiz }) => <SeriVideo bolum={bolum} zaman={zaman} cekimler={cekimler5} temiz={temiz} />;
export const PART5_SURE = zaman.toplam;
