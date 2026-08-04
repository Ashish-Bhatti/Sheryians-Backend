import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    host : '0.0.0.0',
    port : 5173 ,
    allowedHosts : true
    // vite create outer traffic (from router) and service treated differently and that why we use this to allow the traffic from the router server
  }
})
