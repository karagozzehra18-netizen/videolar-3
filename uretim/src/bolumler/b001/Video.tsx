// 001 Karabasan — sahne kodu. Bütün zamanlama zaman.json'dan (araclar/bolum_hazirla.py); burada sabit saniye yok.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import zaman from "../../../../bolumler/001-karabasan/zaman.json";
import bolum from "../../../../bolumler/001-karabasan/bolum.json";
import { Altyazi, type AltyaziParca } from "../../marka/Altyazi";
import { BitisEkrani } from "../../marka/BitisEkrani";
import { Filigran } from "../../marka/Filigran";
import { UstBant } from "../../marka/UstBant";
import { firla, gurultu, ilerle, kenet, sert, titreme, yumusak } from "../../motor/yardimci";
import { GO, Kukla, golgeOyunu as M } from "../../stiller/golge-oyunu";
import * as S from "./sekiller";

const O = zaman.olaylar as Record<string, number>;
const CX = 500, CY = 559; // yerel sahnenin merkezi
// Yerel sahne (x 0..1000, y -330..1448) tam ekrana: ölçek 1,08, y +330. Kamera ekran merkezinde (540, 960).
const TABAN = 1.08, ODX = 0, ODY = 330;
const ekran = (px: number, py: number) => ({ x: TABAN * (px + ODX), y: TABAN * (py + ODY) });

type Kadraj = { k: number; s: number; px: number; py: number; uz: number; egri?: (t: number) => number };
// Kamera planı: her satır bir olayda başlar, uz karede hedefe varır.
const KADRAJ: Kadraj[] = [
  { k: 0, s: 1.75, px: S.YUZ.x + 30, py: S.YUZ.y - 30, uz: 1 },
  { k: O["goz-acilir"] + 2, s: 1.0, px: CX, py: CY, uz: 16, egri: firla },
  { k: O["agirlik-duser"], s: 1.1, px: 430, py: 560, uz: 12 },
  { k: O["karabasan-acilir"], s: 1.2, px: 400, py: 520, uz: 50 },
  { k: O["lamba-gecis"] + 8, s: 1.06, px: 420, py: 560, uz: 20 },
  { k: O["pano-gelir"], s: 1.0, px: CX, py: CY, uz: 14 },
  { k: O["goz-kayar"], s: 1.12, px: 360, py: 480, uz: 24 },
  { k: O["kapi-acilir"] - 4, s: 1.1, px: 470, py: 430, uz: 30 },
  { k: O["golge-yaklasir"], s: 1.0, px: 430, py: 520, uz: 30 },
  { k: O["kamera-yuze"], s: 1.75, px: S.YUZ.x + 30, py: S.YUZ.y - 30, uz: Math.max(12, O["goz-acilir-son"] - O["kamera-yuze"]) },
];
const kamera = (f: number) => {
  let s = KADRAJ[0].s, px = KADRAJ[0].px, py = KADRAJ[0].py;
  for (const k of KADRAJ) {
    if (f < k.k) break;
    const t = ilerle(f, k.k, k.k + k.uz, k.egri ?? yumusak);
    s = s + (k.s - s) * t; px = px + (k.px - px) * t; py = py + (k.py - py) * t;
  }
  const b = ekran(px, py);
  return { olcek: s, x: s * (540 - b.x), y: s * (960 - b.y) };
};

export const B001: React.FC<{ temiz?: boolean }> = ({ temiz = false }) => {
  const gercek = useCurrentFrame();
  const bitis = zaman.bitis;
  const bitisEkrani = gercek >= bitis ? <BitisEkrani f={gercek - bitis} soru={bolum.bitis?.soru} vurgu={bolum.bitis?.vurgu} /> : null;
  if (gercek >= bitis + 6) return <AbsoluteFill>{bitisEkrani}</AbsoluteFill>;
  const f = Math.min(gercek, bitis - 1); // bitiş geçişinde son kare donar, kâğıt zemin üstüne açılır
  // --- ışık
  let isik = interpolate(f, [0, 10], [1.22, 1], kenet); // ilk kare: parlak flaş
  const lt = O["lamba-titrer"];
  if (f > lt && f < lt + 36) isik *= 1 - 0.28 * Math.abs(Math.sin((f - lt) * 0.9)) * (1 - (f - lt) / 36);
  isik *= M.gecis(f, O["lamba-gecis"], 26);
  isik *= interpolate(f, [O["pano-gider"], O["pano-gider"] + 10], [1, 0.9], kenet);
  // --- sarsıntı
  const sar = interpolate(f, [O["agirlik-duser"] + 4, O["agirlik-duser"] + 22], [0.9, 0], kenet)
    + interpolate(f, [O["pano-gider"], O["pano-gider"] + 12], [0.5, 0], kenet);

  // --- göz
  const goz1 = ilerle(f, Math.max(0, O["goz-acilir"] - 3), O["goz-acilir"] + 3, firla);
  const kapanma = ilerle(f, O["kamera-yuze"] - 10, O["kamera-yuze"] + 2); // son cümleden önce göz kapanır
  const goz2 = ilerle(f, O["goz-acilir-son"] - 2, O["goz-acilir-son"] + 4, firla);
  const kirp = f > O["pano-gider"] && f < O["pano-gider"] + 4 ? 0.2 : 1;
  const goz = Math.max(0.12, Math.min(1, Math.max(0.35, goz1) * (1 - kapanma) + goz2) * kirp);

  // --- kol titremesi
  const et = O["el-titrer"];
  const kolAci = f > et && f < et + 26 ? Math.sin((f - et) * 2.2) * 5 * (1 - (f - et) / 26) : titreme(f, 2) * 0.8;
  // --- nefes (göğüs inip kalkar; ağırlıktan sonra sığlaşır)
  const nefesHizi = f > O["nefes-daralir"] ? 0.32 : 0.12;
  const nefesGenlik = f > O["agirlik-duser"] ? 3 : 9;
  const gogus = Math.sin(f * nefesHizi) * nefesGenlik - (f > O["agirlik-duser"] + 4 && f < O["lamba-gecis"] + 13 ? 14 : 0);

  // --- karabasan
  const ad = O["agirlik-duser"];
  const dus = ilerle(f, ad - 8, ad + 4, sert);
  const kbY = interpolate(dus, [0, 1], [-420, 588]) + (f > ad + 4 ? Math.sin((f - ad) * 0.5) * 6 * Math.max(0, 1 - (f - ad - 4) / 18) : 0);
  const acil = ilerle(f, O["karabasan-acilir"] - 2, O["karabasan-acilir"] + 16, firla);
  const egil = ilerle(f, O["karabasan-egilir"], O["karabasan-egilir"] + 24);
  const tirman = ilerle(f, O["karabasan-tirmanir"], O["karabasan-tirmanir"] + 20, firla);
  const kbGor = f < ad - 8 ? 0 : interpolate(f, [O["lamba-gecis"] + 6, O["lamba-gecis"] + 14], [1, 0], kenet);
  const kbNefes = Math.sin(f * 0.18) * 0.02;

  // --- beyin, rüya
  const by = O["beyin-yanar"];
  const kalp = [0, 14, 28].reduce((a, k) => a + Math.exp(-Math.pow((f - by - k) / 3, 2)), 0);
  const beyin = f < by ? 0 : Math.min(1, 0.45 + kalp) * interpolate(f, [O["pano-gider"], O["pano-gider"] + 10], [1, 0], kenet);
  const ruya = ilerle(f, O["ruya-yukselir"] - 4, O["ruya-yukselir"] + 26, firla) * interpolate(f, [O["pano-gelir"], O["pano-gelir"] + 10], [1, 0], kenet);

  // --- pano
  const pg = ilerle(f, O["pano-gelir"], O["pano-gelir"] + 14, firla);
  const pd = ilerle(f, O["pano-gider"], O["pano-gider"] + 12, sert);
  const panoY = interpolate(pg, [0, 1], [1150, 150]) + pd * 1100;
  const sall = f > O["pano-sallanir"] ? Math.sin((f - O["pano-sallanir"]) * 0.7) * 3 * Math.max(0, 1 - (f - O["pano-sallanir"]) / 30) : 0;

  // --- kapı ve uzun gölge
  const ka = ilerle(f, O["kapi-acilir"], O["kapi-acilir"] + 40);
  const yak = ilerle(f, O["golge-yaklasir"], O["golge-yaklasir"] + 34);
  const ugGor = interpolate(f, [O["kapi-acilir"] + 8, O["kapi-acilir"] + 24], [0, 1], kenet) * interpolate(f, [O["kamera-yuze"] + 6, O["kamera-yuze"] + 20], [1, 0.0], kenet);
  const ugX = 500 + yak * -120 + titreme(f, 21) * 3;
  const ugOlcek = 1.35 - yak * 0.45;

  // --- gölge el (kanca ve son)
  const el1 = interpolate(f, [0, 22], [1, 0], kenet);
  const el2 = ilerle(f, O["kamera-yuze"] + 4, O["goz-acilir-son"] + 2);
  const elGor = Math.max(el1, el2);
  const elX = 372 + (1 - elGor) * 300 + titreme(f, 31) * 4;
  const elY = 440 - (1 - elGor) * 160;

  // --- alev
  const alevK = gurultu(f * 0.5, 5) + (f > lt && f < lt + 36 ? Math.sin(f * 1.3) * 0.8 : 0);

    return (
    <AbsoluteFill>
      <M.Sahne f={f} isik={isik} kamera={kamera(f)} sarsinti={sar}>
        <g transform={`scale(${TABAN}) translate(${ODX} ${ODY})`}>
        {/* tavan kirişi, raf, ayna (tam ekranın üst kısmı) */}
        <Kukla d={S.KIRIS} delik={S.KIRIS_OYUK} derinlik={0.2} ic={[{ d: S.KIRIS_OYUK, renk: GO.deri.hardal, opaklik: 0.5 }]} />
        <Kukla d={[S.RAF, S.TESTI, S.KASE]} derinlik={0.25} ic={[{ d: S.KASE_DESEN, renk: GO.deri.turkuaz, opaklik: 0.85 }, { d: "M150,-28 C146,-8 176,-8 172,-28 Z", renk: GO.deri.kirmizi, opaklik: 0.8 }]} />
        <Kukla d={S.AYNA} delik={S.AYNA_OYUK} derinlik={0.3} ic={[{ d: S.AYNA_OYUK, renk: GO.deri.gece, opaklik: 0.35 }]} tf={`rotate(${Math.sin(f * 0.04) * 1.5} 680 -236)`} />
        {/* arka katman (lambaya yakın, bulanık): pencere, kapı */}
        <Kukla d={S.PENCERE} delik={S.PENCERE_OYUK} derinlik={0.35} ic={[{ d: S.PENCERE_OYUK, renk: GO.deri.gece, opaklik: 0.55 }]} />
        <Kukla d={S.AY} derinlik={0.35} ic={[{ d: S.AY, renk: GO.deri.hardal, opaklik: 0.9 }]} tf={`translate(${Math.sin(f * 0.02) * 4} 0)`} />
        {/* pencere perdesi: içeri savrulur */}
        {(() => {
          const p = ilerle(f, O["perde-dalgalanir"], O["perde-dalgalanir"] + 14, firla);
          const dal = Math.sin(f * 0.21) * 10 * (0.4 + p);
          const kx = 330 - p * 120 - (p > 0 ? 0 : 0);
          return <Kukla d={`M330,150 L${kx},150 C${kx - 20 + dal},230 ${kx + 18 - dal},320 ${kx - 10 + dal * 1.4},404 L330,404 Z`}
            ic={[{ d: `M330,170 L${kx + 14},170 C${kx - 6 + dal},240 ${kx + 26 - dal},320 ${kx + 6 + dal * 1.4},390 L330,390 Z`, renk: GO.deri.mor, opaklik: 0.6 }]} derinlik={0.3} />;
        })()}
        <Kukla d={S.KAPI_CERCEVE} derinlik={0.3} />
        <g opacity={ugGor}>
          <Kukla d={[S.UZUN_GOLGE, S.UZUN_GOLGE_KOL]} derinlik={0.95 - yak * 0.7} tf={`translate(${ugX} ${556 + yak * 40}) scale(${ugOlcek})`} />
        </g>
        <Kukla d={S.KAPI_KANAT} delik={S.KAPI_KANAT_OYUK} derinlik={0.3} ic={[{ d: S.KAPI_KANAT_OYUK, renk: GO.deri.kirmizi, opaklik: 0.5 }]}
          tf={`translate(430 0) scale(${1 - ka * 0.86} 1) translate(-430 0)`} />
        <Kukla d={S.ZINCIR} derinlik={0.15} tf={`rotate(${Math.sin(f * 0.05) * 1.2} 868 0)`} />
        <g transform={`rotate(${Math.sin(f * 0.05) * 1.2} 868 0)`}>
          <Kukla d={S.ALEV(Math.sin(f * 0.4), alevK)} ic={[{ d: S.ALEV(Math.sin(f * 0.4), alevK), renk: GO.deri.hardal, opaklik: 0.95 }]} derinlik={0.1} />
          <Kukla d={S.LAMBA} derinlik={0.1} ic={[{ d: "M846,262 C846,252 890,252 890,262 C890,276 846,276 846,262 Z", renk: GO.deri.kirmizi, opaklik: 0.8 }]} />
        </g>
        {/* zemin ve karyola */}
        <Kukla d={S.ZEMIN} delik={S.KILIM_DESEN} ic={[{ d: S.KILIM, renk: GO.deri.kirmizi, opaklik: 0.55 }]} />
        <Kukla d={S.KARYOLA} delik={S.KARYOLA_OYUK} ic={[{ d: S.KARYOLA_OYUK, renk: GO.deri.hardal, opaklik: 0.6 }]} pimler={[[128, 778], [872, 778]]} />
        <Kukla d={S.YASTIK} ic={[{ d: S.YASTIK, renk: GO.deri.hardal, opaklik: 0.75 }]} />
        {/* beden */}
        <Kukla d={S.YORGAN(gogus)} delik={S.YORGAN_DESEN} ic={[{ d: S.YORGAN(gogus), renk: GO.deri.turkuaz, opaklik: 0.62 }]} />
        <Kukla d={S.KOL} tf={`rotate(${kolAci} ${S.OMUZ.x} ${S.OMUZ.y})`} pimler={[[S.OMUZ.x, S.OMUZ.y]]} />
        <Kukla d={[S.BAS, S.SAC]} delik={S.GOZ_ACIK(goz)} ic={[{ d: S.BEYIN, renk: GO.deri.turkuaz, opaklik: beyin * 0.95 }]} />
        <path d={S.GOZ_BEBEK(goz)} fill={GO.murekkep} transform={`translate(${-ilerle(f, O["goz-kayar"], O["goz-kayar"] + 6) * 6 * (1 - kapanma)} 0)`} />
        {beyin > 0 ? <ellipse cx={218} cy={608} rx={60 + kalp * 14} ry={46 + kalp * 10} fill="#7fe3d6" opacity={beyin * 0.25} /> : null}
        {/* felç kayışları: bedenin üstüne iner */}
        {(() => {
          const k = ilerle(f, O["bedene-kayis"] - 2, O["bedene-kayis"] + 10, firla) * interpolate(f, [O["pano-gelir"], O["pano-gelir"] + 8], [1, 0], kenet);
          return k > 0 ? [400, 560, 720].map((x, i) => (
            <Kukla key={i} d={`M${x - 22},${600 - (1 - k) * 260} L${x + 22},${600 - (1 - k) * 260} L${x + 26},${790} L${x - 18},${790} Z`}
              ic={[{ d: `M${x - 10},${640} L${x + 10},${640} L${x + 12},${760} L${x - 8},${760} Z`, renk: GO.deri.mor, opaklik: 0.8 }]}
              pimler={[[x, 610 - (1 - k) * 260], [x + 4, 780]]} opaklik={Math.min(1, k * 1.5)} />
          )) : null;
        })()}
        {/* nefes kıvrımları */}
        {[0, 1, 2].map((i) => {
          const p = ((f * (nefesHizi * 0.25) + i / 3) % 1);
          const kucul = f > O["nefes-daralir"] ? 0.55 : 1;
          return f > 4 && f < O["lamba-gecis"] ? (
            <path key={i} d={S.NEFES} transform={`translate(${276 + p * 30} ${540 - p * 90 * kucul}) scale(${(0.6 + p) * kucul})`}
              fill="none" stroke={GO.murekkep} strokeWidth={5} strokeLinecap="round" opacity={(1 - p) * 0.7} />
          ) : null;
        })}
        {/* rüya: ay ve yıldızlar çubuklarda yükselir */}
        {ruya > 0 ? (
          <g opacity={Math.min(1, ruya * 1.5)}>
            {[[560, 0, S.RUYA_AY, GO.deri.mor], [680, 1, S.YILDIZ(26), GO.deri.hardal], [460, 2, S.YILDIZ(18), GO.deri.hardal], [780, 3, S.YILDIZ(20), GO.deri.mor]].map(([x, i, d, r]) => {
              const yy = 700 - ruya * (260 + (i as number) * 40) + Math.sin(f * 0.08 + (i as number)) * 10;
              return <Kukla key={i as number} d={d as string} ic={[{ d: d as string, renk: r as string, opaklik: 0.9 }]}
                tf={`translate(${(x as number) + Math.sin(f * 0.05 + (i as number)) * 8} ${yy}) rotate(${Math.sin(f * 0.06 + (i as number)) * 8})`}
                cubuk={[0, 30, 0, 760 - yy]} />;
            })}
          </g>
        ) : null}
        {/* karabasan */}
        {kbGor > 0 ? (
          <g opacity={kbGor} transform={`translate(${470 - tirman * 70} ${kbY - tirman * 26}) scale(${0.72 + acil * 0.38 + kbNefes}) rotate(${-egil * 10})`}>
            <Kukla d={S.KB_KOL} tf={`rotate(${-70 + acil * 70 + Math.sin(f * 0.1) * 3} 0 0)`} pimler={[[0, 0]]} />
            <Kukla d={[S.KB_GOVDE, S.KB_SIRT_DIKEN]} />
            <g transform={`rotate(${egil * 18 - (1 - acil) * 30} -60 -120)`}>
              <Kukla d={S.KB_BAS} delik={acil > 0.3 ? S.KB_GOZLER : undefined} ic={acil > 0.3 ? [{ d: S.KB_GOZLER, renk: GO.deri.kirmizi, opaklik: 0.95 }] : []} pimler={[[-60, -120]]} />
            </g>
            <Kukla d={S.KB_KOL} tf={`scale(-1 1) rotate(${-60 + acil * 60 + Math.sin(f * 0.12) * 4} 0 0)`} />
          </g>
        ) : null}
        {/* gölge el (kanca/son) */}
        {elGor > 0.01 ? (
          <Kukla d={S.GOLGE_EL(elGor)} derinlik={0.25} tf={`translate(${elX} ${elY}) rotate(${128 + titreme(f, 41) * 4}) scale(0.85)`} cubuk={[-110, 2, -460, 10]} />
        ) : null}
        {/* yüz kişilik pano */}
        {f >= O["pano-gelir"] && f < O["pano-gider"] + 14 ? (
          <g transform={`translate(${150} ${panoY}) rotate(${sall} 350 0)`}>
            <Kukla d={S.PANO_DIS} delik={Array.from({ length: 100 }, (_, i) => { const p = S.PANO_KISI(i); return S.KISI(p.cx, p.cy, 16); }).join(" ")}
              ic={S.SEKIZ.map((n, j) => {
                const p = S.PANO_KISI(n);
                const t = interpolate(f, [O["sekiz-yanar"] + j * 3, O["sekiz-yanar"] + j * 3 + 2], [0, 1], kenet);
                return { d: S.KISI(p.cx, p.cy, 16), renk: GO.deri.kirmizi, opaklik: t * 0.95 };
              })} pimler={[[20, 20], [680, 20], [20, 680], [680, 680]]} cubuk={[350, 700, 350, 1100]} />
          </g>
        ) : null}
        </g>
      </M.Sahne>
      {temiz ? null : (
        <>
          <UstBant f={f} baslik={bolum.bant_baslik} kategori={bolum.kapak.etiket} bitisKaresi={bitis} />
          <Filigran gorunur={f < bitis} f={f} />
          <Altyazi f={f} parcalar={zaman.altyazi as AltyaziParca[]} />
        </>
      )}
      {bitisEkrani}
    </AbsoluteFill>
  );
};
