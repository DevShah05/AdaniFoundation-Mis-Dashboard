import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target = env.VITE_API_BASE_URL || "https://mis.adani.digital";

  return {
    plugins: [react()],
    server: {
      port: 5173,
      https: {
        key: fs.readFileSync(path.resolve(__dirname, "certs/localhost-key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "certs/localhost-cert.pem")),
      },
      proxy: {
        "/auth": {
          target,
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: "localhost",
          cookiePathRewrite: "/",
        },
        "/api": {
          target,
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: "localhost",
          cookiePathRewrite: "/",
        },
      },
    },
  };
});
