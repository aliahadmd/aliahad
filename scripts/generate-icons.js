import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SIZES = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'icon-192x192.png': 192,
  'icon-512x512.png': 512
};

async function generateIcons() {
  const inputSvg = join(__dirname, '../public/icon-base.svg');
  const svgContent = await fs.readFile(inputSvg, 'utf8');

  for (const [filename, size] of Object.entries(SIZES)) {
    const outputPath = join(__dirname, '../public', filename);
    
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`Generated ${filename}`);
  }
}

generateIcons().catch(console.error);
