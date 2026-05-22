import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        jiuJitsu: resolve(rootDir, 'jiu-jitsu/index.html'),
        muayThai: resolve(rootDir, 'muay-thai/index.html'),
      },
    },
  },
});
