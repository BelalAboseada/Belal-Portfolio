/**
 * Derives every web/PWA icon the site serves from the visual identity kit in
 * `public/belal-visual-identity/`. The kit is the source of truth — re-run this
 * (`node scripts/generate-icons.mjs`) whenever the kit is updated.
 */
import sharp from 'sharp';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const KIT = 'public/belal-visual-identity/visual';
const APP_ICON = join(KIT, '03-app-icons/app-icon-1024.png');
const APP_ICON_SVG = join(KIT, '03-app-icons/app-icon.svg');
const FAVICON_SVG = join(KIT, '03-app-icons/favicon.svg');
const MARK_950 = join(KIT, '01-logo/B-mark-950.svg');
const MARK_WHITE = join(KIT, '01-logo/B-mark-white.svg');
const MARK_500 = join(KIT, '01-logo/B-mark-500.svg');
const OG_IMAGE = join(KIT, '05-social/og-image.png');
const AVATAR_DARK = join(KIT, '05-social/avatar-dark.png');

const ICONS_DIR = 'public/icons';
const BRAND_DIR = 'public/brand';
const APP_DIR = 'src/app';

/** #1c1d16 — theme_color / darkest in the Flax Smoke ramp. */
const INK = '#1c1d16';

const mkdirp = (dir) => {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
};

async function main() {
  [ICONS_DIR, BRAND_DIR].forEach(mkdirp);

  // --- PWA icons -----------------------------------------------------------
  for (const size of [192, 512]) {
    await sharp(APP_ICON)
      .resize(size, size, { fit: 'contain' })
      .png()
      .toFile(join(ICONS_DIR, `icon-${size}.png`));
    console.log(`generated ${ICONS_DIR}/icon-${size}.png`);
  }

  // Maskable: the mark must sit inside the central 80% safe zone, with the
  // background bleeding to the edges so Android can crop to any shape.
  for (const size of [192, 512]) {
    const pad = Math.round(size * 0.19);
    const inner = size - pad * 2;
    const scaled = await sharp(APP_ICON)
      .resize(inner, inner, { fit: 'contain', background: INK })
      .flatten({ background: INK }) // drop the rounded-corner alpha — the mask supplies the shape
      .toBuffer();
    await sharp(scaled)
      .extend({ top: pad, bottom: pad, left: pad, right: pad, background: INK })
      .png()
      .toFile(join(ICONS_DIR, `icon-${size}-maskable.png`));
    console.log(`generated ${ICONS_DIR}/icon-${size}-maskable.png`);
  }

  // --- Next.js app-dir file conventions (favicon + apple icon) -------------
  copyFileSync(FAVICON_SVG, join(APP_DIR, 'icon.svg'));
  console.log(`copied  ${APP_DIR}/icon.svg`);

  await sharp(APP_ICON)
    .resize(512, 512, { fit: 'contain' })
    .png()
    .toFile(join(APP_DIR, 'icon.png'));
  console.log(`generated ${APP_DIR}/icon.png`);

  await sharp(APP_ICON)
    .resize(180, 180, { fit: 'contain' })
    .flatten({ background: INK })
    .png()
    .toFile(join(APP_DIR, 'apple-icon.png'));
  console.log(`generated ${APP_DIR}/apple-icon.png`);

  // --- Short, stable public URLs for the assets the site links to ----------
  const brandCopies = [
    [MARK_950, 'b-mark.svg'],
    [MARK_WHITE, 'b-mark-white.svg'],
    [MARK_500, 'b-mark-accent.svg'],
    [APP_ICON_SVG, 'app-icon.svg'],
    [OG_IMAGE, 'og-image.png'],
    [AVATAR_DARK, 'avatar.png'],
  ];
  for (const [from, to] of brandCopies) {
    copyFileSync(from, join(BRAND_DIR, to));
    console.log(`copied  ${BRAND_DIR}/${to}`);
  }
}

main().catch((error) => {
  console.error('icon generation failed:', error);
  process.exit(1);
});
