// Seri partlarının ortak iskeleti: çekim listesi → stil sahnesi + başlık kartı + filigran + ekran ortası altyazı + bitiş.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Altyazi, type AltyaziParca } from "../../marka/Altyazi";
import { BitisEkrani } from "../../marka/BitisEkrani";
import { Filigran } from "../../marka/Filigran";
import { UstBant } from "../../marka/UstBant";
import { aktifCekim, cekimDurumu, kameraHesap, type Cekim } from "../../motor/cekim";
import { DVSahne } from "../../stiller/duz-vektor/motor";

export type BolumVeri = { bant_baslik: string; kart_kategori?: string; kapak: { etiket: string }; bitis?: { soru?: string; vurgu?: string; devam?: string } };
export type ZamanVeri = { bitis: number; toplam: number; olaylar: Record<string, number>; altyazi: unknown[] };

const CekimCiz: React.FC<{ cekimler: Cekim[]; i: number; f: number; son: number }> = ({ cekimler, i, f, son }) => {
  const d = cekimDurumu(cekimler, i, f, son);
  const k = kameraHesap(d.kadraj);
  return (
    <AbsoluteFill style={{ transform: `translateX(${d.savur}px)` }}>
      <DVSahne f={f} isik={d.isik} kamera={k} sarsinti={d.sarsinti} flas={d.flas}>{d.c.ciz(d.lf, f)}</DVSahne>
    </AbsoluteFill>
  );
};

export const SeriVideo: React.FC<{ bolum: BolumVeri; zaman: ZamanVeri; cekimler: (O: Record<string, number>) => Cekim[]; temiz?: boolean }> = ({
  bolum, zaman, cekimler, temiz = false,
}) => {
  const gercek = useCurrentFrame();
  const bitis = zaman.bitis;
  const liste = React.useMemo(() => cekimler(zaman.olaylar), [cekimler, zaman.olaylar]);
  const son = <BitisEkrani f={gercek - bitis} soru={bolum.bitis?.soru} vurgu={bolum.bitis?.vurgu} devam={bolum.bitis?.devam} />;
  if (gercek >= bitis + 6) return <AbsoluteFill>{son}</AbsoluteFill>;
  const f = Math.min(gercek, bitis - 1);
  const i = aktifCekim(liste, f);
  const d = cekimDurumu(liste, i, f, bitis);
  return (
    <AbsoluteFill>
      {d.c.gecis === "cozul" && d.lf < 10 && i > 0 ? <CekimCiz cekimler={liste} i={i - 1} f={f} son={bitis} /> : null}
      <AbsoluteFill style={{ opacity: d.cozul }}><CekimCiz cekimler={liste} i={i} f={f} son={bitis} /></AbsoluteFill>
      {temiz ? null : (
        <>
          <UstBant f={f} baslik={bolum.bant_baslik} kategori={bolum.kart_kategori ?? bolum.kapak.etiket} bitisKaresi={bitis} />
          <Filigran gorunur={f < bitis} f={f} />
          <Altyazi f={f} parcalar={zaman.altyazi as AltyaziParca[]} />
        </>
      )}
      {gercek >= bitis ? son : null}
    </AbsoluteFill>
  );
};
