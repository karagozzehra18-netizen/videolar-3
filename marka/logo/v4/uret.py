#!/usr/bin/env python3
"""
uret.py — v4 "Dikişli Kulak (neon)" logosunun kodla çizilmiş vektör sürümü ve tüm marka dosyaları.
Kaynak tasarım: kullanıcının gönderdiği görseller (marka/logo/v4/kaynak/).
Kullanım: python3 marka/logo/v4/uret.py
Çıktı (marka/logo/v4/):
  sembol-neon.svg      ışıltılı sembol, şeffaf zemin
  sembol-duz.svg       ışıltısız düz sembol (küçük boyut, baskı)
  sembol-siyah.svg / sembol-beyaz.svg   tek renk
  profil-vektor.svg    halka + duman + ışıltı, kare koyu zemin (profil fotoğrafı)
  yatay.svg / yatay-acik.svg            sembol + DUYMA SAKIN yazısı
  filigran-video.svg (+ .boyut) / filigran-youtube.svg / banner.svg
Çizim alanı: 1254x1254 (kaynak görselle aynı ölçek).
"""
import math, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', 'araclar'))
from yazi_yola import yola

KOK = os.path.dirname(os.path.abspath(__file__))
FONT = os.path.join(KOK, '..', '..', 'fontlar', 'CormorantGaramond[wght].ttf')
GECE, BEYAZ, KIRMIZI, KOYU_KIRMIZI = '#050506', '#F2F2F2', '#FF2A2A', '#B00008'
S = 1254

# --- Geometri (1254 birim) ---
DIS = ("M495 388 C 560 262 676 176 790 182 C 924 190 1002 302 1000 436 "
       "C 998 566 944 652 896 724 C 846 798 856 872 818 942 "
       "C 776 1016 680 1034 612 1000 C 566 977 538 948 516 916")
ORTA = ("M884 432 C 882 332 806 270 718 274 C 626 278 570 350 572 446 "
        "C 574 520 604 556 642 578")
IC = ("M620 412 C 694 380 772 424 780 524 C 788 626 760 704 700 762 "
      "C 662 798 612 794 596 764 C 586 742 602 722 624 726")
DIKIS_OMURGA = "M676 372 C 700 450 708 540 704 620 C 702 660 696 690 690 712"
DIKIS_Y = [428, 492, 556, 620, 684]

def dikis(renk, w=1.0):
    capraz = "".join(
        f'<path d="M{x-58:.0f} {y+14:.0f} C {x-20:.0f} {y-6:.0f} {x+20:.0f} {y-16:.0f} {x+58:.0f} {y-10:.0f}"/>'
        for y in DIKIS_Y for x in [702 - (y - 428) * 0.02])
    return (f'<g fill="none" stroke="{renk}" stroke-linecap="round">'
            f'<path d="{DIKIS_OMURGA}" stroke-width="{20*w:.0f}"/>'
            f'<g stroke-width="{24*w:.0f}">{capraz}</g></g>')

def dalgalar(renk, w=1.0):
    # merkez (565, 625); yarıçaplar 130/232/336; sol yarım daire yayları, kesik
    cx, cy = 565, 625
    out = []
    for r, a1, a2, parca in ((130, 146, 214, 3), (232, 140, 220, 5), (336, 136, 224, 6)):
        bosluk = math.degrees((30 + 22) / r)  # yuvarlak uçlar boşluğu kapatmasın: kalınlık + 22 px
        adim = (a2 - a1 - bosluk * (parca - 1)) / parca
        a = a1
        for _ in range(parca):
            b = a + adim
            x1, y1 = cx + r * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a))
            x2, y2 = cx + r * math.cos(math.radians(b)), cy + r * math.sin(math.radians(b))
            out.append(f'<path d="M{x1:.1f} {y1:.1f} A{r} {r} 0 0 1 {x2:.1f} {y2:.1f}"/>')
            a = b + bosluk
    return f'<g fill="none" stroke="{renk}" stroke-width="{30*w:.0f}" stroke-linecap="round">{"".join(out)}</g>'

def kulak(renk, w=1.0):
    return (f'<g fill="none" stroke="{renk}" stroke-linecap="round" stroke-linejoin="round">'
            f'<path d="{DIS}" stroke-width="{58*w:.0f}"/><path d="{ORTA}" stroke-width="{50*w:.0f}"/>'
            f'<path d="{IC}" stroke-width="{48*w:.0f}"/></g>')

def sembol_duz(ana=BEYAZ, vurgu=KIRMIZI, mid="d"):
    # Tek renkte dikiş kulakla birleşmesin diye kulak çizgilerinde dikişin çevresine boşluk açılır.
    maske = (f'<defs><mask id="m{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="{S}" height="{S}">'
             f'<rect width="{S}" height="{S}" fill="#fff"/>{dikis("#000", w=2.1)}</mask></defs>')
    return maske + f'<g mask="url(#m{mid})">{kulak(ana)}</g>' + dikis(vurgu) + dalgalar(vurgu)

NEON_DEFS = f'''<defs>
  <filter id="kIsik" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="b"/>
    <feFlood flood-color="{KIRMIZI}" flood-opacity=".85"/><feComposite in2="b" operator="in" result="kb"/>
    <feGaussianBlur in="SourceAlpha" stdDeviation="28" result="b2"/>
    <feFlood flood-color="{KOYU_KIRMIZI}" flood-opacity=".7"/><feComposite in2="b2" operator="in" result="kb2"/>
    <feMerge><feMergeNode in="kb2"/><feMergeNode in="kb"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="bIsik" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="b"/>
    <feFlood flood-color="{KIRMIZI}" flood-opacity=".55"/><feComposite in2="b" operator="in" result="kb"/>
    <feMerge><feMergeNode in="kb"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <linearGradient id="parlak" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset=".55" stop-color="{BEYAZ}"/><stop offset="1" stop-color="#C9C9CC"/>
  </linearGradient>
</defs>'''

def sembol_neon():
    return (f'<g filter="url(#bIsik)">{kulak("url(#parlak)")}</g>'
            f'<g filter="url(#kIsik)">{dikis(KIRMIZI)}{dalgalar(KIRMIZI)}</g>')

def svg(icerik, w=S, h=S, zemin=None, defs=''):
    z = f'<rect width="{w}" height="{h}" fill="{zemin}"/>' if zemin else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 {w} {h}" '
            f'preserveAspectRatio="xMidYMid meet">{defs}{z}{icerik}\n</svg>\n')

def duman_defs(tohum=4):
    return f'''<defs>
  <filter id="duman" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".0032 .0058" numOctaves="4" seed="{tohum}" result="t"/>
    <feColorMatrix in="t" values="0 0 0 0 .95  0 0 0 0 .04  0 0 0 0 .06  1 0 0 0 0" result="r"/>
    <feComponentTransfer in="r" result="c"><feFuncA type="table" tableValues="0 0 0 0 0 0 0 .55 0 0 0 0 0 0 0 0 0 0 0 0"/></feComponentTransfer>
    <feTurbulence type="fractalNoise" baseFrequency=".01" numOctaves="2" seed="{tohum + 3}" result="t2"/>
    <feDisplacementMap in="c" in2="t2" scale="70" xChannelSelector="R" yChannelSelector="G" result="d"/>
    <feGaussianBlur in="d" stdDeviation="1.4"/>
  </filter>
  <linearGradient id="halkaRenk" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#FF6A6A"/><stop offset=".22" stop-color="{KIRMIZI}"/><stop offset=".5" stop-color="{KOYU_KIRMIZI}" stop-opacity=".85"/>
    <stop offset=".78" stop-color="{KIRMIZI}"/><stop offset="1" stop-color="#FF6A6A"/>
  </linearGradient>
  <radialGradient id="dumanMaske" cx="50%" cy="50%" r="50%">
    <stop offset=".74" stop-color="#000"/><stop offset=".9" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff"/>
  </radialGradient>
  <mask id="dm"><rect width="100%" height="100%" fill="url(#dumanMaske)"/></mask>
  <radialGradient id="ic" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#140204"/><stop offset=".8" stop-color="{GECE}"/></radialGradient>
  <filter id="halkaIsik" x="-10%" y="-10%" width="120%" height="120%">
    <feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <radialGradient id="parlama"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="{KIRMIZI}" stop-opacity=".9"/><stop offset="1" stop-color="{KIRMIZI}" stop-opacity="0"/></radialGradient>
</defs>'''

def profil():
    halka = (f'<g filter="url(#halkaIsik)" fill="none">'
             f'<circle cx="627" cy="627" r="528" stroke="url(#halkaRenk)" stroke-width="7"/>'
             f'<circle cx="627" cy="627" r="506" stroke="{KOYU_KIRMIZI}" stroke-width="2" opacity=".6"/></g>')
    parlama = ('<ellipse cx="132" cy="458" rx="60" ry="5" fill="url(#parlama)"/><circle cx="132" cy="458" r="8" fill="#fff"/>'
               '<ellipse cx="960" cy="1002" rx="48" ry="4" fill="url(#parlama)"/><circle cx="960" cy="1002" r="6" fill="#fff"/>')
    ic = '<circle cx="627" cy="627" r="500" fill="url(#ic)"/>'
    duman = '<g mask="url(#dm)"><rect width="1254" height="1254" filter="url(#duman)"/></g>'
    # sembolü halkanın içine sığdır: %80 ölçek, ortala
    s = 0.84; t = 627 * (1 - s)
    return svg(f'{duman}{ic}{halka}{parlama}<g transform="translate({t:.1f} {t:.1f}) scale({s})">{sembol_neon()}</g>',
               zemin=GECE, defs=duman_defs() + NEON_DEFS)

def yazi(renk=BEYAZ, x=0, y=0, boyut=100):
    d, gen, _ = yola(FONT, "DUYMA SAKIN", boyut, 0.2, x, y, 700)
    return f'<path d="{d}" fill="{renk}"/>', gen

def kutu():  # sembolün yaklaşık sınırları (1254 biriminde)
    return 210, 150, 1035, 1040

if __name__ == "__main__":
    o = lambda ad, metin: open(os.path.join(KOK, ad), "w").write(metin)
    o("sembol-neon.svg", svg(sembol_neon(), defs=NEON_DEFS))
    o("sembol-duz.svg", svg(sembol_duz()))
    o("sembol-siyah.svg", svg(sembol_duz('#111', '#111', "s")))
    o("sembol-beyaz.svg", svg(sembol_duz('#fff', '#fff', "b")))
    o("profil-vektor.svg", profil())
    # --- Yatay kilit: sembol (yükseklik 256'ya ölçekli) + yazı ---
    x0, y0, x1, y1 = kutu(); sk = 256 / (y1 - y0)
    def sembol_kucuk(icerik):
        return f'<g transform="scale({sk:.4f}) translate({-x0} {-y0})">{icerik}</g>'
    yz, gen = yazi(x=0, y=0, boyut=104)
    sw = (x1 - x0) * sk; tx = sw + 56
    tw = int(tx + gen + 24)
    o("yatay.svg", svg(sembol_kucuk(sembol_neon()) + f'<g transform="translate({tx:.1f} 168)">{yz}</g>', w=tw, h=256, defs=NEON_DEFS))
    yz_k, _ = yazi(renk='#111', x=0, y=0, boyut=104)
    o("yatay-acik.svg", svg(sembol_kucuk(sembol_duz('#111', '#D11A22')) + f'<g transform="translate({tx:.1f} 168)">{yz_k}</g>', w=tw, h=256))
    # --- Video filigranı: koyu hap + küçük sembol + yazı ---
    yz2, gen2 = yazi(x=0, y=0, boyut=50)
    hs = 100 / (y1 - y0)
    hw = int(34 + (x1 - x0) * hs + 22 + gen2 + 36)
    fil = (f'<rect x="4" y="8" width="{hw}" height="112" rx="56" fill="{GECE}" fill-opacity=".85"/>'
           f'<g transform="translate(34 14) scale({hs:.4f}) translate({-x0} {-y0})">{sembol_neon()}</g>'
           f'<g transform="translate({34 + (x1 - x0) * hs + 22:.1f} 82)">{yz2}</g>')
    o("filigran-video.svg", svg(fil, w=hw + 8, h=128, defs=NEON_DEFS)); o("filigran-video.boyut", f"{hw + 8} 128\n")
    # --- YouTube filigranı 300x300 ---
    ys = 210 / (y1 - y0)
    o("filigran-youtube.svg", svg(
        f'<circle cx="150" cy="150" r="146" fill="{GECE}" fill-opacity=".92"/><circle cx="150" cy="150" r="143" fill="none" stroke="{KIRMIZI}" stroke-opacity=".7" stroke-width="3"/>'
        f'<g transform="translate({150 - (x1 - x0) * ys / 2:.1f} 45) scale({ys:.4f}) translate({-x0} {-y0})">{sembol_neon()}</g>', w=300, h=300, defs=NEON_DEFS))
    # --- Banner 2560x1440: duman kenarlarda, ortada kilit ---
    bo = 0.92; lw, lh = tw * bo, 256 * bo
    lx, ly = (2560 - lw) / 2, 720 - lh / 2 - 52
    ban_defs = f'''<defs>
  <filter id="bduman" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".0016 .0042" numOctaves="5" seed="9" result="t"/>
    <feDisplacementMap in="t" in2="t" scale="220" result="d"/>
    <feColorMatrix in="d" values="0 0 0 0 .95  0 0 0 0 0  0 0 0 0 .02  0 0 0 3.4 -1.75"/>
  </filter>
  <linearGradient id="bmaske" x1="0" x2="1"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#000"/><stop offset=".7" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
  <mask id="bm"><rect width="2560" height="1440" fill="url(#bmaske)"/></mask>
  <radialGradient id="borta" cx="50%" cy="50%" r="45%"><stop offset="0" stop-color="#1a0306"/><stop offset="1" stop-color="{GECE}" stop-opacity="0"/></radialGradient>
  <style>@font-face{{font-family:'Inter';src:url('../../fontlar/Inter[opsz,wght].ttf');font-weight:100 900}}</style>
</defs>'''
    banner = (f'<rect width="2560" height="1440" fill="{GECE}"/><g mask="url(#bm)"><rect width="2560" height="1440" filter="url(#bduman)"/></g>'
              f'<rect width="2560" height="1440" fill="url(#borta)"/>'
              f'<line x1="760" y1="{ly + lh + 36:.0f}" x2="1800" y2="{ly + lh + 36:.0f}" stroke="{KIRMIZI}" stroke-opacity=".35" stroke-width="2"/>'
              f'<g transform="translate({lx:.1f} {ly:.1f}) scale({bo})">{sembol_kucuk(sembol_neon())}<g transform="translate({tx:.1f} 168)">{yz}</g></g>'
              f'<text x="1280" y="{ly + lh + 80:.0f}" text-anchor="middle" font-family="Inter" font-weight="500" font-size="23" letter-spacing="5" fill="#B4B0B8">KISA KORKU HİKÂYELERİ  ·  ŞEHİR EFSANELERİ  ·  AÇIKLANAMAYAN OLAYLAR</text>')
    o("banner.svg", svg(banner, w=2560, h=1440, defs=ban_defs + NEON_DEFS))
    print(f"yazıldı: tüm v4 dosyaları · yatay {tw}x256 · filigran {hw + 8}x128 · banner kilit x {lx:.0f}-{lx + lw:.0f}")
