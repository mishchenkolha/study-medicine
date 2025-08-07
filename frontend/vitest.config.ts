import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['ui/**/*.test.{ts,tsx}', 'services/**/*.test.{ts,tsx}'],
  },
  plugins: [tsconfigPaths()],
});
