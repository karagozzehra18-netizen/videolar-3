/**
 * logo_kontrol.js — Logoyu profil yuvarlağında farklı boyutlarda gösteren kontrol panosu üretir.
 * Küçük boyutta okunurluğu ve yuvarlağa sığmayı tek bakışta görmek için.
 *
 * Kullanım:
 *   node araclar/logo_kontrol.js <cikti.png> <logo1.png> [logo2.png ...]
 * Her logo bir satır olur; boyutlar: 320, 160, 98 (YouTube), 48, 32 px; koyu ve açık zeminde.
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const [cikti, ...logolar] = process.argv.slice(2);
  if (!cikti || logolar.length === 0) {
    console.error('Kullanım: node araclar/logo_kontrol.js <cikti.png> <logo1.png> [logo2.png ...]');
    process.exit(1);
  }
  const boyutlar = [320, 160, 98, 48, 32];
  const satir = (src, zemin, yazi) => `
    <div class="satir" style="background:${zemin};color:${yazi}">
      <div class="ad">${path.basename(src)}</div>
      ${boyutlar.map(b => `<div class="kutu"><img src="data:image/png;base64,${fs.readFileSync(src).toString('base64')}" style="width:${b}px;height:${b}px"><span>${b}px</span></div>`).join('')}
    </div>`;
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    body{margin:0;font:14px sans-serif;background:#222}
    .satir{display:flex;align-items:center;gap:28px;padding:20px 24px}
    .ad{width:150px;font-weight:bold;word-break:break-all}
    .kutu{display:flex;flex-direction:column;align-items:center;gap:6px}
    img{border-radius:50%;display:block}
  </style></head><body>
    ${logolar.map(l => satir(l, '#0f0f0f', '#ddd') + satir(l, '#f4f4f4', '#222')).join('')}
  </body></html>`;
  const tarayici = await chromium.launch();
  const sayfa = await tarayici.newPage({ viewport: { width: 1100, height: 100 } });
  await sayfa.setContent(html);
  await sayfa.screenshot({ path: cikti, fullPage: true });
  await tarayici.close();
  console.log('yazıldı: ' + cikti);
})();
