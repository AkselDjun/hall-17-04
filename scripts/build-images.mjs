import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "assets/photos";
const OUTPUT_DIR = "public/images";
const WIDTHS = [480, 960, 1600];

const isFresh = async (output, sourceTime) => {
  try {
    return (await stat(output)).mtimeMs >= sourceTime;
  } catch {
    return false;
  }
};

await mkdir(OUTPUT_DIR, { recursive: true });

const sources = (await readdir(SOURCE_DIR)).filter((file) => /\.(jpe?g|png)$/i.test(file));
let generated = 0;

for (const file of sources) {
  const input = path.join(SOURCE_DIR, file);
  const name = path.parse(file).name;
  const sourceTime = (await stat(input)).mtimeMs;
  const { width = WIDTHS.at(-1) } = await sharp(input).metadata();

  for (const target of WIDTHS) {
    const output = path.join(OUTPUT_DIR, `${name}-${target}.webp`);
    if (await isFresh(output, sourceTime)) continue;
    await sharp(input)
      .rotate()
      .resize({ width: Math.min(target, width), withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(output);
    generated += 1;
  }
}

console.log(`images: ${sources.length} sources, ${generated} files generated`);
