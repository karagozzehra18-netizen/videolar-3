/**
 * marka_render.js — SVG/HTML dosyasını PNG'ye çevirir (Chromium ile).
 *
 * Kullanım:
 *   node araclar/marka_render.js <girdi.svg|html> <cikti.png> <genislik> <yukseklik> [--olcek 1] [--seffaf]
 *   --seffaf: arka planı şeffaf bırakır (filigran gibi PNG'ler için; SVG'de zemin rect'i olmamalı)
 * Örnek:
 *   node araclar/marka_render.js marka/logo/logo-a.svg marka/logo/logo-a-800.png 800 800
 *
 * Notlar:
 * - Fontlar SVG/HTML içinde @font-face ile marka/fontlar/ klasöründen göreli yolla yüklenir.
 * - Render öncesi tüm fontların yüklenmesi beklenir (document.fonts.ready).
 */
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const [girdi, cikti, w, h] = process.argv.slice(2);
  const olcekIdx = process.argv.indexOf('--olcek');
  const olcek = olcekIdx > 0 ? Number(process.argv[olcekIdx + 1]) : 1;
  const seffaf = process.argv.includes('--seffaf');
  if (!girdi || !cikti || !w || !h) {
    console.error('Kullanım: node araclar/marka_render.js <girdi> <cikti.png> <genislik> <yukseklik> [--olcek 1]');
    process.exit(1);
  }
  const tarayici = await chromium.launch();
  const sayfa = await tarayici.newPage({
    viewport: { width: Number(w), height: Number(h) },
    deviceScaleFactor: olcek,
  });
  await sayfa.goto('file://' + path.resolve(girdi));
  // SVG belgesinin head'i yoktur; zemin zaten boştur. HTML'de body zeminini sıfırla.
  if (seffaf && !girdi.endsWith('.svg')) await sayfa.addStyleTag({ content: 'html,body{background:transparent!important}' });
  await sayfa.evaluate(() => document.fonts && document.fonts.ready);
  await sayfa.waitForTimeout(150);
  await sayfa.screenshot({ path: cikti, omitBackground: seffaf });
  await tarayici.close();
  console.log(`yazıldı: ${cikti} (${w}x${h} @${olcek}x)`);
})();
