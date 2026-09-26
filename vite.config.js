// Exemplo CASO fosse utilizar o GitHub Pages em uma subpasta
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/nossa-ong/', // Nome do repositório no GitHub
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projetos: resolve(__dirname, 'projetos.html'),
        cadastro: resolve(__dirname, 'cadastro.html'),
      },
    },
  },
});