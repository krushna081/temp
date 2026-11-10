/* One-shot build utility: rasterizes public/og-card.svg into
   public/og-card.png (1200×630) for Open Graph / Twitter cards.
   Run with: node scripts/build-og-image.mjs  (requires devDependency sharp) */
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'

const input = fileURLToPath(new URL('../public/og-card.svg', import.meta.url))
const output = fileURLToPath(new URL('../public/og-card.png', import.meta.url))

try {
  await sharp(input, { density: 96 })
    .resize(1200, 630)
    .png({ compressionLevel: 9, palette: true })
    .toFile(output)
  console.log('og-card.png written')
} catch (err) {
  console.error('og-card.png FAILED:', err.message)
  process.exit(1)
}
