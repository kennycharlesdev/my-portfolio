// Verifies every local file referenced by index.html and style.css exists.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const root = join(dirname(new URL(import.meta.url).pathname), "..");
const files = ["index.html", "style.css"];
const refRe = /(?:src|href)=["']([^"'#]+)["']|url\(["']?([^"')]+)["']?\)/g;
let missing = 0;
let checked = 0;

for (const file of files) {
  const text = readFileSync(join(root, file), "utf8");
  for (const m of text.matchAll(refRe)) {
    const ref = (m[1] || m[2]).trim();
    if (/^(https?:|mailto:|data:|var\()/.test(ref) || ref.startsWith("//")) continue;
    checked++;
    if (!existsSync(join(root, ref))) {
      console.error(`✗ ${file}: missing ${ref}`);
      missing++;
    }
  }
}

console.log(`Checked ${checked} local references, ${missing} missing.`);
process.exit(missing ? 1 : 0);
