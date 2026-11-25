// KARABASAN · PART 3 — "Gölge".
import React from "react";
import { interpolate } from "remotion";
import bolum from "../../../../bolumler/seri-karabasan/part3/bolum.json";
import zaman from "../../../../bolumler/seri-karabasan/part3/zaman.json";
import type { Cekim } from "../../motor/cekim";
import { firla, ilerle, kenet, sert } from "../../motor/yardimci";
import { Ayaklar, BabaanneOda, GozYakin, Koridor, SaatYakin } from "../../stiller/duz-vektor/gece";
import { Kisi } from "../../stiller/duz-vektor/karakterler";
import { DV } from "../../stiller/duz-vektor/motor";
import { SeriVideo } from "./SeriVideo";

export const cekimler3 = (O: Record<string, number>): Cekim[] => [
  // kapı açılır: koyu kapı kanadı sağa kayar, ay ışıklı koridor görünür
  { bas: 0, k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.25, cx: 540, cy: 900 }, flas: (lf) => interpolate(lf, [0, 8], [0.35, 0], kenet),
    ciz: (lf, f) => (
      <g>
        <Koridor f={f} ay={0.8} />
        <rect x={interpolate(lf, [0, 9], [420, 1080], { ...kenet, easing: firla })} y={0} width={1080} height={1920} fill={DV.ahsap.acik} />
      </g>
    ) },
  { bas: O.ayak, k0: { s: 1.0, cx: 540, cy: 1000 }, k1: { s: 1.15, cx: 540, cy: 1000 },
    ciz: (lf, f) => <Ayaklar f={f} adim={ilerle(f, O.tahta - 10, O.tahta + 6)} /> },
  { bas: O.sessiz, gecis: "cozul", k0: { s: 1.1, cx: 540, cy: 900 }, k1: { s: 1.45, cx: 540, cy: 850 },
    ciz: (lf, f) => <Koridor f={f} ay={0.8} /> },
  { bas: O.saat, k0: { s: 1.0, cx: 540, cy: 900 }, k1: { s: 1.3, cx: 540, cy: 760 },
    ciz: (lf, f) => <SaatYakin f={f} saat={3} ay={1} /> },
  { bas: O.aralik - 20, gecis: "cozul", k0: { s: 1.2, cx: 760, cy: 1040 }, k1: { s: 1.8, cx: 880, cy: 1080 },
    ciz: (lf, f) => <Koridor f={f} ay={0.8} aralik={ilerle(f, O.aralik, O.aralik + 20)} isik={ilerle(f, O["isik-sizar"], O["isik-sizar"] + 24)} /> },
  { bas: O.iceri, gecis: "cozul", k0: { s: 1.0, cx: 560, cy: 1450 }, k1: { s: 1.7, cx: 500, cy: 1420 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={0} /> },
  { bas: O.uyuyordu, k0: { s: 1.7, cx: 500, cy: 1420 }, k1: { s: 1.0, cx: 560, cy: 1450 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={0} /> },
  { bas: O.donus, k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.12, cx: 540, cy: 960 },
    ciz: (lf, f) => <GozYakin f={f} acik={1} ifade="normal" bak={{ x: interpolate(f, [O.donus, O.duvar + 6], [1, -1], kenet), y: -0.2 }} lamba={0.6} ay={0.6} /> },
  { bas: O.lamba, gecis: "cozul", k0: { s: 1.9, cx: 170, cy: 1250 }, k1: { s: 1.5, cx: 260, cy: 1150 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={0} /> },
  { bas: O.golge, k0: { s: 1.3, cx: 560, cy: 1250 }, k1: { s: 1.0, cx: 560, cy: 960 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={ilerle(f, O.yatmiyor, O.ayakta + 10, sert)} kol={ilerle(f, O.kollar, O.yere + 10)} /> },
  { bas: O.kollar, k0: { s: 1.0, cx: 560, cy: 960 }, k1: { s: 1.35, cx: 600, cy: 1100 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={1} kol={ilerle(f, O.kollar, O.yere + 10)} /> },
  { bas: O["nefes-tut"], gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1100 }, k1: { s: 1.15, cx: 540, cy: 1150 },
    ciz: (lf, f) => (
      <g>
        <Koridor f={f} ay={0.8} aralik={1} isik={1} />
        <Kisi tip="sen" x={540} y={interpolate(f, [O.adim, O.adim + 12], [1290, 1330], kenet)} olcek={2.1} f={f} ifade="dehset" bak={{ x: 1, y: 0 }} />
      </g>
    ) },
  { bas: O.gicirti - 10, sarsinti: (lf) => interpolate(lf, [10, 14, 26], [0, 0.6, 0], kenet), k0: { s: 1.05, cx: 540, cy: 1050 }, k1: { s: 1.25, cx: 500, cy: 1100 },
    ciz: (lf, f) => <Ayaklar f={f} adim={ilerle(f, O.gicirti - 10, O.gicirti)} geri /> },
  { bas: O["bas-doner"], gecis: "cozul", k0: { s: 1.1, cx: 600, cy: 760 }, k1: { s: 1.6, cx: 600, cy: 640 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={1} kol={1} bas={ilerle(f, O["bas-doner"], O.cevirdi + 6)} goz={ilerle(f, O.cevirdi, O.cevirdi + 10)} /> },
  { bas: O.yoksa, k0: { s: 1.8, cx: 470, cy: 1400 }, k1: { s: 2.1, cx: 470, cy: 1390 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={1} kol={1} bas={1} goz={1} /> },
  { bas: O.uyandir, k0: { s: 1.6, cx: 600, cy: 640 }, k1: { s: 2.3, cx: 610, cy: 600 },
    ciz: (lf, f) => <BabaanneOda f={f} golge={1} kol={1} bas={1} goz={1} /> },
];

export const Part3: React.FC<{ temiz?: boolean }> = ({ temiz }) => <SeriVideo bolum={bolum} zaman={zaman} cekimler={cekimler3} temiz={temiz} />;
export const PART3_SURE = zaman.toplam;
