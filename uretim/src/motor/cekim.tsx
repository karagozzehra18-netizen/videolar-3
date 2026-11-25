// Çekim listesi sistemi: bir video, olaylara (zaman.json) bağlı çekimlerden oluşur.
// Her çekim: başlangıç karesi, çizim (yerel kare lf ile), kamera başlangıç→bitiş kadrajı (sürekli yavaş hareket),
// geçiş (kesme | cozul | flas | savur), ışık/sarsıntı/ton fonksiyonları. Görünüş stil motorunda, zamanlama burada.
import React from "react";
import { interpolate } from "remotion";
import { ilerle, kenet, yumusak } from "./yardimci";

export type Kadraj = { s: number; cx: number; cy: number };
export type Gecis = "kesme" | "cozul" | "flas" | "savur";
export type Cekim = {
  bas: number;
  ciz: (lf: number, f: number) => React.ReactNode;
  k0?: Kadraj; k1?: Kadraj; kEgri?: (t: number) => number;
  gecis?: Gecis;
  isik?: (lf: number) => number; sarsinti?: (lf: number) => number; flas?: (lf: number) => number;
};

export const TAM: Kadraj = { s: 1, cx: 540, cy: 960 };

export const kameraHesap = (k: Kadraj) => ({ olcek: k.s, x: k.s * (540 - k.cx), y: k.s * (960 - k.cy) });

export const aktifCekim = (cekimler: Cekim[], f: number) => {
  let i = 0;
  for (let k = 0; k < cekimler.length; k++) if (cekimler[k].bas <= f) i = k;
  return i;
};

/** Çekimin kamerasını ve geçiş değerlerini hesaplar. */
export const cekimDurumu = (cekimler: Cekim[], i: number, f: number, son: number) => {
  const c = cekimler[i];
  const bitis = i + 1 < cekimler.length ? cekimler[i + 1].bas : son;
  const lf = f - c.bas;
  const t = ilerle(f, c.bas, bitis, c.kEgri ?? yumusak);
  const a = c.k0 ?? TAM, b = c.k1 ?? a;
  const kadraj = { s: a.s + (b.s - a.s) * t, cx: a.cx + (b.cx - a.cx) * t, cy: a.cy + (b.cy - a.cy) * t };
  const g = c.gecis ?? "kesme";
  const flas = (g === "flas" ? interpolate(lf, [0, 2, 8], [0.9, 0.7, 0], kenet) : 0) + (c.flas?.(lf) ?? 0);
  const savur = g === "savur" ? interpolate(lf, [0, 8], [-260, 0], { ...kenet, easing: yumusak }) : 0;
  const cozul = g === "cozul" ? interpolate(lf, [0, 10], [0, 1], kenet) : 1;
  return { c, lf, kadraj, flas, savur, cozul, isik: c.isik?.(lf) ?? 1, sarsinti: c.sarsinti?.(lf) ?? 0 };
};
