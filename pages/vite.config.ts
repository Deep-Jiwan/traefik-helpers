import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const base = process.env.VITE_CDN_URL || '/';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  base,
  build: {
    // Inline small assets
    assetsInlineLimit: 10000, // 10KB
    cssCodeSplit: false,
  },
});
