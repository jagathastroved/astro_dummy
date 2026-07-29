import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'iOS >= 13', 'Safari >= 13'],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  server: {
    proxy: {
      '/api/proxy/menu': {
        target: 'https://www.astroved.com/mainmenunew.json',
        changeOrigin: true,
        rewrite: () => '',
      },
    },
  },
  // base: '/ReactHome/'
});