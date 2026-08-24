import { existsSync, rmSync } from 'node:fs';

// Remove any stale .next build cache before a production build.
// This prevents chunk-path mismatches between a previous dev build
// and the fresh production build Vercel is about to run.
if (existsSync('.next')) {
  rmSync('.next', { recursive: true, force: true });
  console.log('[prebuild] Removed stale .next cache.');
}
