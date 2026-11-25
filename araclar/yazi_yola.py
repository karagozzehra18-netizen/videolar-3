#!/usr/bin/env python3
"""
yazi_yola.py — Bir yazıyı fonttan SVG <path> şekline çevirir (logoda canlı <text> olmasın diye).

Kullanım:
  python3 araclar/yazi_yola.py --font marka/fontlar/CormorantGaramond[wght].ttf --wght 600 \
      --yazi "DUYMA SAKIN" --boyut 100 --aralik 0.18 [--x 0 --y 0] [--json]
Çıktı: path d değeri (stdout). --json ile {"d":..., "genislik":..., "glifler":[{harf,x,genislik}]} verir.
  --aralik: harf aralığı, em cinsinden (0.18 = %18 em).
  --y: taban çizgisi (baseline) konumu. SVG y ekseni aşağı doğru; çeviri otomatik yapılır.
Not: Türkçe büyük harf için yazıyı önceden büyük harfe çevirin (İ, I, Ş, Ğ...).
"""
import argparse, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib import instancer

def yola(font_yolu, yazi, boyut, aralik=0.0, x0=0.0, y0=0.0, wght=None):
    f = TTFont(font_yolu)
    if 'fvar' in f and wght is not None:
        f = instancer.instantiateVariableFont(f, {"wght": wght})
    upm = f['head'].unitsPerEm
    olcek = boyut / upm
    cmap = f.getBestCmap(); gs = f.getGlyphSet(); hmtx = f['hmtx']
    pen = SVGPathPen(gs)
    x = x0; glifler = []
    for i, h in enumerate(yazi):
        ad = cmap.get(ord(h))
        if ad is None:
            raise SystemExit(f"Fontta '{h}' glifi yok")
        adv = hmtx[ad][0]
        tp = TransformPen(pen, (olcek, 0, 0, -olcek, x, y0))
        gs[ad].draw(tp)
        glifler.append({"harf": h, "x": round(x, 2), "genislik": round(adv * olcek, 2)})
        x += adv * olcek + (aralik * boyut if i < len(yazi) - 1 else 0)
    return pen.getCommands(), x - x0, glifler

if __name__ == "__main__":
    a = argparse.ArgumentParser()
    a.add_argument("--font", required=True); a.add_argument("--yazi", required=True)
    a.add_argument("--boyut", type=float, default=100); a.add_argument("--aralik", type=float, default=0)
    a.add_argument("--x", type=float, default=0); a.add_argument("--y", type=float, default=0)
    a.add_argument("--wght", type=float); a.add_argument("--json", action="store_true")
    o = a.parse_args()
    d, gen, gl = yola(o.font, o.yazi, o.boyut, o.aralik, o.x, o.y, o.wght)
    print(json.dumps({"d": d, "genislik": round(gen, 2), "glifler": gl}, ensure_ascii=False) if o.json else d)
