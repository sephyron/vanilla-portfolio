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
        assetFileNames: ({ name, source, extType }) => {
          if (/public\/posts/i.test(source)) {
            return `posts/${name}[extname]`; // Use name instead of newName
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          } else if (/otf|woff|woff2/i.test(extType)) {
            extType = 'fonts';
          } else if (/css/i.test(extType)) {
            extType = 'css';
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
      '@': resolve(__dirname, 'src')
    },
  },
  server: {
    open: true,
  },
  publicDir: 'public',
  
})