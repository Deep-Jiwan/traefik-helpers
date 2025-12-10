import type { Config } from "@react-router/dev/config";

export default {
  // Enable SPA mode for static file generation
  ssr: false,
  // Configure build to inline assets
  buildDirectory: "build",
  // Prerender static pages for each error code
  prerender: async () => {
    const errorCodes = ['401', '403', '404', '405', '500', '502', '503'];
    return [
      "/",
      ...errorCodes.map(code => `/${code}`),
    ];
  },
} satisfies Config;
