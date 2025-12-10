import type { Config } from "@react-router/dev/config";

export default {
  // Server-side render for static HTML generation
  ssr: true,
  // Configure build to inline assets
  buildDirectory: "build"
} satisfies Config;
