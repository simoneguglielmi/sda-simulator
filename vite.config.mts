import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/node_modules/**', '**/index.ts'],
      provider: 'v8',
    },
    globals: true,
    restoreMocks: true,
    environment: 'node',
  },
  plugins: [tsconfigPaths()],
});
