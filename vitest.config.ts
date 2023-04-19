/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: "./test-utils.tsx",
  },
  
  resolve: {
    alias: {
      pages: path.resolve(__dirname, "./pages"),
      components: path.resolve(__dirname, "./components"),
      utils: path.resolve(__dirname, "./utils"),
    },
  },
})