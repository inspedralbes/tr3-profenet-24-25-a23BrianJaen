import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: true,
    port: import.meta.env.ASTRO_PORT
  }
});