// KARABASAN · PART 4 — "Doktor".
import React from "react";
import { interpolate } from "remotion";
import bolum from "../../../../bolumler/seri-karabasan/part4/bolum.json";
import zaman from "../../../../bolumler/seri-karabasan/part4/zaman.json";
import type { Cekim } from "../../motor/cekim";
import { firla, ilerle, kenet, sert } from "../../motor/yardimci";
import { BabaanneOda, Cekmece, DugmeYakin, GozYakin, OdaGenis, SaatYakin, YastikMuska, YatakUst } from "../../stiller/duz-vektor/gece";
import { Muayene, PanoBeyin, PanoStres, PanoYuz } from "../../stiller/duz-vektor/gunduz";
import { Karabasan } from "../../stiller/duz-vektor/karakterler";
import { DV } from "../../stiller/duz-vektor/motor";
import { SeriVideo } from "./SeriVideo";

const PANO = { s: 2.3, cx: 270, cy: 480 }; // muayenehane panosuna yakın plan
const hizli = (t: number) => firla(Math.min(1, t * 4.5));

export const cekimler4 = (O: Record<string, number>): Cekim[] => [
  { bas: 0, k0: { s: 1.6, cx: 540, cy: 960 }, k1: { s: 1.0, cx: 540, cy: 960 }, kEgri: hizli, flas: (lf) => interpolate(lf, [0, 8], [0.5, 0], kenet),
    ciz: (lf, f) => <GozYakin f={f} acik={interpolate(lf, [0, 8], [0.05, 1], kenet)} ifade="saskin" lamba={0} ay={0} /> },
  { bas: O.sabah, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1150 }, k1: { s: 1.2, cx: 700, cy: 1250 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={0} ay={0} gun={1} yatakDolu ifade="saskin" /> },
  { bas: O["koridor-hatira"], gecis: "flas", k0: { s: 1.2, cx: 600, cy: 800 }, k1: { s: 1.4, cx: 600, cy: 700 },
    ciz: (lf, f) => <g><BabaanneOda f={f} golge={1} kol={1} bas={1} goz={0.7} /><rect width={1080} height={1920} fill="#8C7AA8" opacity={0.35} style={{ mixBlendMode: "color" }} /></g> },
  { bas: O.yatak, gecis: "flas", k0: { s: 1.7, cx: 760, cy: 1120 }, k1: { s: 1.9, cx: 760, cy: 1100 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={0} ay={0} gun={1} yatakDolu ifade="saskin" /> },
  { bas: O.kasaba, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1080 }, k1: { s: 1.12, cx: 540, cy: 1120 },
    ciz: (lf, f) => <Muayene f={f} doktorIfade="normal" senIfade="normal" pano={<PanoBeyin f={f} beyin={0} beden={0} kilit={0} />} /> },
  { bas: O.dinledi, k0: { s: 1.6, cx: 540, cy: 1200 }, k1: { s: 1.8, cx: 540, cy: 1220 },
    ciz: (lf, f) => <Muayene f={f} doktorIfade={f > O.gulumsedi ? "gulumse" : "normal"} konus={f > O["uyku-felci"] - 6 ? 0.7 : 0} senIfade="normal"
      pano={<PanoBeyin f={f} beyin={0} beden={0} kilit={0} />} /> },
  { bas: O.beyin - 6, gecis: "cozul", k0: { s: 1.4, cx: 300, cy: 600 }, k1: PANO,
    ciz: (lf, f) => <Muayene f={f} konus={0.7} pano={<PanoBeyin f={f} beyin={ilerle(f, O.beyin, O.beyin + 8)} beden={ilerle(f, O.beden, O.beden + 8)} kilit={ilerle(f, O.kimildamaz, O.kimildamaz + 8, firla)} />} /> },
  { bas: O.gogus, gecis: "cozul", k0: { s: 1.3, cx: 540, cy: 760 }, k1: { s: 1.45, cx: 540, cy: 720 },
    ciz: (lf, f) => <YatakUst f={f} lamba={0.3} ay={0.9} ifade="korku" kb={{ gor: ilerle(f, O.gogus, O.gogus + 10), netlik: 0, goz: 0, y: 860 }} basinc={1} /> },
  { bas: O["oda-biri"], k0: { s: 1.0, cx: 540, cy: 1150 }, k1: { s: 1.25, cx: 760, cy: 1250 },
    ciz: (lf, f) => (
      <g><OdaGenis f={f} lamba={0} ay={1} yatakDolu ifade="korku" />
        <g opacity={ilerle(f, O["oda-biri"], O["oda-biri"] + 20) * 0.85}><Karabasan x={860} y={1080} olcek={0.6} f={f} netlik={0} goz={0} kollar={0.5} /></g></g>
    ) },
  { bas: O.anlatilir, k0: { s: 1.5, cx: 540, cy: 1200 }, k1: { s: 1.6, cx: 540, cy: 1210 },
    ciz: (lf, f) => <Muayene f={f} doktorIfade="gulumse" konus={0.6} pano={<PanoYuz f={f} yanan={0} />} /> },
  { bas: O["yuz-kisi"], gecis: "cozul", k0: { s: 1.4, cx: 300, cy: 600 }, k1: PANO,
    ciz: (lf, f) => <Muayene f={f} konus={0.6} pano={<PanoYuz f={f} yanan={Math.max(0, Math.floor((f - O.sekiz) / 3) + 1)} />} /> },
  { bas: O.stres, gecis: "cozul", k0: PANO, k1: { s: 2.5, cx: 280, cy: 470 },
    ciz: (lf, f) => <Muayene f={f} konus={0.6} pano={<PanoStres f={f} kitap={ilerle(f, O.stres, O.stres + 14, firla)} ay={ilerle(f, O.uykusuz, O.uykusuz + 10)} ok={ilerle(f, O.ihtimal, O.ihtimal + 12, firla)} />} /> },
  { bas: O.sinav, k0: { s: 2.4, cx: 160, cy: 1700 }, k1: { s: 2.6, cx: 170, cy: 1700 },
    ciz: (lf, f) => (
      <g><Muayene f={f} senIfade={f > O.aptal ? "gulumse" : "saskin"} pano={<PanoStres f={f} kitap={1} ay={1} ok={1} />} />
        {f < O.aptal ? Array.from({ length: 7 }, (_, i) => {
          const t = ((f - O.sinav) * 0.02 + i / 7) % 1;
          return <rect key={i} x={20 + ((i * 97) % 300) + t * 60} y={1300 + t * -400} width={70} height={90} rx={6} fill="#fff" opacity={1 - t} transform={`rotate(${i * 25 + t * 90} ${60 + i * 40} ${1350 - t * 400})`} />;
        }) : <><ellipse cx={95} cy={1590} rx={26} ry={14} fill={DV.mercan} opacity={0.6} /><ellipse cx={205} cy={1590} rx={26} ry={14} fill={DV.mercan} opacity={0.6} /></>}
      </g>
    ) },
  { bas: O["muska-al"], gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.12, cx: 540, cy: 1000 },
    ciz: (lf, f) => <YastikMuska f={f} kalk={1} muska={1 - ilerle(f, O["muska-al"] + 18, O["muska-al"] + 30)} lamba={1} /> },
  { bas: O.cekmece - 8, k0: { s: 1.0, cx: 540, cy: 1100 }, k1: { s: 1.15, cx: 540, cy: 1150 },
    ciz: (lf, f) => <Cekmece f={f} kapan={ilerle(f, O.cekmece - 6, O.cekmece + 2)} lamba={1} /> },
  { bas: O["isik-sonar"] - 8, k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.1, cx: 540, cy: 920 },
    ciz: (lf, f) => <DugmeYakin f={f} durum={f < O["isik-sonar"] ? 1 : 0} bas={ilerle(f, O["isik-sonar"] - 8, O["isik-sonar"]) * (1 - ilerle(f, O["isik-sonar"] + 6, O["isik-sonar"] + 16))} /> },
  { bas: O["gece-yarisi"], gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 900 }, k1: { s: 1.3, cx: 540, cy: 760 },
    ciz: (lf, f) => <SaatYakin f={f} saat={12} ay={1} /> },
  { bas: O.agirlik - 10, k0: { s: 1.2, cx: 540, cy: 760 }, k1: { s: 1.35, cx: 540, cy: 700 },
    sarsinti: (lf) => interpolate(lf, [10, 14, 30], [0, 0.9, 0], kenet),
    ciz: (lf, f) => <YatakUst f={f} lamba={0} ay={1} ifade={f > O.agirlik ? "korku" : "uyku"} basinc={ilerle(f, O.agirlik, O.agirlik + 6)}
      kb={{ gor: ilerle(f, O.agirlik - 6, O.agirlik), netlik: 0.2, goz: 0, y: interpolate(ilerle(f, O.agirlik - 8, O.agirlik + 2, sert), [0, 1], [-500, 860]) }} /> },
  { bas: O["bu-sefer"], k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.2, cx: 540, cy: 960 },
    ciz: (lf, f) => <GozYakin f={f} acik={interpolate(f, [O["bu-sefer"], O.gozler, O.alisti], [0.6, 1.0, 1.3], kenet)} ifade="dehset" ay={1} lamba={0} /> },
  { bas: O.acikca - 6, gecis: "flas", k0: { s: 1.3, cx: 540, cy: 760 }, k1: { s: 2.0, cx: 560, cy: 640 },
    ciz: (lf, f) => <YatakUst f={f} lamba={0} ay={1} ifade="dehset" basinc={1} kb={{ gor: 1, netlik: 1, goz: ilerle(f, O.acikca - 4, O.acikca + 6), y: 820 }} /> },
  { bas: O.soru, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1150 }, k1: { s: 1.4, cx: 540, cy: 1250 },
    ciz: (lf, f) => (
      <g><Cekmece f={f} kapan={1} lamba={0.45} />
        <rect x={120} y={986} width={840} height={26} fill={DV.mercan} opacity={0.6 + 0.35 * Math.sin(f * 0.2)} filter="url(#dv-parilti)" />
        <ellipse cx={540} cy={1000} rx={520} ry={120} fill={DV.mercan} opacity={0.18 + 0.1 * Math.sin(f * 0.2)} filter="url(#dv-yumusak)" /></g>
    ) },
];

export const Part4: React.FC<{ temiz?: boolean }> = ({ temiz }) => <SeriVideo bolum={bolum} zaman={zaman} cekimler={cekimler4} temiz={temiz} />;
export const PART4_SURE = zaman.toplam;
