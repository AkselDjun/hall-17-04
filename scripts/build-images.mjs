import { createHash } from "node:crypto";
import { access, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/photos";
const OUTPUT_DIR = "public/images";
const MANIFEST = "src/content/photos.json";
const WIDTHS = [320, 480, 640, 960, 1280, 1600];
const FORMATS = {
  avif: (image) => image.avif({ quality: 50, effort: 5 }),
  webp: (image) => image.webp({ quality: 72, effort: 6 }),
};
const SETTINGS = JSON.stringify({ WIDTHS, avif: [50, 5], webp: [72, 6], placeholder: 24 });

const exists = (file) =>
  access(file).then(
    () => true,
    () => false,
  );

const readManifest = async () => {
  try {
    return JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    return {};
  }
};

const variantWidths = (sourceWidth) => {
  const widths = WIDTHS.filter((width) => width < sourceWidth);
  return [...widths, Math.min(sourceWidth, WIDTHS.at(-1))];
};

const placeholderFor = async (input) => {
  const buffer = await sharp(input).rotate().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
};

await mkdir(OUTPUT_DIR, { recursive: true });

const previous = await readManifest();
const manifest = {};
const keep = new Set();
const sources = (await readdir(SOURCE_DIR)).filter((file) => /\.(jpe?g|png)$/i.test(file)).sort();
let encoded = 0;

for (const file of sources) {
  const input = path.join(SOURCE_DIR, file);
  const name = path.parse(file).name;
  const hash = createHash("sha1").update(await readFile(input)).update(SETTINGS).digest("hex").slice(0, 16);
  const { width: sourceWidth, height: sourceHeight, orientation } = await sharp(input).metadata();
  const rotated = orientation && orientation >= 5;
  const width = rotated ? sourceHeight : sourceWidth;
  const height = rotated ? sourceWidth : sourceHeight;
  const widths = variantWidths(width);
  const outputs = widths.flatMap((size) => Object.keys(FORMATS).map((format) => path.join(OUTPUT_DIR, `${name}-${size}.${format}`)));
  for (const file of outputs) keep.add(path.basename(file));
  const cached = previous[name];
  const fresh = cached?.hash === hash && (await Promise.all(outputs.map(exists))).every(Boolean);

  if (!fresh) {
    for (const size of widths) {
      for (const [format, encode] of Object.entries(FORMATS)) {
        await encode(sharp(input).rotate().resize({ width: size })).toFile(path.join(OUTPUT_DIR, `${name}-${size}.${format}`));
        encoded += 1;
      }
    }
  }

  manifest[name] = {
    hash,
    width,
    height,
    widths,
    placeholder: fresh ? cached.placeholder : await placeholderFor(input),
  };
}

const stale = (await readdir(OUTPUT_DIR)).filter((file) => !keep.has(file));
await Promise.all(stale.map((file) => rm(path.join(OUTPUT_DIR, file))));

await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`images: ${sources.length} sources, ${encoded} files encoded, ${stale.length} removed`);
