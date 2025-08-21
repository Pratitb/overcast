import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Your framework plugin (e.g., react())
  plugins: [],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/partials/variables" as *;
          @use "@/styles/partials/extends" as *;
        `,
      },
    },
  },
});
