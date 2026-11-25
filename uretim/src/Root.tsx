import React from "react";
import { Composition, Still } from "remotion";
import "./marka/fontlar";
import { B001 } from "./bolumler/b001/Video";
import { DVDeneme } from "./stiller/duz-vektor/Deneme";
import { Part1, PART1_SURE } from "./bolumler/seri/Part1";
import { Part2, PART2_SURE } from "./bolumler/seri/Part2";
import { Part3, PART3_SURE } from "./bolumler/seri/Part3";
import { Part4, PART4_SURE } from "./bolumler/seri/Part4";
import { Part5, PART5_SURE } from "./bolumler/seri/Part5";
import s1 from "../../bolumler/seri-karabasan/part1/bolum.json";
import s2 from "../../bolumler/seri-karabasan/part2/bolum.json";
import s3 from "../../bolumler/seri-karabasan/part3/bolum.json";
import s4 from "../../bolumler/seri-karabasan/part4/bolum.json";
import s5 from "../../bolumler/seri-karabasan/part5/bolum.json";
const SERI = [[Part1, PART1_SURE, s1], [Part2, PART2_SURE, s2], [Part3, PART3_SURE, s3], [Part4, PART4_SURE, s4], [Part5, PART5_SURE, s5]] as const;
import { Kapak, type KapakProps } from "./marka/Kapak";
import z001 from "../../bolumler/001-karabasan/zaman.json";
import b001 from "../../bolumler/001-karabasan/bolum.json";

// Her bölüm iki kayıt: video (b<no>) ve kapak (k<no>). Yeni bölümde buraya iki satır eklenir.
export const Root: React.FC = () => (
  <>
    {SERI.map(([C, sure, b], i) => (
      <React.Fragment key={i}>
        <Composition id={`karabasan-p${i + 1}`} component={C as React.FC<{ temiz?: boolean }>} durationInFrames={sure} fps={30} width={1080} height={1920} />
        <Still id={`karabasan-p${i + 1}-kapak`} component={Kapak} width={1080} height={1920}
          defaultProps={{ zemin: `bolumler/seri-karabasan/part${i + 1}/cikti/kapak-zemin.png`, ...b.kapak, no: i + 1 } as KapakProps} />
      </React.Fragment>
    ))}
    <Composition id="dv-deneme" component={DVDeneme} durationInFrames={60} fps={30} width={1080} height={1920} />
    <Composition id="b001" component={B001} durationInFrames={z001.toplam} fps={30} width={1080} height={1920} />
    <Still id="k001" component={Kapak} width={1080} height={1920}
      defaultProps={{ zemin: "bolumler/001-karabasan/cikti/kapak-zemin.png", ...b001.kapak, no: b001.no } as KapakProps} />
  </>
);
