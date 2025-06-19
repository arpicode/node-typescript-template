/// <reference types="vitest" />
import path from 'path'
import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },

  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['**/*.ts'],
      exclude: ['**/main.ts', '**/interfaces/**', ...coverageConfigDefaults.exclude],
    },
  },
})
