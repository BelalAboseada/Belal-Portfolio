import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ICON_SOURCE = 'src/app/icon.jpg';
const OUTPUT_DIR = 'public/icons';

async function generateIcons() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    // Standard 192x192
    await sharp(ICON_SOURCE)
      .resize(192, 192, { fit: 'cover' })
      .toFile(join(OUTPUT_DIR, 'icon-192.png'));
    console.log('✅ Generated icon-192.png');

    // Standard 512x512
    await sharp(ICON_SOURCE)
      .resize(512, 512, { fit: 'cover' })
      .toFile(join(OUTPUT_DIR, 'icon-512.png'));
    console.log('✅ Generated icon-512.png');

    // Maskable 512x512 (with padding for Android adaptive icons)
    await sharp(ICON_SOURCE)
      .resize(410, 410, { fit: 'cover' }) // Scale down to leave safe zone
      .extend({
        top: 51,
        bottom: 51,
        left: 51,
        right: 51,
        background: '#1c1d16' // Match theme_color
      })
      .toFile(join(OUTPUT_DIR, 'icon-512-maskable.png'));
    console.log('✅ Generated icon-512-maskable.png');

  } catch (error) {
    console.error('❌ Error generating icons:', error);
  }
}

generateIcons();
