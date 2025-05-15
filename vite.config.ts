import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/redhill-kiosk/' : '/', 
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}));
