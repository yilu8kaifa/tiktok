import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import VueSetupExtend from "vite-plugin-vue-setup-extend"
import { VantResolver } from 'unplugin-vue-components/resolvers';
const scss_path = `@/assets/init.scss`

const addScssPath = `@/assets/scss/theme.scss`
const mode = process.env.flag || 'test'
console.log('mode', mode)

const publicPath = (process.env.NODE_ENV === 'development' ? '/': './') // 用于打包5+
export default defineConfig({
  base: '/www/', // '/www/', 用于线上发布
  plugins: [
    vue(),
    /** setup 语法糖导出 vue 文件name 属性，用于页面 keepAlive */
    VueSetupExtend(),
    Components({
      resolvers: [VantResolver()],
      directoryAsNamespace: true,
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    })
  ],
  css: {
    postcssOptions: {
      config: './postcss.config.js',
    },
    loaderOptions: {
      scss: {
        additionalData: `@import "${scss_path}";`
      },
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${addScssPath}";`
      }
    }
  },
  server: {
    open: true,
    port: 8080,
    hmr: true,
    host: '0.0.0.0',
    proxy: {
      "/wap/api": {
        target: "https://thsjbvh.site",
        changeOrigin: true,
        secure: false
      },
      "/wap/seller": {
        target: "https://thsjbvh.site",
        changeOrigin: true,
        secure: false
      },
      "/wap/public": {
        target: "https://thsjbvh.site",
        changeOrigin: true,
        secure: false
      },
      "/api": {
        target: "https://thsjbvh.site",
        changeOrigin: true,
        secure: false
      }
    },
  },
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      "~": path.resolve(__dirname, './'),
      "@": path.resolve(__dirname, 'src'),
    }
  },
  build: {
    target: 'es2015',
    assetsDir: "static",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: {
        dir: `dist/${mode}`,
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/name-[hash].[ext]"
      }
    },
  }
})

const globalSass = config => {
  const oneOfsMap = config.module.rule('scss').oneOfs.store
  oneOfsMap.forEach(item => {
    item
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        resources: '@/assets/init.scss'
      })
      .end()
  });
}
