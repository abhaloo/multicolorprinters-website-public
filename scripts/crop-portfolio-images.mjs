/**
 * crop-portfolio-images.mjs
 *
 * Crops the bottom ~8% off portfolio PNGs (to remove watermarks)
 * and converts them to WebP in public/images/portfolio/.
 *
 * Usage: node scripts/crop-portfolio-images.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const INPUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'portfolio work');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'portfolio');

const CROP_BOTTOM_PERCENT = 0.08; // 8% off the bottom

const images = [
  'dnata window wrap.png',
  'znz boutique single sheet menu.png',
];

async function processImage(filename) {
  const inputPath = path.join(INPUT_DIR, filename);
  const outputName = filename
    .replace(/\.png$/i, '.webp')
    .replace(/\s+/g, '-')
    .toLowerCase();
  const outputPath = path.join(OUTPUT_DIR, outputName);

  const metadata = await sharp(inputPath).metadata();
  const cropHeight = Math.round(metadata.height * (1 - CROP_BOTTOM_PERCENT));

  await sharp(inputPath)
    .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight })
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log(`${filename} -> ${outputName} (${metadata.width}x${cropHeight})`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  for (const img of images) {
    await processImage(img);
  }
  console.log('\nDone! Output in public/images/portfolio/');
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
