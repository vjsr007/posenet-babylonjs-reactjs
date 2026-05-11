import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    target: "es2022",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "babylon-core": ["@babylonjs/core"],
          "babylon-loaders": ["@babylonjs/loaders"],
          "tf-core": ["@tensorflow/tfjs-core", "@tensorflow/tfjs-backend-webgl"],
          "tf-pose": ["@tensorflow-models/pose-detection"],
        },
      },
    },
  },
  worker: {
    format: "es",
  },
});
