import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
    plugins: [react()],
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
