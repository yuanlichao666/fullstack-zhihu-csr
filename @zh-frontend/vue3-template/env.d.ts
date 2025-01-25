/// <reference types="vite/client" />
/// <reference types="element-plus/global" />
/// <reference types="unplugin-icons/types/vue" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="unplugin-vue-macros/macros-global" />
/// <reference types="@intlify/unplugin-vue-i18n/messages" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_EVN_COMMON: string
  // 更多环境变量...
}
export {}
