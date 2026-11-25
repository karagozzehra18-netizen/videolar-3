import React from "react";
import { Img, staticFile } from "remotion";
import { FILIGRAN } from "./yerlesim";

export const Filigran: React.FC<{ gorunur: boolean }> = ({ gorunur }) =>
  gorunur ? (
    <Img src={staticFile("marka/filigran-video.png")} style={{ position: "absolute", right: FILIGRAN.sag, top: FILIGRAN.ust,
      height: FILIGRAN.h, opacity: FILIGRAN.opaklik }} />
  ) : null;
