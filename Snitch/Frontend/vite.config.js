import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server : {
    proxy : {
      "/api" : {
        target : 'http://localhost:3000',
        changeOrigin : true,
        secure : false // it means it will all http and https request to the target server
      }
    }
  }
})


/*
proxy -> it is used to avoid CORS issues when the frontend and backend are running on different ports. In this case, the frontend is running on port 5173 and the backend is running on port 3000. By using a proxy, we can make requests to the backend without worrying about CORS issues.
        In this project it's forwarding all the requests from http://localhost:5173/api to http://localhost:3000/api. So, when we make a request to /api/auth/register from the frontend, it will be forwarded to http://localhost:3000/api/auth/register on the backend.
 */