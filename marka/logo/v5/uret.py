#!/usr/bin/env python3
"""
uret.py — v5 açık renkli, illüstrasyonlu rozet logolar (SVG) ve PNG çıktıları için kaynak.
Kullanım: python3 marka/logo/v5/uret.py
Çıktı (marka/logo/v5/): logo-a.svg, logo-b.svg, logo-c.svg (512x512, yazılar vektör yol)
PNG'ye çevirme: node araclar/marka_render.js marka/logo/v5/logo-a.svg marka/logo/v5/render/logo-a-1024.png 1024 1024 --seffaf
"""
import math, os, sys, random
KOK = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(KOK, '..', '..', '..', 'araclar'))
sys.path.insert(0, os.path.join(KOK, '..', 'v4'))
from yazi_yola import yola
import uret as v4  # dikişli kulak geometrisi

FRAUNCES = os.path.join(KOK, '..', '..', 'fontlar', 'Fraunces[SOFT,WONK,opsz,wght].ttf')
R = dict(krem='#F7EEDC', kagit='#FBF5EA', lacivert='#23284A', mercan='#E5533C', hardal='#F2B134',
         seftali='#F7B98B', lavanta='#C9C0E8', ay='#FCE6B0', teal='#3E7C74', teal_acik='#86B5A6',
         teal_koyu='#24524D', erik='#6B3557')

def svg(icerik, w=512, h=512, defs=''):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 {w} {h}">'
            f'{defs}{icerik}\n</svg>\n')

ORTAK_DEFS = f'''<defs>
  <linearGradient id="gok" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="{R['lavanta']}"/><stop offset=".62" stop-color="#F2C6B4"/><stop offset="1" stop-color="{R['seftali']}"/>
  </linearGradient>
  <clipPath id="ic"><circle cx="256" cy="256" r="206"/></clipPath>
</defs>'''

def rozet(sahne, halka_genis=38):
    return (f'<circle cx="256" cy="256" r="250" fill="{R["krem"]}"/>'
            f'<circle cx="256" cy="256" r="246" fill="none" stroke="{R["lacivert"]}" stroke-width="5"/>'
            f'<g clip-path="url(#ic)">{sahne}</g>'
            f'<circle cx="256" cy="256" r="208" fill="none" stroke="{R["lacivert"]}" stroke-width="7"/>')

def yildizlar(tohum=3, n=9, alan=(80, 70, 430, 200)):
    rnd = random.Random(tohum); out = []
    for _ in range(n):
        x = rnd.uniform(alan[0], alan[2]); y = rnd.uniform(alan[1], alan[3]); r = rnd.choice([2.2, 2.8, 3.6])
        out.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}" fill="{R["kagit"]}" opacity=".95"/>')
    return "".join(out)

def cam(x, taban, h, renk):
    w = h * 0.46
    return (f'<path d="M{x:.1f} {taban - h:.1f} L{x + w * .55:.1f} {taban - h * .45:.1f} L{x + w * .32:.1f} {taban - h * .47:.1f} '
            f'L{x + w * .7:.1f} {taban:.1f} L{x - w * .7:.1f} {taban:.1f} L{x - w * .32:.1f} {taban - h * .47:.1f} '
            f'L{x - w * .55:.1f} {taban - h * .45:.1f} Z" fill="{renk}"/>')

def orman():
    rnd = random.Random(7); out = []
    for katman, (renk, taban, hmin, hmax, adim) in enumerate([
            (R['teal_acik'], 400, 70, 110, 34), (R['teal'], 430, 80, 130, 40), (R['teal_koyu'], 470, 90, 150, 46)]):
        x = 30 + katman * 14
        out.append(f'<rect x="0" y="{taban - 4}" width="512" height="200" fill="{renk}"/>')
        while x < 500:
            out.append(cam(x, taban, rnd.uniform(hmin, hmax), renk)); x += adim * rnd.uniform(.8, 1.2)
    return "".join(out)

def kulak_grubu(cx, cy, olcek, ana, vurgu):
    # v4 kulak 1254 biriminde; kutu (470..1030, 150..1040) merkezi ≈ (750, 595)
    return (f'<g transform="translate({cx} {cy}) scale({olcek}) translate(-750 -595)">'
            f'{v4.kulak(ana, 1.15)}{v4.dikis(vurgu, 1.1)}</g>')

def dalgalar(cx, cy, olcek, renk):
    return f'<g transform="translate({cx} {cy}) scale({olcek}) translate(-565 -625)">{v4.dalgalar(renk, 1.1)}</g>'

def sahne_a():
    return (f'<rect width="512" height="512" fill="url(#gok)"/>{yildizlar()}'
            f'<circle cx="262" cy="232" r="112" fill="{R["ay"]}"/>'
            f'<circle cx="262" cy="232" r="112" fill="none" stroke="{R["kagit"]}" stroke-width="6" opacity=".6"/>'
            f'{orman()}'
            f'{dalgalar(200, 244, .19, R["mercan"])}'
            f'{kulak_grubu(282, 234, .225, R["lacivert"], R["mercan"])}')

def ev(x, y, s=1.0):
    L, M, H = R['lacivert'], R['mercan'], R['hardal']
    return (f'<g transform="translate({x} {y}) scale({s})">'
            f'<path d="M62 -132 C 52 -150 76 -158 66 -176 C 58 -190 78 -196 74 -210" fill="none" stroke="{R["kagit"]}" stroke-width="7" stroke-linecap="round" opacity=".85"/>'
            f'<rect x="52" y="-128" width="14" height="40" fill="{L}" transform="rotate(4 59 -108)"/>'
            f'<path d="M-8 -60 L44 -116 L104 -62 Z" fill="{L}"/>'
            f'<rect x="4" y="-66" width="88" height="70" fill="{L}"/>'
            f'<rect x="20" y="-48" width="22" height="22" rx="3" fill="{H}"/>'
            f'<line x1="31" y1="-48" x2="31" y2="-26" stroke="{L}" stroke-width="3"/><line x1="20" y1="-37" x2="42" y2="-37" stroke="{L}" stroke-width="3"/>'
            f'<path d="M58 4 L58 -26 Q70 -38 82 -26 L82 4 Z" fill="{M}"/>'
            f'</g>')

def kus(x, y, s):
    return f'<path d="M{x - 12 * s} {y} Q{x - 6 * s} {y - 7 * s} {x} {y} Q{x + 6 * s} {y - 7 * s} {x + 12 * s} {y}" fill="none" stroke="{R["lacivert"]}" stroke-width="{3.2 * s:.1f}" stroke-linecap="round"/>'

def sahne_b():
    tepe_arka = f'<path d="M0 360 Q140 300 300 340 Q420 368 512 330 L512 512 L0 512 Z" fill="{R["teal_acik"]}"/>'
    tepe = f'<path d="M0 420 Q150 300 290 318 Q410 334 512 400 L512 512 L0 512 Z" fill="{R["teal"]}"/>'
    yol = f'<path d="M262 512 Q250 430 262 336 L282 336 Q300 430 320 512 Z" fill="{R["krem"]}" opacity=".85"/>'
    cit = (f'<path d="M96 382 Q160 352 236 344" fill="none" stroke="{R["teal_koyu"]}" stroke-width="4"/>'
           + "".join(f'<rect x="{x - 3}" y="{(382 - (x - 96) * 0.27) - 12:.0f}" width="6" height="28" rx="2" fill="{R["teal_koyu"]}"/>' for x in range(100, 236, 22)))
    on = f'<path d="M0 470 Q256 430 512 470 L512 512 L0 512 Z" fill="{R["teal_koyu"]}"/>'
    return (f'<rect width="512" height="512" fill="url(#gok)"/>{yildizlar(5, 7, (90, 80, 260, 190))}'
            f'<circle cx="348" cy="168" r="62" fill="{R["ay"]}"/>'
            f'{kus(180, 160, 1.1)}{kus(214, 140, .8)}{kus(150, 132, .7)}'
            f'{tepe_arka}{tepe}{cit}{yol}{ev(222, 334, 1.0)}{on}')

def yay_yazi(metin, r, merkez_aci, boyut, renk, ust=True, wght=800, aralik=0.12):
    """Metni çember üzerine glif glif yerleştirir (vektör yol). ust=True: tepe yayında soldan sağa okunur."""
    from yazi_yola import yola as _y
    _, gen, gl = _y(FRAUNCES, metin, boyut, aralik, 0, 0, wght)
    toplam_aci = math.degrees(gen / r)
    out = []
    for g in gl:
        if g['harf'] == ' ':
            continue
        d, _, _ = _y(FRAUNCES, g['harf'], boyut, 0, 0, 0, wght)
        orta = g['x'] + g['genislik'] / 2
        if ust:
            aci = merkez_aci - toplam_aci / 2 + math.degrees(orta / r)
            x = 256 + r * math.cos(math.radians(aci)); y = 256 + r * math.sin(math.radians(aci))
            don = aci + 90
            out.append(f'<g transform="translate({x:.2f} {y:.2f}) rotate({don:.2f}) translate({-g["genislik"] / 2:.2f} {boyut * .34:.2f})"><path d="{d}" fill="{renk}"/></g>')
        else:
            aci = merkez_aci + toplam_aci / 2 - math.degrees(orta / r)
            x = 256 + r * math.cos(math.radians(aci)); y = 256 + r * math.sin(math.radians(aci))
            don = aci - 90
            out.append(f'<g transform="translate({x:.2f} {y:.2f}) rotate({don:.2f}) translate({-g["genislik"] / 2:.2f} {boyut * .34:.2f})"><path d="{d}" fill="{renk}"/></g>')
    return "".join(out)

def logo_c():
    # Amblem: dış krem halkada yazı, içte A sahnesi (küçültülmüş)
    ic_defs = ORTAK_DEFS.replace('<circle cx="256" cy="256" r="206"/>', '<circle cx="256" cy="256" r="168"/>')
    sahne = f'<g transform="translate(256 256) scale(.82) translate(-256 -256)">{sahne_a()}</g>'
    yazi_ust = yay_yazi("DUYMA SAKIN", 206, -90, 40, R['lacivert'], True, 800, 0.14)
    yazi_alt = yay_yazi("KISA KORKU HİKÂYELERİ", 208, 90, 21, R['mercan'], False, 700, 0.16)
    nokta = "".join(f'<circle cx="{256 + 207 * math.cos(math.radians(a)):.1f}" cy="{256 + 207 * math.sin(math.radians(a)):.1f}" r="5" fill="{R["mercan"]}"/>' for a in (0, 180))
    icerik = (f'<circle cx="256" cy="256" r="250" fill="{R["krem"]}"/>'
              f'<circle cx="256" cy="256" r="246" fill="none" stroke="{R["lacivert"]}" stroke-width="5"/>'
              f'<circle cx="256" cy="256" r="236" fill="none" stroke="{R["lacivert"]}" stroke-width="1.5" stroke-dasharray="3 6"/>'
              f'<g clip-path="url(#ic)">{sahne}</g>'
              f'<circle cx="256" cy="256" r="170" fill="none" stroke="{R["lacivert"]}" stroke-width="6"/>'
              f'{yazi_ust}{yazi_alt}{nokta}')
    return svg(icerik, defs=ic_defs)

def sosyal_ikon(tur, x, y, s, renk):
    if tur == 'yt':
        return (f'<g transform="translate({x} {y}) scale({s})"><rect x="0" y="6" width="52" height="38" rx="11" fill="{renk}"/>'
                f'<path d="M21 16 L36 25 L21 34 Z" fill="{R["kagit"]}"/></g>')
    if tur == 'ig':
        return (f'<g transform="translate({x} {y}) scale({s})" fill="none" stroke="{renk}" stroke-width="5.5">'
                f'<rect x="4" y="4" width="44" height="44" rx="13"/><circle cx="26" cy="26" r="10"/></g>'
                f'<circle cx="{x + 38 * s:.1f}" cy="{y + 14 * s:.1f}" r="{3.2 * s:.1f}" fill="{renk}"/>')
    if tur == 'tt':
        return (f'<g transform="translate({x} {y}) scale({s})"><path d="M26 4 L34 4 Q36 16 48 18 L48 26 Q40 26 34 21 L34 36 '
                f'A13 13 0 1 1 21 23 L21 31 A5.5 5.5 0 1 0 26 36 Z" fill="{renk}"/></g>')

def kolaj(tohum=21):
    """Banner zemini: açık kâğıt üstünde çok renkli kâğıt parçaları, yıldızlar, orman, tepe ve ev."""
    rnd = random.Random(tohum); o = []
    o.append(f'<rect width="2560" height="1440" fill="{R["kagit"]}"/>')
    # büyük renk alanları (yırtık kâğıt hissi: hafif dönük yuvarlak dikdörtgenler)
    alanlar = [(-120, 380, 980, 820, R['lavanta'], -4), (1700, 300, 1100, 880, R['seftali'], 5), (-80, -160, 1300, 520, R['krem'], 3),
               (1300, -140, 1400, 480, '#F3D9C7', -3), (200, 1100, 900, 500, R['teal_acik'], 2), (1500, 1060, 1200, 520, '#EFC9A8', -2)]
    for x, y, w, h, c, a in alanlar:
        o.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="38" fill="{c}" transform="rotate({a} {x + w / 2} {y + h / 2})"/>')
    # şeritler
    for x, y, w, c, a in [(80, 300, 520, R['mercan'], -6), (1900, 1060, 560, R['hardal'], 4), (2050, 260, 380, R['erik'], -3), (150, 1010, 420, R['lacivert'], 3)]:
        o.append(f'<rect x="{x}" y="{y}" width="{w}" height="34" rx="17" fill="{c}" transform="rotate({a} {x + w / 2} {y + 17})"/>')
    # sol: ay + orman — yuvarlak köşeli kâğıt parçası içinde
    o.append(f'<defs><clipPath id="solParca"><rect x="-60" y="620" width="1060" height="900" rx="46" transform="rotate(-3 470 1070)"/></clipPath>'
             f'<clipPath id="sagParca"><rect x="1660" y="700" width="1000" height="900" rx="46" transform="rotate(3 2160 1150)"/></clipPath></defs>')
    o.append(f'<rect x="-60" y="620" width="1060" height="900" rx="46" fill="#DCE9E2" transform="rotate(-3 470 1070)"/>')
    o.append(f'<circle cx="300" cy="700" r="190" fill="{R["ay"]}"/>')
    o.append('<g clip-path="url(#solParca)">')
    for katman, (renk, taban, hmin, hmax, adim) in enumerate([(R['teal_acik'], 1040, 150, 240, 70), (R['teal'], 1110, 170, 280, 82), (R['teal_koyu'], 1200, 190, 300, 96)]):
        x = -40 + katman * 30
        o.append(f'<rect x="-60" y="{taban - 6}" width="1100" height="400" fill="{renk}"/>')
        while x < 1040:
            o.append(cam(x, taban, rnd.uniform(hmin, hmax), renk)); x += adim * rnd.uniform(.8, 1.2)
    o.append('</g>')
    # sağ: tepe + ev + kuşlar — kâğıt parçası içinde
    o.append(f'<rect x="1660" y="700" width="1000" height="900" rx="46" fill="#F6D7BE" transform="rotate(3 2160 1150)"/>')
    o.append('<g clip-path="url(#sagParca)">')
    o.append(f'<path d="M1640 1150 Q1900 960 2200 990 Q2450 1010 2640 1120 L2640 1600 L1640 1600 Z" fill="{R["teal_acik"]}"/>')
    o.append(f'<path d="M1640 1260 Q1960 1020 2250 1060 Q2460 1090 2640 1220 L2640 1600 L1640 1600 Z" fill="{R["teal"]}"/>')
    o.append(ev(2230, 1072, 1.7))
    o.append('</g>')
    o.append(f'<circle cx="2330" cy="420" r="110" fill="{R["ay"]}"/>')
    o.append(kus(2190, 480, 3) + kus(2280, 440, 2.2) + kus(2130, 420, 1.8))
    # yıldız serpintisi
    for _ in range(46):
        x = rnd.uniform(0, 2560); y = rnd.uniform(0, 1440)
        if 470 < x < 2090 and 470 < y < 970:
            continue
        r = rnd.choice([5, 7, 9]); c = rnd.choice([R['hardal'], R['kagit'], R['lacivert']])
        o.append(f'<path d="M{x} {y - r * 2} L{x + r * .5} {y - r * .5} L{x + r * 2} {y} L{x + r * .5} {y + r * .5} L{x} {y + r * 2} L{x - r * .5} {y + r * .5} L{x - r * 2} {y} L{x - r * .5} {y - r * .5} Z" fill="{c}" opacity=".9"/>')
    return "".join(o)

def banner(logo_svg_ici, logo_defs):
    # Kart: telefonda görünen 1546x423 alanın (x 507-2053, y 508-931) içinde, her kenardan 20 px pay
    kx, ky, kw, kh = 527, 528, 1506, 383
    gol = f'<rect x="{kx + 12}" y="{ky + 14}" width="{kw}" height="{kh}" rx="44" fill="{R["lacivert"]}"/>'
    kart = f'<rect x="{kx}" y="{ky}" width="{kw}" height="{kh}" rx="44" fill="{R["kagit"]}" stroke="{R["lacivert"]}" stroke-width="8"/>'
    logo = f'<g transform="translate({kx + 44} {ky + 46}) scale({290 / 512})">{logo_svg_ici}</g>'
    INTER = os.path.join(KOK, '..', '..', 'fontlar', 'Inter[opsz,wght].ttf')
    def olc(o):  # o: ölçek çarpanı; tüm kart içeriğinin genişliğini döndürür
        g_ad = yola(FRAUNCES, "Duyma Sakın", 118 * o, 0, 0, 0, 800)[1]
        g_sl = yola(FRAUNCES, "Kulaklığını tak. Işığı kapatma.", 40 * o, 0.01, 0, 0, 700)[1]
        g_h = yola(FRAUNCES, "@duymasakin", 50 * o, 0, 0, 0, 800)[1]
        g_p = yola(INTER, "YouTube · Instagram · TikTok", 22 * o, 0.02, 0, 0, 600)[1]
        return g_ad, g_sl, g_h, g_p
    tx = kx + 380; sag_sinir = kx + kw - 48
    o_ = 1.0
    while True:
        g_ad, g_sl, g_h, g_p = olc(o_)
        ayrac_x = tx + max(g_ad, g_sl) + 54 * o_
        sx = ayrac_x + 50 * o_
        sag = sx + max(g_h, g_p, 260 * o_)
        if sag <= sag_sinir or o_ < .5:
            break
        o_ -= .02
    d_ad = yola(FRAUNCES, "Duyma Sakın", 118 * o_, 0, 0, 0, 800)[0]
    d_sl = yola(FRAUNCES, "Kulaklığını tak. Işığı kapatma.", 40 * o_, 0.01, 0, 0, 700)[0]
    d_h = yola(FRAUNCES, "@duymasakin", 50 * o_, 0, 0, 0, 800)[0]
    d_p = yola(INTER, "YouTube · Instagram · TikTok", 22 * o_, 0.02, 0, 0, 600)[0]
    ad = f'<g transform="translate({tx} {ky + 205})"><path d="{d_ad}" fill="{R["lacivert"]}"/></g>'
    slogan = f'<g transform="translate({tx + 4} {ky + 275})"><path d="{d_sl}" fill="{R["mercan"]}"/></g>'
    ayrac = f'<line x1="{ayrac_x:.0f}" y1="{ky + 80}" x2="{ayrac_x:.0f}" y2="{ky + kh - 80}" stroke="{R["lacivert"]}" stroke-opacity=".25" stroke-width="4"/>'
    ik = 1.15 * o_
    ikonlar = sosyal_ikon('yt', sx, ky + 112, ik, R['lacivert']) + sosyal_ikon('ig', sx + 86 * o_, ky + 114, ik * .96, R['lacivert']) + sosyal_ikon('tt', sx + 168 * o_, ky + 112, ik, R['lacivert'])
    hesap = f'<g transform="translate({sx:.1f} {ky + 236})"><path d="{d_h}" fill="{R["lacivert"]}"/></g>'
    platform = f'<g transform="translate({sx + 2:.1f} {ky + 282})"><path d="{d_p}" fill="{R["lacivert"]}" fill-opacity=".6"/></g>'
    icerik = kolaj() + gol + kart + logo + ad + slogan + ayrac + ikonlar + hesap + platform
    return svg(icerik, 2560, 1440, defs=logo_defs), (kx, ky, kx + kw + 12, ky + kh + 14), sag, o_

if __name__ == "__main__":
    open(f"{KOK}/logo-a.svg", "w").write(svg(rozet(sahne_a()), defs=ORTAK_DEFS))
    open(f"{KOK}/logo-b.svg", "w").write(svg(rozet(sahne_b()), defs=ORTAK_DEFS))
    open(f"{KOK}/logo-c.svg", "w").write(logo_c())
    import re
    for k, ic, defs in (("a", rozet(sahne_a()), ORTAK_DEFS), ("b", rozet(sahne_b()), ORTAK_DEFS)):
        b, kart, sag, o_ = banner(ic, defs)
        open(f"{KOK}/banner-{k}.svg", "w").write(b)
        print(f"banner-{k}: kart {kart}, içerik sağ ucu x={sag:.0f} (sınır {kart[2] - 12 - 48}), yazı ölçeği {o_:.2f}")
    c_svg = logo_c(); c_defs = re.search(r"<defs>.*?</defs>", c_svg, re.S).group(0)
    c_ic = c_svg[c_svg.index("</defs>") + 7: c_svg.rindex("</svg>")]
    b, kart, sag, o_ = banner(c_ic, c_defs); open(f"{KOK}/banner-c.svg", "w").write(b)
    print(f"banner-c: içerik sağ ucu x={sag:.0f}")
    # Video filigranı (açık renkli hap): mini rozet + yazı
    for k, ic, defs in (("a", rozet(sahne_a()), ORTAK_DEFS), ("b", rozet(sahne_b()), ORTAK_DEFS), ("c", c_ic, c_defs)):
        d_f, g_f, _ = yola(FRAUNCES, "Duyma Sakın", 54, 0, 0, 0, 800)
        hw = int(16 + 104 + 18 + g_f + 34)
        fil = (f'<rect x="6" y="10" width="{hw}" height="108" rx="54" fill="{R["lacivert"]}"/>'
               f'<rect x="4" y="6" width="{hw}" height="108" rx="54" fill="{R["kagit"]}" stroke="{R["lacivert"]}" stroke-width="5"/>'
               f'<g transform="translate(12 8) scale({104 / 512})">{ic}</g>'
               f'<g transform="translate({16 + 104 + 14} 80)"><path d="{d_f}" fill="{R["lacivert"]}"/></g>')
        open(f"{KOK}/filigran-video-{k}.svg", "w").write(svg(fil, hw + 12, 124, defs=defs))
        open(f"{KOK}/filigran-video-{k}.boyut", "w").write(f"{hw + 12} 124\n")
    print("yazıldı: logo-a/b/c.svg, banner-a/b/c.svg, filigran-video-a/b/c.svg")
