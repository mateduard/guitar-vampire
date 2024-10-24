import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config();

const front_port = process.env.VITE_FRONT_PORT; // !! THIS VARIABLE IS IMPORTED BEFORE VITE STARTS SO IT IS CALLED WITH PROCESS.ENV !!!!


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public',
    copyPublicDir: false,
  },
  server: {
    port: front_port,
    /* proxy: {
      '/api': 'http://localhost:5000',
    } */
  }
})
