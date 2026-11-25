// Bütün stillerin ortak küçük matematiği. Deterministik: Math.random() ve Date YOK.
import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const kenet = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
/** 0..1 arası yumuşak gürültü (t saniye ya da kare/ölçek). */
export const gurultu = (t: number, tohum = 0) => {
  const i = Math.floor(t);
  const u = t - i;
  const k = u * u * (3 - 2 * u);
  return hash(i + tohum * 57) * (1 - k) + hash(i + 1 + tohum * 57) * k;
};
/** -1..1 arası, iki frekanslı el titremesi. */
export const titreme = (f: number, tohum: number) =>
  (gurultu(f * 0.07, tohum) - 0.5) * 1.4 + (gurultu(f * 0.31, tohum + 9) - 0.5) * 0.6;

export const yumusak = Easing.bezier(0.45, 0, 0.2, 1);
export const firla = Easing.bezier(0.2, 0.9, 0.25, 1.15); // hafif aşan (overshoot)
export const sert = Easing.bezier(0.7, 0, 0.84, 0);

/** a karesinden b karesine 0→1, kenetli, istenen eğriyle. */
export const ilerle = (f: number, a: number, b: number, egri = yumusak) =>
  interpolate(f, [a, Math.max(a + 1, b)], [0, 1], { ...kenet, easing: egri });

export const karistir = (a: number, b: number, t: number) => a + (b - a) * t;

/** Basamaklı zaman: el yapımı ortamlar "ikişer/üçer" oynar. adim=1 → akıcı. */
export const basamak = (f: number, adim: number) => (adim <= 1 ? f : Math.floor(f / adim) * adim);
