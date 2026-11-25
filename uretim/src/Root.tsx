import React from "react";
import { Composition, Still } from "remotion";
import "./marka/fontlar";
import { B001 } from "./bolumler/b001/Video";
import { Kapak, type KapakProps } from "./marka/Kapak";
import z001 from "../../bolumler/001-karabasan/zaman.json";
import b001 from "../../bolumler/001-karabasan/bolum.json";

// Her bölüm iki kayıt: video (b<no>) ve kapak (k<no>). Yeni bölümde buraya iki satır eklenir.
export const Root: React.FC = () => (
  <>
    <Composition id="b001" component={B001} durationInFrames={z001.toplam} fps={30} width={1080} height={1920} />
    <Still id="k001" component={Kapak} width={1080} height={1920}
      defaultProps={{ zemin: "bolumler/001-karabasan/cikti/kapak-zemin.png", ...b001.kapak, no: b001.no } as KapakProps} />
  </>
);
