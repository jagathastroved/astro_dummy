
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
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