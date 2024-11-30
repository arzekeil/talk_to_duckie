import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Development server port
    proxy: {
      '/proxy': {
        target: 'http://127.0.0.1:9000', // Replace with your backend server's Docker service name and port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, ''), // Optional: rewrite the API prefix
      },
      '/ai-response': {
        target: 'http://127.0.0.1:5000', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ai-response/, ''), // Optional: rewrite the API prefix
      },
    },
  },
});
