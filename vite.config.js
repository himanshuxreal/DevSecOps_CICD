import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/DevSecOps_CICD/',
  server: {
    port: 3000,
    open: false
  }
});
