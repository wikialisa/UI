// scripts/build_pages.js
import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

console.log('🚀 [GitHub Pages Builder] Finalizing multi-target static deployment...');

// 1. Rename dist/template.html to dist/index.html
const distTemplate = path.join(DIST_DIR, 'template.html');
const distIndex = path.join(DIST_DIR, 'index.html');
const dist404 = path.join(DIST_DIR, '404.html');
const distNoJekyll = path.join(DIST_DIR, '.nojekyll');

if (fs.existsSync(distTemplate)) {
  fs.copyFileSync(distTemplate, distIndex);
  fs.unlinkSync(distTemplate);
  console.log('✅ Renamed dist/template.html -> dist/index.html');
}

// 2. Create 404.html fallback
if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, dist404);
  console.log('✅ Created dist/404.html for SPA route fallback');
}

// 3. Ensure .nojekyll in dist
fs.writeFileSync(distNoJekyll, '', 'utf-8');

// 4. Copy production build to ROOT of repo (for GitHub Pages serving from main root)
const rootIndex = path.join(ROOT_DIR, 'index.html');
const root404 = path.join(ROOT_DIR, '404.html');
const rootNoJekyll = path.join(ROOT_DIR, '.nojekyll');

fs.copyFileSync(distIndex, rootIndex);
fs.copyFileSync(distIndex, root404);
fs.writeFileSync(rootNoJekyll, '', 'utf-8');
console.log('✅ Synced production build to root (index.html, 404.html, .nojekyll)');

// 5. Sync dist/assets to root assets/
const distAssets = path.join(DIST_DIR, 'assets');
const rootAssets = path.join(ROOT_DIR, 'assets');
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, rootAssets, { recursive: true });
  console.log('✅ Synced dist/assets to root assets/');
}

// 6. Sync to docs/ (for GitHub Pages serving from /docs)
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}
fs.copyFileSync(distIndex, path.join(DOCS_DIR, 'index.html'));
fs.copyFileSync(distIndex, path.join(DOCS_DIR, '404.html'));
fs.writeFileSync(path.join(DOCS_DIR, '.nojekyll'), '', 'utf-8');
console.log('✅ Synced production build to docs/ (index.html, 404.html, .nojekyll)');

console.log('🎉 GitHub Pages multi-target deployment files ready!');
