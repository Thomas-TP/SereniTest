import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "5174-iv4efnc43uv0xdd3iwwdq-3f9999db.manusvm.computer",
      "localhost"
    ]
  }
})
