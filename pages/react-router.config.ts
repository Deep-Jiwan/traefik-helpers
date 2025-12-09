import type { Config } from "@react-router/dev/config";

export default {
  // Enable SPA mode for static file generation
  ssr: false,
  // Configure build to inline assets
  buildDirectory: "build",
} satisfies Config;
