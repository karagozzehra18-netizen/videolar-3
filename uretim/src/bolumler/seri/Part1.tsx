// KARABASAN · PART 1 — "Babaannenin evi". Olaylar: bolumler/seri-karabasan/part1/bolum.json → zaman.json
import React from "react";
import { interpolate } from "remotion";
import bolum from "../../../../bolumler/seri-karabasan/part1/bolum.json";
import zaman from "../../../../bolumler/seri-karabasan/part1/zaman.json";
import type { Cekim } from "../../motor/cekim";
import { firla, ilerle, kenet, sert } from "../../motor/yardimci";
import { AynaYakin, DugmeYakin, ElYakin, GozYakin, OdaGenis, SaatYakin, YatakUst } from "../../stiller/duz-vektor/gece";
import { KoyDis, Mutfak } from "../../stiller/duz-vektor/gunduz";
import { SeriVideo } from "./SeriVideo";

const hizli = (t: number) => firla(Math.min(1, t * 4.5));

export const cekimler1 = (O: Record<string, number>): Cekim[] => [
  // 1 · kanca: yüzde açılan gözler, kamera hızla geri çekilir (ilk 0,5 sn büyük hareket)
  { bas: 0, k0: { s: 2.7, cx: 540, cy: 640 }, k1: { s: 1.25, cx: 540, cy: 820 }, kEgri: hizli,
    flas: (lf) => interpolate(lf, [0, 6], [0.35, 0], kenet),
    ciz: (lf) => (
      <YatakUst f={lf} lamba={1} ay={0.2} ifade={lf >= O["goz-acilir"] - 4 ? "dehset" : "korku"} acik={interpolate(lf, [0, O["goz-acilir"]], [0.45, 1.25], kenet)}
        kolTitre={lf > O.kimilda && lf < O.kimilda + 30 ? 1 : 0} kb={{ gor: 0.35, netlik: 0, goz: 0, y: 860 }} basinc={0.6} nefes={0.3} />
    ) },
  // 2 · geçmiş: köy, gün batımı, dolmuş gelir, kamera eve kayar, babaanne kapıda
  { bas: O.gecmis, gecis: "flas", k0: { s: 1.15, cx: 420, cy: 1250 }, k1: { s: 1.3, cx: 760, cy: 1200 },
    ciz: (lf, f) => (
      <KoyDis f={f} dolmusX={interpolate(f, [O.gecmis, O.dolmus + 20, O.ev + 10, O.ev + 60], [1200, 120, 120, -700], kenet)}
        sen={ilerle(f, O.ev, O.ev + 10)} senX={interpolate(f, [O.ev, O["kapi-babaanne"] + 60], [380, 560], kenet)}
        kapiAcik={ilerle(f, O["kapi-babaanne"], O["kapi-babaanne"] + 14)} babaanne={ilerle(f, O["kapi-babaanne"] + 6, O["kapi-babaanne"] + 16)}
        px={interpolate(f, [O.gecmis, O.sarilma], [0, -40], kenet)} />
    ) },
  // 3 · sarılma ve çorba
  { bas: O.sarilma - 26, gecis: "cozul", k0: { s: 1.1, cx: 540, cy: 1250 }, k1: { s: 1.22, cx: 520, cy: 1290 },
    ciz: (lf, f) => (
      <Mutfak f={f} babaanneIfade="gulumse" senIfade="gulumse" sarilma={ilerle(f, O.sarilma, O.sarilma + 14, firla) * (1 - ilerle(f, O.corba - 12, O.corba))}
        corba={ilerle(f, O.corba, O.corba + 14, firla)} babaanneKonus={f > O.corba ? 0.4 : 0} />
    ) },
  // 4 · oda: babaanne odayı gösterir
  { bas: O["oda-kapi"] - 20, gecis: "flas", k0: { s: 1.0, cx: 540, cy: 1200 }, k1: { s: 1.08, cx: 600, cy: 1210 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={1} ay={0} ayakta={{ babaanne: 1, sen: 1 }} /> },
  // 5 · dolaba kayış
  { bas: O.dolap, k0: { s: 1.08, cx: 600, cy: 1210 }, k1: { s: 1.6, cx: 250, cy: 820 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={1} ay={0} ayakta={{ babaanne: 1, sen: 1 }} aynaParla={ilerle(f, O["ayna-parla"], O["ayna-parla"] + 8) * (1 - ilerle(f, O["ayna-parla"] + 8, O["ayna-parla"] + 24))} /> },
  // 6 · ayna yatağa bakıyor
  { bas: O["ayna-yatak"], k0: { s: 1.6, cx: 250, cy: 820 }, k1: { s: 2.3, cx: 250, cy: 860 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={1} ay={0} ayna="yatak" ifade="normal" /> },
  // 7 · ışık söner
  { bas: O["isik-sonar"] - 10, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.1, cx: 540, cy: 920 },
    ciz: (lf, f) => <DugmeYakin f={f} durum={f < O["isik-sonar"] ? 1 : 0} bas={ilerle(f, O["isik-sonar"] - 8, O["isik-sonar"]) * (1 - ilerle(f, O["isik-sonar"] + 6, O["isik-sonar"] + 16))} /> },
  // 8 · gece, oda sessiz
  { bas: O["isik-sonar"] + 22, gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 1150 }, k1: { s: 1.2, cx: 700, cy: 1250 },
    ciz: (lf, f) => <OdaGenis f={f} lamba={0} ay={1} yatakDolu ifade="uyku" ayna="yatak" /> },
  // 9 · saat
  { bas: O.saat, k0: { s: 1.0, cx: 540, cy: 900 }, k1: { s: 1.25, cx: 540, cy: 800 },
    ciz: (lf, f) => <SaatYakin f={f} saat={2} ay={1} /> },
  // 10 · ağırlık çöker (yukarıdan)
  { bas: O.agirlik - 14, gecis: "cozul", k0: { s: 1.15, cx: 540, cy: 760 }, k1: { s: 1.3, cx: 540, cy: 700 },
    sarsinti: (lf) => interpolate(lf, [14, 18, 34], [0, 0.9, 0], kenet),
    ciz: (lf, f) => (
      <YatakUst f={f} lamba={0} ay={1} ifade={f >= O.agirlik ? "korku" : "uyku"} nefes={f >= O.agirlik ? 0.3 : 1}
        kb={{ gor: ilerle(f, O.agirlik - 6, O.agirlik), netlik: interpolate(f, [O.oturmus, O.oturmus + 20], [0, 0.4], kenet), goz: 0,
          y: interpolate(ilerle(f, O.agirlik - 8, O.agirlik + 2, sert), [0, 1], [-500, 860]) + (f > O.oturmus ? Math.sin(f * 0.15) * 8 : 0) }}
        basinc={ilerle(f, O.agirlik, O.agirlik + 6)} />
    ) },
  // 11 · bağırmak istiyorsun (yüz yakın)
  { bas: O.bagirma, k0: { s: 2.4, cx: 540, cy: 620 }, k1: { s: 2.8, cx: 540, cy: 600 },
    sarsinti: (lf) => (lf + O.bagirma > O["ses-yok"] ? 0.25 : 0.08),
    ciz: (lf, f) => <YatakUst f={f} lamba={0} ay={1} ifade="dehset" nefes={0.2} kb={{ gor: 1, netlik: 0.4, goz: 0, y: 860 }} basinc={1} /> },
  // 12 · parmak bile oynamıyor
  { bas: O.parmak, k0: { s: 1.1, cx: 540, cy: 1000 }, k1: { s: 1.35, cx: 600, cy: 1050 },
    ciz: (lf, f) => <ElYakin f={f} titre={1} parmak={0} ay={1} lamba={0} /> },
  // 13 · gözler aynayı buluyor
  { bas: O["goz-kayar"] - 10, k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.15, cx: 540, cy: 960 },
    ciz: (lf, f) => <GozYakin f={f} acik={1.15} ifade="korku" bak={{ x: -ilerle(f, O["goz-kayar"], O["goz-kayar"] + 8), y: 0 }} ay={1} lamba={0} /> },
  // 14 · ayna: yatak... ve göğsündeki şey
  { bas: O["ayna-yakin"], gecis: "cozul", k0: { s: 1.0, cx: 540, cy: 960 }, k1: { s: 1.35, cx: 540, cy: 900 },
    ciz: (lf, f) => (
      <AynaYakin f={f} kb={ilerle(f, O["kara-sey"] - 4, O["kara-sey"] + 10) * (0.85 + 0.15 * Math.sin(f * 0.6))} kbGoz={ilerle(f, O.bakiyor, O.bakiyor + 10)}
        kbBak={ilerle(f, O.bakiyor, O.bakiyor + 20)} />
    ) },
  // 15 · soru: göz göze
  { bas: O.soru, k0: { s: 1.35, cx: 540, cy: 900 }, k1: { s: 2.1, cx: 560, cy: 780 },
    ciz: (lf, f) => <AynaYakin f={f} kb={1} kbGoz={f > O["oda-son"] && f < O["oda-son"] + 6 ? 0.1 : 1} kbBak={1} /> },
];

export const Part1: React.FC<{ temiz?: boolean }> = ({ temiz }) => <SeriVideo bolum={bolum} zaman={zaman} cekimler={cekimler1} temiz={temiz} />;
export const PART1_SURE = zaman.toplam;
