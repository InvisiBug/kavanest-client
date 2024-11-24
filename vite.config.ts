import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

import fs from "fs";

// https://vite.dev/config/
// export default defineConfig({

//   plugins: [react()],
//   resolve: {
//     alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
//   },
//   server: {
//     host: true,
//     port: 3000,
//     strictPort: true,
//   },
//   base: "/",
//   define: {
//     VITE_APP_BACKEND_ADDRESS: JSON.stringify(env.VITE_APP_BACKEND_ADDRESS),
//   }
// });

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      VitePWA({
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        manifest: {
          name: "My Awesome App",
          short_name: "MyApp",
          description: "My Awesome App description",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
          display: "standalone",
        },
      }),
      // {
      //   name: "postbuild-commands",
      //   closeBundle: () => {
      //     const path = "./dist/manifest.json";
      //     const manifest = JSON.parse(fs.readFileSync(path).toString());
      //     manifest["display"].customProp = "standalone";
      //     fs.writeFileSync(path, JSON.stringify(manifest, null, 2));
      //   },
      // },
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
