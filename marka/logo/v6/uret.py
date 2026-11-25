#!/usr/bin/env python3
"""
uret.py — v6: açık renkli, sade, düz renkli Duyma Sakın logoları + desenli banner + filigran.
Kullanım: python3 marka/logo/v6/uret.py
Çıktı (marka/logo/v6/): logo-a/b/c.svg (512), banner-a/b/c.svg (2560x1440), filigran-video-a/b/c.svg (+ .boyut)
PNG: node araclar/marka_render.js marka/logo/v6/logo-a.svg marka/logo/v6/render/logo-a-1024.png 1024 1024 --seffaf
"""
import math, os, sys, random
KOK = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(KOK, '..', '..', '..', 'araclar'))
from yazi_yola import yola

FONT = os.path.join(KOK, '..', '..', 'fontlar')
FRAUNCES = os.path.join(FONT, 'Fraunces[SOFT,WONK,opsz,wght].ttf')
INTER = os.path.join(FONT, 'Inter[opsz,wght].ttf')
R = dict(krem='#F7EEDC', kagit='#FBF6EC', lacivert='#22264A', mercan='#E8573F', hardal='#F4BE4F',
         lavanta='#C9C2E6', seftali='#F6C2A2', teal='#3F8077')

def svg(icerik, w=512, h=512, defs=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 {w} {h}">'
            f'{defs}{icerik}\n</svg>\n')

# --- Kulak geometrisi (800 birim; merkez ≈ 448,405) ---
DIS = "M318 250 C 400 150 590 170 590 330 C 590 420 530 455 512 510 C 498 552 505 612 452 640 C 400 666 350 630 352 585"
IC = "M392 318 C 440 268 520 300 510 360 C 503 405 458 418 452 470"
TR = "M330 402 C 302 420 306 464 338 476"
def kulak(renk, s=1.0):
    return (f'<g fill="none" stroke="{renk}" stroke-linecap="round" stroke-linejoin="round">'
            f'<path d="{DIS}" stroke-width="{58 * s:.0f}"/><path d="{IC}" stroke-width="{40 * s:.0f}"/><path d="{TR}" stroke-width="{40 * s:.0f}"/></g>')
def dikis(renk, s=1.0):
    return (f'<g stroke="{renk}" stroke-linecap="round" fill="none">'
            f'<path d="M420 326 C 427 370 414 420 422 478" stroke-width="{12 * s:.0f}"/>'
            + "".join(f'<line x1="{392 + i}" y1="{y}" x2="{448 + i}" y2="{y - 6}" stroke-width="{14 * s:.0f}"/>'
                      for i, y in ((0, 350), (-2, 384), (0, 418), (2, 452))) + '</g>')
def dalgalar(renk, s=1.0, sade=True):
    cx, cy = 330, 430; out = []
    yaylar = ((78, 148, 212, 1), (138, 142, 218, 2)) if sade else ((70, 150, 210, 2), (120, 144, 216, 3), (170, 140, 220, 4))
    for r, a1, a2, n in yaylar:
        gap = math.degrees((34 * s + 22) / r); adim = (a2 - a1 - gap * (n - 1)) / n; a = a1
        for _ in range(n):
            b = a + adim
            p = lambda t: (cx + r * math.cos(math.radians(t)), cy + r * math.sin(math.radians(t)))
            (x1, y1), (x2, y2) = p(a), p(b)
            out.append(f'<path d="M{x1:.1f} {y1:.1f} A{r} {r} 0 0 1 {x2:.1f} {y2:.1f}"/>'); a = b + gap
    return f'<g fill="none" stroke="{renk}" stroke-width="{(34 if sade else 26) * s:.0f}" stroke-linecap="round">{"".join(out)}</g>'

def rozet(disk, icerik):
    return (f'<circle cx="256" cy="256" r="252" fill="{R["krem"]}"/>'
            f'<circle cx="256" cy="256" r="246" fill="none" stroke="{R["lacivert"]}" stroke-width="4"/>'
            f'<circle cx="256" cy="256" r="206" fill="{disk}"/>{icerik}')

def yerlestir(icerik, cx=256, cy=256, olcek=0.5, mx=448, my=405):
    return f'<g transform="translate({cx} {cy}) scale({olcek}) translate({-mx} {-my})">{icerik}</g>'

def logo_a():  # mercan disk, lacivert kulak, krem dikiş
    return rozet(R['mercan'], yerlestir(kulak(R['lacivert']) + dikis(R['krem']), 262, 258, .58))

def logo_b():  # hardal disk, mercan dudak (belirgin yay), lacivert parmak hafif sağda
    cy = 286; yari = 132
    ust = (f"M{256 - yari} {cy} C {256 - 96} {cy - 44} {256 - 48} {cy - 64} {256 - 22} {cy - 50} "
           f"Q 256 {cy - 36} {256 + 22} {cy - 50} C {256 + 48} {cy - 64} {256 + 96} {cy - 44} {256 + yari} {cy} "
           f"C {256 + 60} {cy - 10} {256 - 60} {cy - 10} {256 - yari} {cy} Z")
    alt = f"M{256 - yari} {cy + 8} C {256 - 70} {cy + 4} {256 + 70} {cy + 4} {256 + yari} {cy + 8} C {256 + 70} {cy + 84} {256 - 70} {cy + 84} {256 - yari} {cy + 8} Z"
    px = 298
    bosluk = f'<rect x="{px - 26}" y="116" width="52" height="264" rx="26" fill="{R["hardal"]}"/>'
    parmak = f'<rect x="{px - 18}" y="124" width="36" height="248" rx="18" fill="{R["lacivert"]}"/>'
    return rozet(R['hardal'], f'<path d="{ust}" fill="{R["mercan"]}"/><path d="{alt}" fill="{R["mercan"]}"/>{bosluk}{parmak}')

def logo_c():  # krem-açık disk, lacivert kulak, mercan dalgalar ve dikiş
    return rozet(R['kagit'], f'<circle cx="256" cy="256" r="206" fill="none" stroke="{R["lacivert"]}" stroke-width="6"/>'
                 + yerlestir(dalgalar(R['mercan']) + kulak(R['lacivert']) + dikis(R['mercan']), 270, 258, .52, 430, 420))

LOGOLAR = {"a": logo_a, "b": logo_b, "c": logo_c}

# --- Banner: marka şekillerinden desen + kart ---
def desen(tohum=5):
    rnd = random.Random(tohum); o = [f'<rect width="2560" height="1440" fill="{R["kagit"]}"/>']
    renkler = [R['mercan'], R['hardal'], R['lavanta'], R['teal'], R['seftali'], R['lacivert']]
    # büyük yumuşak daireler
    for x, y, r, c in [(260, 260, 330, R['lavanta']), (2330, 1180, 360, R['seftali']), (2380, 180, 230, '#F9DFA6'), (180, 1260, 260, '#CFE3DC')]:
        o.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}" opacity=".55"/>')
    # ses dalgası grupları (kesik yaylar)
    for x, y, aci, c, s in [(360, 720, 0, R['mercan'], 1.9), (2200, 720, 180, R['teal'], 1.9), (900, 230, 160, R['hardal'], 1.4),
                            (1650, 1230, -20, R['lavanta'], 1.4), (2050, 300, 25, R['mercan'], 1.1), (560, 1180, -30, R['teal'], 1.1)]:
        o.append(f'<g transform="translate({x} {y}) rotate({aci}) scale({s}) translate(-330 -430)">{dalgalar(c, 1.0)}</g>')
    # dikiş şeritleri
    for x, y, aci, c in [(1180, 160, -8, R['lacivert']), (1300, 1290, 6, R['mercan']), (150, 300, 40, R['hardal']), (2150, 1150, -20, R['lavanta'])]:
        dikisler = "".join(f'<line x1="{i * 46}" y1="-16" x2="{i * 46 + 22}" y2="16" stroke="{c}" stroke-width="10" stroke-linecap="round"/>' for i in range(7))
        o.append(f'<g transform="translate({x} {y}) rotate({aci})"><line x1="-20" y1="0" x2="320" y2="0" stroke="{c}" stroke-width="6" stroke-linecap="round" opacity=".6"/>{dikisler}</g>')
    # nokta serpintisi
    for _ in range(70):
        x = rnd.uniform(20, 2540); y = rnd.uniform(20, 1420)
        if 470 < x < 2090 and 480 < y < 960:
            continue
        o.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{rnd.choice([6, 9, 12])}" fill="{rnd.choice(renkler)}" opacity=".85"/>')
    return "".join(o)

def ikon(tur, x, y, s, c):
    if tur == 'yt':
        return f'<g transform="translate({x} {y}) scale({s})"><rect x="0" y="6" width="52" height="38" rx="11" fill="{c}"/><path d="M21 16 L36 25 L21 34 Z" fill="{R["kagit"]}"/></g>'
    if tur == 'ig':
        return (f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke="{c}" stroke-width="5.5"><rect x="4" y="4" width="44" height="44" rx="13"/><circle cx="26" cy="26" r="10"/></g>'
                f'<circle cx="{x + 38 * s:.1f}" cy="{y + 14 * s:.1f}" r="{3.2 * s:.1f}" fill="{c}"/>')
    return (f'<g transform="translate({x} {y}) scale({s})"><path d="M26 4 L34 4 Q36 16 48 18 L48 26 Q40 26 34 21 L34 36 '
            f'A13 13 0 1 1 21 23 L21 31 A5.5 5.5 0 1 0 26 36 Z" fill="{c}"/></g>')

def banner(logo_ic):
    kx, ky, kw, kh = 527, 528, 1506, 383
    tx = kx + 380; sinir = kx + kw - 48
    def olc(o):
        return (yola(FRAUNCES, "Duyma Sakın", 120 * o, 0, 0, 0, 800)[1], yola(FRAUNCES, "Kulaklığını tak. Işığı kapatma.", 40 * o, .01, 0, 0, 700)[1],
                yola(FRAUNCES, "@duymasakin", 50 * o, 0, 0, 0, 800)[1], yola(INTER, "YouTube · Instagram · TikTok", 22 * o, .02, 0, 0, 600)[1])
    o_ = 1.0
    while True:
        ga, gs, gh, gp = olc(o_); ax = tx + max(ga, gs) + 54 * o_; sx = ax + 50 * o_; sag = sx + max(gh, gp, 260 * o_)
        if sag <= sinir or o_ < .5: break
        o_ -= .02
    p = lambda f, t, b, a, w: yola(f, t, b, a, 0, 0, w)[0]
    # "Duyma" lacivert, "Sakın" mercan
    d1, g1, _ = yola(FRAUNCES, "Duyma ", 120 * o_, 0, 0, 0, 800)
    d2 = p(FRAUNCES, "Sakın", 120 * o_, 0, 800)
    k = (f'<rect x="{kx + 12}" y="{ky + 14}" width="{kw}" height="{kh}" rx="44" fill="{R["lacivert"]}"/>'
         f'<rect x="{kx}" y="{ky}" width="{kw}" height="{kh}" rx="44" fill="{R["kagit"]}" stroke="{R["lacivert"]}" stroke-width="8"/>'
         f'<g transform="translate({kx + 44} {ky + 46}) scale({290 / 512})">{logo_ic}</g>'
         f'<g transform="translate({tx} {ky + 205})"><path d="{d1}" fill="{R["lacivert"]}"/><g transform="translate({g1:.1f} 0)"><path d="{d2}" fill="{R["mercan"]}"/></g></g>'
         f'<g transform="translate({tx + 4} {ky + 275})"><path d="{p(FRAUNCES, "Kulaklığını tak. Işığı kapatma.", 40 * o_, .01, 700)}" fill="{R["lacivert"]}" fill-opacity=".72"/></g>'
         f'<line x1="{ax:.0f}" y1="{ky + 80}" x2="{ax:.0f}" y2="{ky + kh - 80}" stroke="{R["lacivert"]}" stroke-opacity=".25" stroke-width="4"/>'
         + ikon('yt', sx, ky + 112, 1.15 * o_, R['mercan']) + ikon('ig', sx + 86 * o_, ky + 114, 1.1 * o_, R['mercan']) + ikon('tt', sx + 168 * o_, ky + 112, 1.15 * o_, R['mercan'])
         + f'<g transform="translate({sx:.1f} {ky + 236})"><path d="{p(FRAUNCES, "@duymasakin", 50 * o_, 0, 800)}" fill="{R["lacivert"]}"/></g>'
         f'<g transform="translate({sx + 2:.1f} {ky + 282})"><path d="{p(INTER, "YouTube · Instagram · TikTok", 22 * o_, .02, 600)}" fill="{R["lacivert"]}" fill-opacity=".6"/></g>')
    return svg(desen() + k, 2560, 1440), sag, sinir, o_

def filigran(logo_ic):
    d1, g1, _ = yola(FRAUNCES, "Duyma ", 54, 0, 0, 0, 800); d2, g2, _ = yola(FRAUNCES, "Sakın", 54, 0, 0, 0, 800)
    hw = int(16 + 104 + 18 + g1 + g2 + 34)
    return svg(f'<rect x="6" y="10" width="{hw}" height="108" rx="54" fill="{R["lacivert"]}"/>'
               f'<rect x="4" y="6" width="{hw}" height="108" rx="54" fill="{R["kagit"]}" stroke="{R["lacivert"]}" stroke-width="5"/>'
               f'<g transform="translate(12 8) scale({104 / 512})">{logo_ic}</g>'
               f'<g transform="translate(134 80)"><path d="{d1}" fill="{R["lacivert"]}"/><g transform="translate({g1:.1f} 0)"><path d="{d2}" fill="{R["mercan"]}"/></g></g>',
               hw + 12, 124), hw + 12

if __name__ == "__main__":
    for k, f in LOGOLAR.items():
        ic = f()
        open(f"{KOK}/logo-{k}.svg", "w").write(svg(ic))
        b, sag, sinir, o_ = banner(ic); open(f"{KOK}/banner-{k}.svg", "w").write(b)
        fs, fw = filigran(ic); open(f"{KOK}/filigran-video-{k}.svg", "w").write(fs); open(f"{KOK}/filigran-video-{k}.boyut", "w").write(f"{fw} 124\n")
        print(f"{k}: banner içerik sağ ucu {sag:.0f} / sınır {sinir} (ölçek {o_:.2f}) · filigran {fw}x124")
