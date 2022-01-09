import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: `${process.cwd()}/src/`,
      },
    ],
  },
  base: "/tin/zjazd7/vue/dist/",
  clearScreen: false,
});
