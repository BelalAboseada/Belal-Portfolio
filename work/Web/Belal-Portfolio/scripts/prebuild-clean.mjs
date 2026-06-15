import { existsSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const LOG_ENDPOINT =
  'http://127.0.0.1:7747/ingest/becd3696-df5b-456c-8c33-414d20522762';
const SESSION_ID = 'af7fbf';

const serverDir = join('.next', 'server');
const runtimePath = join(serverDir, 'webpack-runtime.js');
const chunkAtRoot = join(serverDir, '548.js');
const chunkInChunks = join(serverDir, 'chunks', '548.js');

function log(hypothesisId, message, data) {
  // #region agent log
  fetch(LOG_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Debug-Session-Id': SESSION_ID,
    },
    body: JSON.stringify({
      sessionId: SESSION_ID,
      runId: 'pre-fix',
      hypothesisId,
      location: 'scripts/prebuild-clean.mjs',
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

const hasNextDir = existsSync('.next');
const hasRuntime = existsSync(runtimePath);
let runtimeSnippet = '';
let usesChunksPrefix = false;
let isDevRuntime = false;

if (hasRuntime) {
  runtimeSnippet = readFileSync(runtimePath, 'utf8').slice(0, 200);
  usesChunksPrefix = runtimeSnippet.includes('./chunks/');
  isDevRuntime = runtimeSnippet.includes('eval-source-map');
}

const diagnostics = {
  hasNextDir,
  hasRuntime,
  chunkAtRoot: existsSync(chunkAtRoot),
  chunkInChunks: existsSync(chunkInChunks),
  usesChunksPrefix,
  isDevRuntime,
  runtimeSnippet,
};

log('A', 'prebuild .next diagnostics', diagnostics);
log('B', 'dev runtime detected', { isDevRuntime, hypothesis: 'stale dev cache' });
log('C', 'chunk path mismatch', {
  chunkAtRoot: diagnostics.chunkAtRoot,
  chunkInChunks: diagnostics.chunkInChunks,
  usesChunksPrefix,
  hypothesis: 'webpack-runtime expects different path than emitted chunks',
});

if (hasNextDir) {
  rmSync('.next', { recursive: true, force: true });
  log('A', 'removed stale .next before production build', { removed: true });
}
