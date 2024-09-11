import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '',
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(-1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/otf|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            extType = 'css';
          }  else if (/posts/i.test(extType)) {
            extType = 'md';
          } 
          return `${extType}/[name][extname]`;
        },
        entryFileNames: 'js/[name].js', 
        chunkFileNames: 'js/[name].js',
        
      },
    },
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@posts': resolve(__dirname, 'public/posts'),
    },
  },
  server: {
    open: true,
  },
  publicDir: 'public',
  
})