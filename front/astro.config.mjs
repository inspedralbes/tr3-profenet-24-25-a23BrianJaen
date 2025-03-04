import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  server: {
    // watch: {
    //   usePolling: true, // Habilita la recarga en vivo si tienes problemas con el sistema de archivos
    // },
    port: import.meta.env.PUBLIC_ASTRO_PORT || 4321
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),  // ✅ Alias para la carpeta src
    },
  },
})
