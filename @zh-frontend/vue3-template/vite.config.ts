import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnpluginI18n from '@intlify/unplugin-vue-i18n/vite'
import UnpluginIcons from 'unplugin-icons/vite'
import UnpluginRouter from 'unplugin-vue-router/vite'
import UnpluginUnoCSS from 'unocss/vite'
import UnpluginLayouts from 'vite-plugin-vue-layouts'
import UnpluginComponents from 'unplugin-vue-components/vite'
import UnpluginAutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { IconfontToIconify } from '@zh-plugin/icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { ExternalPackageIconLoader } from 'unplugin-icons/loaders'
import { VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import Markdown from 'unplugin-vue-markdown/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  environments: {},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vueJsx({
      isCustomElement: (element) => element.indexOf('swiper') >= 0, //声明swiper为自定义html元素（webcomponent）而非vue组件
    }),
    VueMacros({
      plugins: {
        vue: vue({
          include: [/\.vue$/, /\.md$/], // <-- 允许vue编译mkdow组件
        }),
      },
    }),

    vueDevTools(),
    Markdown({
      headEnabled: true, // <-- 启用mkdown设置文档标题，会编译成unhead/vue的api  useHaed(xx)，
    }),
    MyAutoImport(),
    UnpluginI18n(),
    viteMockServe(),
    IconfontToIconify({
      inputFile: './src/assets/iconfont.js',
      outputDir: './node_modules',
      pkgName: '@iconify-json/custom',
      prefix: 'custom',
    }),
    UnpluginLayouts(),
    UnpluginUnoCSS({
      mode: 'global',
      configFile: './unocss.config.ts',
    }),
    UnpluginRouter({
      dts: './unplugin-router.d.ts',
      routesFolder: './src/pages',
      extensions: ['vue', 'md'],
    }),
    // should be placed after `Markdown()`
    UnpluginComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          prefix: 'icon',
          enabledCollections: ['ep', 'custom', 'carbon'],
        }),
        ElementPlusResolver(),
        VueUseComponentsResolver(),
      ],
      dirs: ['src/components', 'src/models'],
      dts: './unplugin-components.d.ts',
    }),
    UnpluginIcons({
      autoInstall: true,
      customCollections: {
        ...ExternalPackageIconLoader('@iconify-json/custom'),
      },
      transform(svg, collection, icon) {
        if (collection === 'custom')
          return svg.replace(/^<svg /, '<svg width="1.2em" height="1.2em"')
        return svg
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: 960,
          unitPrecision: 5, // 单位转换后保留的精度
          propList: ['*', '!font*'], // 能转化为vw的属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: false, // 媒体查询里的单位是否需要转换单位
          replace: true, //  是否直接更换属性值，而不添加备用属性
          exclude: [/node_modules\/ant-design-vue/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
          landscape: true, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', // 横屏时使用的单位
          landscapeWidth: 1024, // 横屏时使用的视口宽度
        }) as any,
      ],
    },
  },
})

function MyAutoImport() {
  return UnpluginAutoImport({
    resolvers: [
      ElementPlusResolver(),
      IconsResolver({
        prefix: 'icon',
        enabledCollections: ['ep', 'custom', 'carbon'],
      }),
    ],
    // targets to transform
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],

    // global imports to register
    imports: [
      // presets
      'vue',
      'pinia',
      'vue-router',
      '@vueuse/core',
      // custom
      VueRouterAutoImports,
      {
        axios: [
          ['default', 'axios'], // import { default as axios } from 'axios',
        ],
      },
    ],

    // Array of strings of regexes that contains imports meant to be filtered out.
    ignore: ['useMouse', 'useFetch'],

    // Enable auto import by filename for default module exports under directories
    defaultExportByFilename: false,

    // Options for scanning directories for auto import
    dirsScanOptions: {
      types: true, // Enable auto import the types under the directories
    },

    // Auto import for module exports under directories
    // by default it only scan one level of modules under the directory
    dirs: [
      './src/hooks/**',
      './src/composables/**', // only root modules
      './src/composables/**', // all nested modules
      // ...

      {
        glob: './src/hooks/**',
        types: true, // enable import the types
      },
      {
        glob: './src/composables/**',
        types: false, // If top level dirsScanOptions.types importing enabled, just only disable this directory
      },
      // ...
    ],

    // Filepath to generate corresponding .d.ts file.
    // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
    // Set `false` to disable.
    dts: './unplugin-imports.d.ts',

    // Array of strings of regexes that contains imports meant to be ignored during
    // the declaration file generation. You may find this useful when you need to provide
    // a custom signature for a function.
    ignoreDts: ['ignoredFunction', /^ignore_/],

    // Auto import inside Vue template
    // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
    vueTemplate: false,

    // Auto import directives inside Vue template
    // see https://github.com/unjs/unimport/pull/374
    vueDirectives: undefined,

    // Include auto-imported packages in Vite's `optimizeDeps` options
    // Recommend to enable
    viteOptimizeDeps: true,

    // Inject the imports at the end of other imports
    injectAtEnd: true,

    // Generate corresponding .eslintrc-auto-import.json file.
    // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
    eslintrc: {
      enabled: false, // Default `false`
      // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
      filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },

    // Generate corresponding .biomelintrc-auto-import.json file.
    // biomejs extends Docs - https://biomejs.dev/guides/how-biome-works/#the-extends-option
    // biomelintrc: {
    //   enabled: false, // Default `false`
    //   filepath: './.biomelintrc-auto-import.json', // Default `./.biomelintrc-auto-import.json`
    // },

    // Save unimport items into a JSON file for other tools to consume
    // dumpUnimportItems: './unplugin-imports.json', // Default `false`
  })
}

function myPostCss() {
  return {}
}
