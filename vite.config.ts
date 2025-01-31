import { defineConfig } from "vite"
import { defineConfig as defineVitestConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(
  defineVitestConfig({
    plugins: [react(), tailwindcss()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
    },
  }),
)

