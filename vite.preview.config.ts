// Preview build (in-memory routing). scripts/make-preview.py then inlines it into one HTML file.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  define: { 'import.meta.env.VITE_MEMORY_ROUTER': JSON.stringify('1') },
  build: { outDir: 'preview-dist', emptyOutDir: true, copyPublicDir: false, modulePreload: false, cssCodeSplit: false },
})
