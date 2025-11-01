import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const ignoreFile = path.join(distDir, '.assetsignore');

try {
  if (!fs.existsSync(distDir)) {
    console.warn('[write-assetsignore] dist directory not found, skipping .assetsignore creation');
    process.exit(0);
  }

  fs.writeFileSync(ignoreFile, '_worker.js\n', { encoding: 'utf8' });
  console.log('[write-assetsignore] Wrote .assetsignore to', ignoreFile);
} catch (err) {
  console.error('[write-assetsignore] Failed to write .assetsignore', err);
  process.exit(1);
}
