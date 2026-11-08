// Builds public/og-card.jpg, the 1200x630 preview shown when the site is shared
// (LinkedIn, Slack, etc.). Re-run after changing the portrait, name or title:
//   node scripts/og-card.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;
const photoW = 420;

const text = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#141311"/>
  <rect x="0" y="0" width="12" height="${H}" fill="#f08c5f"/>
  <text x="80" y="200" font-family="Georgia, serif" font-size="76" fill="#ede7db">Syed Usman</text>
  <text x="80" y="270" font-family="Helvetica, Arial, sans-serif" font-size="32" fill="#f08c5f">Senior DevOps &amp; Platform Engineer · Berlin</text>
  <text font-family="Georgia, serif" font-size="31" fill="#cbc3b4">
    <tspan x="80" y="380">A decade of hardware, cloud and Kubernetes.</tspan>
    <tspan x="80" y="430">Now I build infrastructure with AI agents,</tspan>
    <tspan x="80" y="480">and the guardrails around them.</tspan>
  </text>
  <text x="80" y="565" font-family="Helvetica, Arial, sans-serif" font-size="24" fill="#a0978a">syed-usman.github.io</text>
</svg>`;

const photo = await sharp('src/assets/display-picture.jpg')
  .resize(photoW, H, { fit: 'cover', position: 'top' })
  .toBuffer();

await sharp(Buffer.from(text))
  .composite([{ input: photo, left: W - photoW, top: 0 }])
  .jpeg({ quality: 86 })
  .toFile('public/og-card.jpg');

console.log('Wrote public/og-card.jpg');
