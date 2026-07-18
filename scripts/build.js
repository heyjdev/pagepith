import { build } from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

await build({
  entryPoints: [path.join(root, 'src/content-entry.js')],
  outfile: path.join(dist, 'content.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'chrome120',
  minify: true,
  legalComments: 'none'
});

for (const file of ['manifest.json', 'popup.html', 'popup.css', 'popup.js']) {
  await cp(path.join(root, 'src', file), path.join(dist, file));
}
await cp(path.join(root, 'src', 'icons'), path.join(dist, 'icons'), { recursive: true });
console.log(`Built unpacked extension: ${dist}`);
