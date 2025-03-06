/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/abort': RouteRecordInfo<'/abort', '/abort', Record<never, never>, Record<never, never>>,
    '/project-detail': RouteRecordInfo<'/project-detail', '/project-detail', Record<never, never>, Record<never, never>>,
    '/study/': RouteRecordInfo<'/study/', '/study', Record<never, never>, Record<never, never>>,
    '/study/[id]': RouteRecordInfo<'/study/[id]', '/study/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/test': RouteRecordInfo<'/test', '/test', Record<never, never>, Record<never, never>>,
    '/user': RouteRecordInfo<'/user', '/user', Record<never, never>, Record<never, never>>,
  }
}
