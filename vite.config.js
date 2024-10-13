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
            return `posts/${name}[extname]`; 
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(name)) { // Using name instead of extType
            extType = 'img';
          } else if (/otf|woff|woff2/i.test(name)) { // Using name instead of extType
            extType = 'fonts';
          } else if (/\.css$/i.test(name)) { // Using name and ensuring .css extension
            extType = 'css';
          } else if (/\.js$/i.test(name)) { // Using name and ensuring .js extension
            extType = 'js';
          } else {
            // Handle other file types or throw an error if needed
            console.warn(`Unhandled asset type for: ${name}`);
            extType = 'misc'; // Or throw an error: throw new Error(...) 
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
