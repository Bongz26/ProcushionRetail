import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/ProcushionRetail/", // Base path for GitHub Pages
  plugins: [react()]
})

