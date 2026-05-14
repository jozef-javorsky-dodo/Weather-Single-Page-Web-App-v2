import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";



export default defineConfig({
  plugins: [
    svelte(),

    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Weather App SPA",
        short_name: "Weather",
        description: "Real-time weather conditions for any city worldwide.",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",

        icons: [
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
          {
            src: "icon.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],

  build: {
    target: "es2022",
    minify: "terser",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },

    assetsInlineLimit: 4096,
  },
});
