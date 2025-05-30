import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

dotenv.config();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      // "process.env.VITE_EVBP_MUSIC_API_BASE_URL": JSON.stringify(env.SOME_KEY),
      "process.env": process.env,
    },
    plugins: [react(), tsconfigPaths()],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
