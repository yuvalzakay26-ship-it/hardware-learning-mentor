// יצירת אייקוני PWA מ-SVG יחיד באמצעות sharp.
// הרצה:  node scripts/generate-icons.mjs
// התוצרים נשמרים ב-public/icons/ ומשמשים את app/manifest.ts.
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "icons");

// פלטת "סיליקון ונחושת" — זהה ל-globals.css
const NAVY = "#16263f";
const NAVY_DEEP = "#0d1830";
const COPPER = "#b3541e";
const COPPER_LIGHT = "#d98a4e";
const COPPER_TINT = "#faeadd";

/**
 * מייצר את ה-SVG של האייקון.
 * @param {number} pad - שוליים פנימיים באחוזים (0.06 לרגיל, 0.18 ל-maskable
 *   כדי שהתוכן החשוב יישאר ב"אזור הבטוח" של אנדרואיד).
 */
function iconSvg(pad = 0.06) {
  const S = 512;
  const m = S * pad; // שוליים
  const inner = S - m * 2; // גודל גוף השבב
  const x = m;
  const y = m;
  const r = inner * 0.22; // עיגול פינות
  // רשת המוליכים (traces) — נחושת יוצאת מגוף השבב
  const die = inner * 0.42; // הגרעין המרכזי
  const cx = S / 2;
  const cy = S / 2;
  const dieX = cx - die / 2;
  const dieY = cy - die / 2;
  const pinLen = inner * 0.16;
  const pinW = inner * 0.055;
  const gap = die / 4;

  // רגליים (pins) בארבעת הצדדים
  const pins = [];
  for (let i = -1; i <= 1; i++) {
    const off = i * gap;
    // עליון + תחתון
    pins.push(
      `<rect x="${cx + off - pinW / 2}" y="${dieY - pinLen}" width="${pinW}" height="${pinLen}" rx="${pinW / 2}" fill="${COPPER}"/>`,
      `<rect x="${cx + off - pinW / 2}" y="${dieY + die}" width="${pinW}" height="${pinLen}" rx="${pinW / 2}" fill="${COPPER}"/>`,
      // שמאל + ימין
      `<rect x="${dieX - pinLen}" y="${cy + off - pinW / 2}" width="${pinLen}" height="${pinW}" rx="${pinW / 2}" fill="${COPPER}"/>`,
      `<rect x="${dieX + die}" y="${cy + off - pinW / 2}" width="${pinLen}" height="${pinW}" rx="${pinW / 2}" fill="${COPPER}"/>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 ${S} ${S}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_DEEP}"/>
    </linearGradient>
    <linearGradient id="die" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${COPPER}"/>
      <stop offset="1" stop-color="${COPPER_LIGHT}"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${S}" height="${S}" fill="url(#bg)"/>
  <rect x="${x}" y="${y}" width="${inner}" height="${inner}" rx="${r}" fill="none" stroke="${COPPER}" stroke-opacity="0.35" stroke-width="${inner * 0.012}"/>
  ${pins.join("\n  ")}
  <rect x="${dieX}" y="${dieY}" width="${die}" height="${die}" rx="${die * 0.18}" fill="url(#die)"/>
  <rect x="${dieX + die * 0.14}" y="${dieY + die * 0.14}" width="${die * 0.72}" height="${die * 0.72}" rx="${die * 0.12}" fill="none" stroke="${NAVY_DEEP}" stroke-opacity="0.55" stroke-width="${die * 0.045}"/>
  <circle cx="${cx}" cy="${cy}" r="${die * 0.14}" fill="${COPPER_TINT}"/>
</svg>`;
}

const targets = [
  { file: "icon-192.png", size: 192, pad: 0.06 },
  { file: "icon-512.png", size: 512, pad: 0.06 },
  { file: "icon-maskable-192.png", size: 192, pad: 0.18 },
  { file: "icon-maskable-512.png", size: 512, pad: 0.18 },
  { file: "apple-touch-icon.png", size: 180, pad: 0.1 },
];

await mkdir(outDir, { recursive: true });
for (const t of targets) {
  const svg = Buffer.from(iconSvg(t.pad));
  await sharp(svg).resize(t.size, t.size).png().toFile(join(outDir, t.file));
  console.log(`✓ ${t.file} (${t.size}×${t.size})`);
}

// favicon.ico בסיסי בגודל 48 (לטאב הדפדפן)
await sharp(Buffer.from(iconSvg(0.06)))
  .resize(48, 48)
  .toFormat("png")
  .toFile(join(root, "public", "favicon.png"));
console.log("✓ favicon.png (48×48)");
console.log("סיום — כל האייקונים נוצרו ב-public/icons/");
