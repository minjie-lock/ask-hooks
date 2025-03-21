import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path, { join } from 'path'

export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
      copyDtsFiles: true,
      tsconfigPath: './tsconfig.types.json'
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ask-hooks',
      fileName: 'ask-hooks',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
})

