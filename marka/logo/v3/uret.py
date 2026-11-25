#!/usr/bin/env python3
"""
uret.py — v3 logo konseptlerini üretir (256 ızgara, tutarlı çizgi, canlı <text> yok).
Kullanım: python3 marka/logo/v3/uret.py
Çıktı (marka/logo/v3/): k{1,2,3}-sembol.svg, k{N}-sembol-siyah.svg, k{N}-sembol-beyaz.svg, k{N}-yatay.svg, k{N}-profil.svg
"""
import math, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..', '..', 'araclar'))
from yazi_yola import yola

KOK = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(KOK, '..', '..', 'fontlar', 'CormorantGaramond[wght].ttf')
GECE, KEMIK, SINYAL = '#0A0A0D', '#EDE6D6', '#E8252E'
W = 22  # ana çizgi kalınlığı (256 ızgarada)

def P(cx, cy, r, aci):  # derece → nokta (SVG: y aşağı)
    a = math.radians(aci); return (cx + r * math.cos(a), cy + r * math.sin(a))

def yay(cx, cy, r, a1, a2, buyuk=0, yon=1):
    x1, y1 = P(cx, cy, r, a1); x2, y2 = P(cx, cy, r, a2)
    return f"M{x1:.2f} {y1:.2f} A{r} {r} 0 {buyuk} {yon} {x2:.2f} {y2:.2f}"

# ---------- Konsept 1: Sessiz Kulak ----------
def k1(ana, vurgu):
    # Kulak v2 formundan arıtıldı (800 birimde çizilip 0,36 ile ızgaraya oturtulur)
    olc, tx, ty = 0.36, 128 - 448 * 0.36, 128 - 405 * 0.36
    dis = "M318 250 C 400 150 590 170 590 330 C 590 420 530 455 512 510 C 498 552 505 612 452 640 C 400 666 350 630 352 585"
    ic = "M392 318 C 440 268 520 300 510 360 C 503 405 458 418 452 470"
    tr = "M330 402 C 302 420 306 464 338 476"
    bant = 140
    return f'''
  <defs><mask id="m1"><rect width="256" height="256" fill="#fff"/>
    <rect x="20" y="{bant-21}" width="216" height="42" rx="21" fill="#000"/></mask></defs>
  <g mask="url(#m1)"><g transform="translate({tx:.2f} {ty:.2f}) scale({olc})" fill="none" stroke="{ana}" stroke-linecap="round" stroke-linejoin="round">
    <path d="{dis}" stroke-width="58"/><path d="{ic}" stroke-width="40"/><path d="{tr}" stroke-width="40"/>
  </g></g>
  <rect x="50" y="{bant-10}" width="156" height="20" rx="10" fill="{vurgu}"/>'''

# ---------- Konsept 2: Şşş-I ----------
def k2(ana, vurgu):
    # Dudak: üst dudak ince ve hafif kavisli, alt dudak dolgun; köşeler sivri. Ortada parmak.
    cy, yari = 150, 92
    ust = f"M{128-yari} {cy} C {128-60} {cy-30} {128-22} {cy-40} 128 {cy-24} C {128+22} {cy-40} {128+60} {cy-30} {128+yari} {cy} Z"
    alt = f"M{128-yari} {cy+4} C {128-50} {cy+52} {128+50} {cy+52} {128+yari} {cy+4} Z"
    return f'''
  <defs><mask id="m2"><rect width="256" height="256" fill="#fff"/>
    <rect x="{128-22}" y="20" width="44" height="220" rx="22" fill="#000"/></mask></defs>
  <g mask="url(#m2)" fill="{ana}"><path d="{ust}"/><path d="{alt}"/></g>
  <rect x="{128-13}" y="40" width="26" height="176" rx="13" fill="{vurgu}"/>'''

# ---------- Konsept 3: Muska ----------
def k3(ana, vurgu):
    # Muska: dolu, köşeleri yuvarlatılmış üçgen; içte dikiş izi (oyma); tepede asma halkası; içte gizli yazı satırları ve kırmızı mühür.
    cx, cy = 128, 150
    def ucgen(R):
        pts = [P(cx, cy, R, a) for a in (-90, 30, 150)]
        return "M" + " L".join(f"{x:.2f} {y:.2f}" for x, y in pts) + " Z"
    tepe = P(cx, cy, 96, -90)
    return f'''
  <defs><mask id="m3"><rect width="256" height="256" fill="#fff"/>
    <path d="{ucgen(70)}" fill="none" stroke="#000" stroke-width="6" stroke-dasharray="11 8" stroke-linejoin="round"/>
    <line x1="{cx-14}" y1="{cy-30}" x2="{cx+14}" y2="{cy-30}" stroke="#000" stroke-width="8" stroke-linecap="round"/>
    <line x1="{cx-25}" y1="{cy-13}" x2="{cx+25}" y2="{cy-13}" stroke="#000" stroke-width="8" stroke-linecap="round"/>
    <line x1="{cx-36}" y1="{cy+4}" x2="{cx+36}" y2="{cy+4}" stroke="#000" stroke-width="8" stroke-linecap="round"/>
  </mask></defs>
  <circle cx="{tepe[0]:.2f}" cy="{tepe[1]-22:.2f}" r="13" fill="none" stroke="{ana}" stroke-width="7"/>
  <path d="{ucgen(96)}" fill="{ana}" stroke="{ana}" stroke-width="26" stroke-linejoin="round" mask="url(#m3)"/>
  <circle cx="{cx}" cy="{cy+22}" r="8" fill="{vurgu}"/>'''

KONSEPT = {1: ("Sessiz Kulak", k1), 2: ("Şşş-I", k2), 3: ("Muska", k3)}

def svg(icerik, w=256, h=256, zemin=None):
    z = f'<rect width="{w}" height="{h}" fill="{zemin}"/>' if zemin else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid meet">{z}{icerik}\n</svg>\n'

def yazi(kirmizi_I=False, renk=KEMIK, vurgu=SINYAL, x=0, y=0, boyut=100):
    d, gen, gl = yola(FONT, "DUYMA SAKIN", boyut, 0.2, x, y, 700)
    if not kirmizi_I:
        return f'<path d="{d}" fill="{renk}"/>', gen
    # I harfini ayrı çiz
    once = "DUYMA SAKIN"
    i = once.rindex('I')
    d1, _, _ = yola(FONT, once[:i], boyut, 0.2, x, y, 700)
    gI = gl[i]
    dI, _, _ = yola(FONT, 'I', boyut, 0, gI['x'], y, 700)
    dN, _, _ = yola(FONT, 'N', boyut, 0, gl[i+1]['x'], y, 700)
    return f'<path d="{d1} {dN}" fill="{renk}"/><path d="{dI}" fill="{vurgu}"/>', gen

for n, (ad, f) in KONSEPT.items():
    open(f"{KOK}/k{n}-sembol.svg", "w").write(svg(f(KEMIK, SINYAL)))
    open(f"{KOK}/k{n}-sembol-siyah.svg", "w").write(svg(f('#111', '#111')))
    open(f"{KOK}/k{n}-sembol-beyaz.svg", "w").write(svg(f('#fff', '#fff')))
    # profil: kare zemin, sembol 0,72 ölçek ortada (yuvarlak kırpma güvenli)
    s = 0.72; t = 128 * (1 - s)
    open(f"{KOK}/k{n}-profil.svg", "w").write(svg(f'<g transform="translate({t:.1f} {t+4:.1f}) scale({s})">{f(KEMIK, SINYAL)}</g>', zemin=GECE))
    # yatay kilit: sembol 256 + boşluk 56 + yazı (büyük harf yüksekliği sembolün ~%30'u)
    yz, gen = yazi(kirmizi_I=(n == 2), x=312, y=160, boyut=104)
    tw = int(312 + gen + 24)
    open(f"{KOK}/k{n}-yatay.svg", "w").write(svg(f(KEMIK, SINYAL) + yz, w=tw, h=256))
    open(f"{KOK}/k{n}-yatay-acik.svg", "w").write(svg(f('#111', SINYAL) + yazi(kirmizi_I=(n == 2), renk='#111', x=312, y=160, boyut=104)[0], w=tw, h=256))
    # Video filigranı (600x128): koyu hap + sembol + yazı
    yz2, gen2 = yazi(kirmizi_I=(n == 2), x=0, y=0, boyut=50)
    olc = 96 / 256
    hw = int(130 + gen2 + 36)  # hap genişliği: yazıya göre
    open(f"{KOK}/k{n}-filigran-video.svg", "w").write(svg(
        f'<rect x="4" y="8" width="{hw}" height="112" rx="56" fill="{GECE}" fill-opacity=".82"/>'
        f'<g transform="translate(22 16) scale({olc})">{f(KEMIK, SINYAL)}</g>'
        f'<g transform="translate(130 82)">{yz2}</g>', w=hw + 8, h=128))
    open(f"{KOK}/k{n}-filigran-video.boyut", "w").write(f"{hw + 8} 128")
    # YouTube filigranı (300x300): yuvarlak koyu zemin + sembol
    open(f"{KOK}/k{n}-filigran-youtube.svg", "w").write(svg(
        f'<circle cx="150" cy="150" r="146" fill="{GECE}" fill-opacity=".9"/><circle cx="150" cy="150" r="144" fill="none" stroke="{KEMIK}" stroke-opacity=".22" stroke-width="3"/>'
        f'<g transform="translate(46 48) scale({208/256})">{f(KEMIK, SINYAL)}</g>', w=300, h=300))
    # Banner (2560x1440): kilit güvenli alanın ortasında
    bo = 0.92; lw, lh = tw * bo, 256 * bo
    lx, ly = (2560 - lw) / 2, 720 - lh / 2 - 34
    yz3, _ = yazi(kirmizi_I=(n == 2), x=312, y=160, boyut=104)
    banner = f'''<defs>
    <radialGradient id="bp" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="{SINYAL}" stop-opacity=".13"/><stop offset=".55" stop-color="{SINYAL}" stop-opacity=".02"/><stop offset="1" stop-color="{GECE}" stop-opacity="0"/></radialGradient>
    <filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .07 0"/></filter>
    <style>@font-face{{font-family:'Inter';src:url('../../fontlar/Inter[opsz,wght].ttf');font-weight:100 900}}</style></defs>
  <rect width="2560" height="1440" fill="{GECE}"/><rect width="2560" height="1440" fill="url(#bp)"/><rect width="2560" height="1440" filter="url(#gr)"/>
  <line x1="0" y1="{ly + lh + 52:.0f}" x2="2560" y2="{ly + lh + 52:.0f}" stroke="{KEMIK}" stroke-opacity=".06" stroke-width="2"/>
  <g transform="translate({lx:.1f} {ly:.1f}) scale({bo})">{f(KEMIK, SINYAL)}{yz3}</g>
  <text x="1280" y="{ly + lh + 66:.0f}" text-anchor="middle" font-family="Inter" font-weight="500" font-size="23" letter-spacing="5" fill="#B4B0B8">KISA KORKU HİKÂYELERİ  ·  ŞEHİR EFSANELERİ  ·  AÇIKLANAMAYAN OLAYLAR</text>'''
    open(f"{KOK}/k{n}-banner.svg", "w").write(svg(banner, w=2560, h=1440))
    print(f"k{n} {ad}: yatay {tw}, banner kilit x {lx:.0f}-{lx+lw:.0f} y {ly:.0f}-{ly+lh:.0f}, slogan y≈{ly+lh+66:.0f} (güvenli: x 567-1993, y 538-901)")
