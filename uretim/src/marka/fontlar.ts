// Marka fontları (OFL): Fraunces (başlık, kapak, bitiş) ve Inter (altyazı, üst bant).
import { continueRender, delayRender, staticFile } from "remotion";

const yukle = (ad: string, dosya: string) => {
  if (typeof document === "undefined") return;
  const h = delayRender(`font ${ad}`);
  const ff = new FontFace(ad, `url(${staticFile(dosya)})`, { weight: "100 900" });
  ff.load().then((f) => { (document.fonts as unknown as { add: (x: FontFace) => void }).add(f); continueRender(h); }).catch((e) => { console.error(e); continueRender(h); });
};
yukle("Fraunces", "fontlar/Fraunces[SOFT,WONK,opsz,wght].ttf");
yukle("Inter", "fontlar/Inter[opsz,wght].ttf");

export const FONT = { baslik: "Fraunces, serif", metin: "Inter, sans-serif" };
