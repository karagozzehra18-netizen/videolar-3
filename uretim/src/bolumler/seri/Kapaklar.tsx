// Karabasan serisi kapakları (v2): her part için özel kurulmuş, net kapak sahnesi.
import React from "react";
import { KapakSeri } from "../../marka/KapakSeri";
import { AynaYakin, BabaanneOda, KapiKolu, YastikMuska, YatakUst } from "../../stiller/duz-vektor/gece";
import b1 from "../../../../bolumler/seri-karabasan/part1/bolum.json";
import b2 from "../../../../bolumler/seri-karabasan/part2/bolum.json";
import b3 from "../../../../bolumler/seri-karabasan/part3/bolum.json";
import b4 from "../../../../bolumler/seri-karabasan/part4/bolum.json";
import b5 from "../../../../bolumler/seri-karabasan/part5/bolum.json";

const ORTAK = { seri: "Karabasan", toplam: 5 };

export const KAPAKLAR: { id: string; C: React.FC }[] = [
  { id: "karabasan-p1-kapak2", C: () => (
    <KapakSeri {...ORTAK} part={1} satir1={b1.kapak.satir1} satir2={b1.kapak.satir2} renk={["#3D3A7A", "#15163A"]} vurgu="#F4BE4F"
      gorus={{ x: 30, y: 250, w: 1020, h: 1020 }} sahne={<AynaYakin f={40} kb={1} kbGoz={1} kbBak={1} ay={0.6} />} />
  ) },
  { id: "karabasan-p2-kapak2", C: () => (
    <KapakSeri {...ORTAK} part={2} satir1={b2.kapak.satir1} satir2={b2.kapak.satir2} renk={["#1F5B5A", "#0C2526"]} vurgu="#F4BE4F"
      gorus={{ x: 120, y: 260, w: 840, h: 900 }} sahne={<YatakUst f={40} lamba={1} ay={0.3} ifade="korku" acik={1.15} bak={{ x: 1, y: -0.4 }} muska={1} />} />
  ) },
  { id: "karabasan-p3-kapak2", C: () => (
    <KapakSeri {...ORTAK} part={3} satir1={b3.kapak.satir1} satir2={b3.kapak.satir2} renk={["#6B2B3A", "#2A0E16"]} vurgu="#F6C2A2"
      gorus={{ x: 290, y: 150, w: 640, h: 640 }} sahne={<BabaanneOda f={40} golge={1} kol={1} bas={1} goz={1} />} />
  ) },
  { id: "karabasan-p4-kapak2", C: () => (
    <KapakSeri {...ORTAK} part={4} satir1={b4.kapak.satir1} satir2={b4.kapak.satir2} renk={["#22305E", "#0B1026"]} vurgu="#E8573F"
      gorus={{ x: 160, y: 300, w: 760, h: 760 }} sahne={<YatakUst f={40} lamba={0.35} ay={0.8} ifade="dehset" basinc={1} kb={{ gor: 1, netlik: 1, goz: 1.2, y: 780 }} />} />
  ) },
  { id: "karabasan-p5-kapak2", C: () => (
    <KapakSeri {...ORTAK} part={5} satir1={b5.kapak.satir1} satir2={b5.kapak.satir2} renk={["#4A2A5E", "#1A0D24"]} vurgu="#F4BE4F"
      gorus={{ x: 100, y: 380, w: 980, h: 900 }} sahne={<YastikMuska f={40} kalk={1} muska={1} parla={0.8} parmak={0.92} lamba={0.35} ay={0.3} />} />
  ) },
];
