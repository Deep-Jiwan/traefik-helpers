import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.VITE_CDN_URL || '/',
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  build: {
    assetsInlineLimit: 10000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: () => 'main',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/main.css';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
});