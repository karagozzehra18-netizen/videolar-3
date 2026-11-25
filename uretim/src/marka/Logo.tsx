// Rozet logo (marka/secili/logo.svg ile aynı yollar; tek kaynak marka/logo/v6/uret.py). dikis 0→1: krem dikişler sırayla çizilir.
import React from "react";
import { RENK } from "./yerlesim";

const DIKIS = [
  { d: "M420 326 C 427 370 414 420 422 478", w: 12, uz: 160 },
  { d: "M392 350 L448 344", w: 14, uz: 60 },
  { d: "M390 384 L446 378", w: 14, uz: 60 },
  { d: "M392 418 L448 412", w: 14, uz: 60 },
  { d: "M394 452 L450 446", w: 14, uz: 60 },
];

export const Logo: React.FC<{ boyut: number; dikis?: number }> = ({ boyut, dikis = 1 }) => (
  <svg width={boyut} height={boyut} viewBox="0 0 512 512">
    <circle cx="256" cy="256" r="252" fill={RENK.krem} />
    <circle cx="256" cy="256" r="246" fill="none" stroke={RENK.lacivert} strokeWidth="4" />
    <circle cx="256" cy="256" r="206" fill={RENK.mercan} />
    <g transform="translate(262 258) scale(0.58) translate(-448 -405)">
      <g fill="none" stroke={RENK.lacivert} strokeLinecap="round" strokeLinejoin="round">
        <path d="M318 250 C 400 150 590 170 590 330 C 590 420 530 455 512 510 C 498 552 505 612 452 640 C 400 666 350 630 352 585" strokeWidth="58" />
        <path d="M392 318 C 440 268 520 300 510 360 C 503 405 458 418 452 470" strokeWidth="40" />
        <path d="M330 402 C 302 420 306 464 338 476" strokeWidth="40" />
      </g>
      <g stroke={RENK.krem} strokeLinecap="round" fill="none">
        {DIKIS.map((s, i) => {
          const t = Math.max(0, Math.min(1, dikis * DIKIS.length - i));
          return t > 0 ? <path key={i} d={s.d} strokeWidth={s.w} strokeDasharray={s.uz} strokeDashoffset={s.uz * (1 - t)} /> : null;
        })}
      </g>
    </g>
  </svg>
);
