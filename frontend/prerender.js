import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = await fs.readFile(toAbsolute('dist/client/index.html'), 'utf-8');
const render = (await import('./dist/server/entry-server.js')).SSRRender;

// determine routes to pre-render from src/pages
const routesToPrerender = (await fs.readdir(toAbsolute('src/pages'))).map((file) => {
  const name = file.replace(/\.tsx$/, '').toLowerCase();
  return name === 'index' ? `/` : `/${name}`;
});

console.log("Generating pages...")
await Promise.all(routesToPrerender.map(async (url, i) => {
  console.log(`[${i+1}/${routesToPrerender.length}] Generating "${url}"...`)

  const appHtml = render(url);
  const html = template.replace(`<!--app-html-->`, appHtml);
  const filePath = `dist/static${url === '/' ? '/index' : url}.html`;
  await fs.writeFile(toAbsolute(filePath), html);

  console.log(`[${i+1}/${routesToPrerender.length}] Generated "${url}"!`)
}))