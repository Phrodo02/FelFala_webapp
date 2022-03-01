/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue()],
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
  build: {
    sourcemap: true,
  },
  test: {
    environment: "jsdom",
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
});
