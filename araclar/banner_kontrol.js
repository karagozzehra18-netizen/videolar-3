/**
 * banner_kontrol.js — YouTube banner'ının TV, bilgisayar ve telefonda nasıl görüneceğini çıkarır
 * ve tüm yazı/logonun telefon güvenli alanına (1546x423, kenar payıyla) sığdığını ÖLÇER.
 *
 * Kullanım:
 *   node araclar/banner_kontrol.js <banner.html> <cikti-onizleme.png> [--pay 40]
 * Çıktı: üç cihaz görünümünü alt alta dizen tek PNG + konsolda her öğenin kutusu ve GEÇTİ/KALDI.
 * Kural: '.icerik' içindeki her görünür öğe, güvenli alanın her kenarından en az --pay px içeride olmalı.
 */
const { chromium } = require('playwright');
const path = require('path');

const GUVENLI = { x: 507, y: 508, w: 1546, h: 423 };   // 2560x1440 tuvalde telefon + tüm cihazlar
const MASAUSTU = { x: 0, y: 508, w: 2560, h: 423 };     // bilgisayar: tam genişlik şerit

(async () => {
  const [girdi, cikti] = process.argv.slice(2);
  const payIdx = process.argv.indexOf('--pay');
  const pay = payIdx > 0 ? Number(process.argv[payIdx + 1]) : 40;
  if (!girdi || !cikti) { console.error('Kullanım: node araclar/banner_kontrol.js <banner.html> <cikti.png> [--pay 40]'); process.exit(1); }

  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2560, height: 1440 } });
  await p.goto('file://' + path.resolve(girdi));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(150);

  const kutular = await p.$$eval('.icerik *', els => els
    .filter(e => e.getBoundingClientRect().width > 0 && !e.children.length || e.tagName === 'H1' || e.tagName === 'IMG')
    .map(e => { const r = e.getBoundingClientRect(); return { ad: e.tagName + (e.className ? '.' + e.className : ''), x: r.left, y: r.top, s: r.right, a: r.bottom }; }));
  // Metin kutusu değil gerçek mürekkep genişliği için Range ölçümü
  const metinler = await p.$$eval('.icerik h1, .icerik p', els => els.map(e => {
    const r = document.createRange(); r.selectNodeContents(e); const k = r.getBoundingClientRect();
    return { ad: e.tagName + (e.className ? '.' + e.className : '') + ' (metin)', x: k.left, y: k.top, s: k.right, a: k.bottom };
  }));
  let hepsi = true;
  for (const k of [...kutular, ...metinler]) {
    const ok = k.x >= GUVENLI.x + pay && k.s <= GUVENLI.x + GUVENLI.w - pay && k.y >= GUVENLI.y + pay / 2 && k.a <= GUVENLI.y + GUVENLI.h - pay / 2;
    if (!ok) hepsi = false;
    console.log(`${ok ? 'GEÇTİ' : 'KALDI'}  ${k.ad.padEnd(22)} x:${Math.round(k.x)}-${Math.round(k.s)} y:${Math.round(k.y)}-${Math.round(k.a)}`);
  }
  console.log(hepsi ? `SONUÇ: GEÇTİ (her öğe güvenli alanın ${pay}px içinde)` : 'SONUÇ: KALDI');

  const tam = await p.screenshot();
  const b64 = tam.toString('base64');
  const kirp = (r, gen) => `<div class="et">${gen}</div><div style="width:${r.w * 0.5}px;height:${r.h * 0.5}px;overflow:hidden;position:relative;border:2px solid #444">
      <img src="data:image/png;base64,${b64}" style="position:absolute;width:1280px;height:720px;left:${-r.x * 0.5}px;top:${-r.y * 0.5}px"></div>`;
  const p2 = await b.newPage({ viewport: { width: 1340, height: 100 } });
  await p2.setContent(`<body style="margin:0;padding:20px;background:#1b1b1f;font:bold 22px sans-serif;color:#ddd">
    ${kirp({ x: 0, y: 0, w: 2560, h: 1440 }, 'TV (tam görüntü)')}
    ${kirp(MASAUSTU, 'Bilgisayar (tam genişlik şerit)')}
    ${kirp(GUVENLI, 'Telefon / tablet (en dar görünüm)')}
    <style>.et{margin:18px 0 8px}</style></body>`);
  await p2.screenshot({ path: cikti, fullPage: true });
  await b.close();
  console.log('önizleme: ' + cikti);
  process.exit(hepsi ? 0 : 2);
})();
