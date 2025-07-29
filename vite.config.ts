// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/Components'),
      Data: path.resolve(__dirname, 'src/Data'),
      Types: path.resolve(__dirname, 'src/Types'),
      Verticals: path.resolve(__dirname, 'src/Verticals'),
    },
  },
});
