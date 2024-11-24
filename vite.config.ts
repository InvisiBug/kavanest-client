import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      VitePWA({
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        manifest: {
          short_name: "KavaNest",
          name: "KavaNest Control Interface",
          icons: [
            {
              src: "favicon.ico",
              sizes: "64x64 32x32 24x24 16x16",
              type: "image/x-icon",
            },
            {
              src: "logo192.png",
              type: "image/png",
              sizes: "192x192",
            },
            {
              src: "logo512.png",
              type: "image/png",
              sizes: "512x512",
            },
          ],
          start_url: ".",
          display: "standalone",
          theme_color: "#000000",
          background_color: "#000000",
        },
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    base: "/",
    server: {
      port: 3000,
      host: true,
      watch: {
        usePolling: true,
      },
      esbuild: {
        target: "esnext",
        platform: "linux",
      },
    },
    define: {
      VITE_API: JSON.stringify(env.VITE_API),
      VITE_SOCKET: JSON.stringify(env.VITE_SOCKET),
    },
  };
});
