import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVitest from '@vitest/eslint-plugin'
import pluginCypress from 'eslint-plugin-cypress/flat'
import oxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import vueParser from 'vue-eslint-parser'
import typescriptParser from '@typescript-eslint/parser'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
  oxlint.configs['flat/recommended'],
  skipFormatting,

  // custom rules
  allowSingleWordComponentName(),
  disableUnRegistryComponent(),
  ignoreCypressSupport(),
  supportJsxInVue(),
  ignoreAssets(),
  allowAny(),
]

function allowAny() {
  return {
    files: ['**/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
}

//关闭多单词组件命名
function allowSingleWordComponentName() {
  return {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-prop-types': 'error', // 必须为 props 定义类型
      'vue/require-default-prop': 'error', // 必须为非必填 props 提供默认值
    },
  }
}

function supportJsxInVue() {
  return {
    files: ['**/*.vue'],
    ignores: ['**/cypress/support/**', '**/src/assets/**'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaFeatures: {
          jsx: true,
        },
        // 假设 unplugin-vue-components 会生成一个全局的类型声明文件，例如 auto-imports.d.ts
        extraFileExtensions: ['.d.ts'],
      },
    },
    rules: {
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: ['ts', 'tsx'],
          },
        },
      ],
    },
  }
}

function ignoreCypressSupport() {
  return {
    ignores: ['**/cypress/support/**'],
  }
}

function ignoreAssets() {
  return {
    ignores: ['**/assets/**'],
  }
}

function disableUnRegistryComponent() {
  return {}
  // return {
  //   files: ['**/*.vue'],
  //   languageOptions: {
  //     parser: vueParser,
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //       sourceType: 'module',
  //     },
  //   },
  //   plugins: {
  //     pluginVue,
  //   },
  //   rules: {
  //     // 启用 vue/no-undef-components 规则
  //     'vue/no-undef-components': [
  //       'error',
  //       {
  //         ignorePatterns: ['^Icon', '^ZSwiper'], // 忽略动态组件的匹配规则
  //       },
  //     ],
  //   },
  // }
}
