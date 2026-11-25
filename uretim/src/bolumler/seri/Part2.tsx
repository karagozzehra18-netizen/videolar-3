// KARABASAN · PART 2 — "Muska".
import React from "react";
import { interpolate } from "remotion";
import bolum from "../../../../bolumler/seri-karabasan/part2/bolum.json";
import zaman from "../../../../bolumler/seri-karabasan/part2/zaman.json";
import type { Cekim } from "../../motor/cekim";
import { firla, ilerle, kenet } from "../../motor/yardimci";
import { BabaanneOda, GozYakin, KapiKolu, OdaGenis, YastikMuska, YatakUst } from "../../stiller/duz-vektor/gece";
import { MasalSayfasi, Mutfak, SandikYakin } from "../../stiller/duz-vektor/gunduz";
import { SeriVideo } from "./SeriVideo";

const hizli = (t: number) => firla(Math.min(1, t * 4.5));

export const cekimler2 = (O: Record<string, number>): Cekim[] => [
  { bas: 0, k0: { s: 2.6, cx: 760, cy: 1200 }, k1: { s: 1.9, cx: 760, cy: 1240 }, kEgri: hizli, flas: (lf) => interpolate(lf, [0, 6], [0.4, 0], kenet),
    ciz: (lf, f) => <Mutfak f={f} babaanneIfade="ciddi" senIfade="saskin" babaanneKonus={f > O.kelime - 4 && f < O.kelime + 20 ? 1 : 0} bakis={1} /> },
  { bas: O.mutfak, gecis: "cozul", k0: { s: 1.05, cx: 540, cy: 1250 }, k1: { s: 1.15, cx: 560, cy: 1290 },
    ciz: (lf, f) => <Mutfak f={f} babaanneIfade="ciddi" senIfade="normal" cay={ilerle(f, O.cay, O.cay + 30)} /> },
  { bas: O["yuz-ciddi"], k0: { s: 1.8, cx: 760, cy: 1250 }, k1: { s: 2.2, cx: 760, cy: 1240 },
    ciz: (lf, f) => <Mutfak f={f} babaanneIfade="ciddi" senIfade="normal" cay={1} bakis={1} /> },
  { bas: O.harita, gecis: "flas", k0: { s: 0.95, cx: 540, cy: 960 }, k1: { s: 1.25, cx: 560, cy: 1100 },
    ciz: (lf, f) => <MasalSayfasi f={f} sayfa={ilerle(f, O.harita, O.harita + 16, firla)} cok={ilerle(f, O["golge-coker"] - 4, O["golge-coker"] + 10)} bas={ilerle(f, O.bastirir, O.bastirir + 8)} /> },
  { bas: O.ad, k0: { s: 1.25, cx: 560, cy: 1100 }, k1: { s: 1.6, cx: 600, cy: 1060 },
    sarsinti: (lf) => (lf + O.ad > O.bastiran && lf + O.ad < O.bastiran + 14 ? 0.6 : 0),
    ciz: (lf, f) => <MasalSayfasi f={f} cok={1} bas={0.6 + 0.4 * Math.abs(Math.sin((f - O.ad) * 0.12)) + ilerle(f, O.bastiran, O.bastiran + 6) * 0.4} /> },
  { bas: O.sandik - 40, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1100 }, k1: { s: 1.3, cx: 540, cy: 1000 },
    ciz: (lf, f) => <SandikYakin f={f} ac={ilerle(f, O.sandik, O.sandik + 18, firla)} muska={ilerle(f, O["bu-gece"], O["bu-gece"] + 20)} /> },
  { bas: O["muska-soz"] - 8, k0: { s: 1.4, cx: 640, cy: 1260 }, k1: { s: 1.7, cx: 620, cy: 1280 },
    ciz: (lf, f) => <Mutfak f={f} babaanneIfade="ciddi" senIfade="saskin" babaanneKonus={0.6} muska={ilerle(f, O["muska-soz"] - 6, O["muska-soz"] + 8, firla)} /> },
  { bas: O.gulumse - 4, k0: { s: 2.0, cx: 330, cy: 1260 }, k1: { s: 2.2, cx: 320, cy: 1280 },
    ciz: (lf, f) => <Mutfak f={f} babaanneIfade="ciddi" senIfade={f > O.inanmama ? "normal" : "gulumse"} muska={1} /> },
  { bas: O["isik-acik"] - 6, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1150 }, k1: { s: 1.15, cx: 640, cy: 1250 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={ilerle(f, O["isik-acik"], O["isik-acik"] + 3)} ay={1} yatakDolu ifade="normal" /> },
  { bas: O.yastik, k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.15, cx: 540, cy: 1020 },
    ciz: (lf, f) => <YastikMuska f={f} kalk={ilerle(f, O.yastik, O.yastik + 20, firla)} muska={1} parla={ilerle(f, O["muska-bul"], O["muska-bul"] + 10)} lamba={1} /> },
  { bas: O.rahat - 4, gecis: "cozul", k0: { s: 1.5, cx: 540, cy: 620 }, k1: { s: 1.15, cx: 540, cy: 760 },
    ciz: (lf, f) => <YatakUst f={f} lamba={1} ay={0.3} ifade={f > O.uyku ? "uyku" : "gulumse"} muska={1} /> },
  { bas: O.fisilti, k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.12, cx: 540, cy: 960 },
    ciz: (lf, f) => <GozYakin f={f} acik={interpolate(f, [O.fisilti, O.fisilti + 6], [0.05, 1.15], kenet)} ifade="korku" bak={{ x: ilerle(f, O.fisilti + 14, O.fisilti + 24), y: 0 }} lamba={0.7} ay={0.6} /> },
  { bas: O["koridor-kapi"], gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1200 }, k1: { s: 1.3, cx: 540, cy: 1500 },
    ciz: (lf, f) => <KapiKolu f={f} don={0} golge={ilerle(f, O.adini, O.adini + 40)} /> },
  { bas: O["ses-dalga"], k0: { s: 2.4, cx: 540, cy: 620 }, k1: { s: 2.7, cx: 540, cy: 600 },
    ciz: (lf, f) => <YatakUst f={f} lamba={1} ay={0.4} ifade={f > O["ses-dalga"] + 20 ? "korku" : "saskin"} muska={1} bak={{ x: 1, y: -0.5 }} /> },
  { bas: O["yan-oda"], gecis: "cozul", k0: { s: 1.2, cx: 600, cy: 1450 }, k1: { s: 1.6, cx: 520, cy: 1420 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={0} /> },
  { bas: O.soru, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.45, cx: 620, cy: 920 },
    ciz: (lf, f) => <KapiKolu f={f} don={ilerle(f, O.soru + 20, O.yorum + 20)} /> },
];

export const Part2: React.FC<{ temiz?: boolean }> = ({ temiz }) => <SeriVideo bolum={bolum} zaman={zaman} cekimler={cekimler2} temiz={temiz} />;
export const PART2_SURE = zaman.toplam;
