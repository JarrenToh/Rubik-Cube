import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ include: "**/*.{js,jsx,ts,tsx}" })],
  server: {
    watch: {
      usePolling: true,
    },
  },
});
