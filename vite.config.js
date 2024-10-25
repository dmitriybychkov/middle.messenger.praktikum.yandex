import handlebars from 'vite-plugin-handlebars';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '',
  assetsInclude: '**/*.hbs',
  root: resolve(__dirname),
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      }
    }
  },
  server: {
    port: 3000,
  },

  plugins: [handlebars(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/static/images',
          dest: 'src/static/images',
        },
      ],
    })],
});
