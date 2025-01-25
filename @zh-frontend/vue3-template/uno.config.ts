import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'
import presetRemToPx from '@unocss/preset-rem-to-px'
import presetWind from '@unocss/preset-wind'
import { defineConfig } from 'unocss'

export default defineConfig({
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: [
    {
      hid: 'hidden',
      show: 'block',
      'over-hid': 'overflow-hidden',
      'font-xs': 'text-12',
      'font-sm': 'text-14',
      'font-md': 'text-16',
      'font-lg': 'text-18',
      'font-xl': 'text-20',
      'font-xxl': 'text-22',
      'row-start-start': 'flex flex-row justify-start items-start',
      'row-start-center': 'flex flex-row justify-start items-center',
      'row-center-center': 'flex flex-row justify-center items-center',
      'row-between-center': 'flex flex-row justify-between items-center',
      'row-between-start': 'flex flex-row justify-between items-start',
      'col-start-start': 'flex flex-col justify-start items-start',
      'col-center-start': 'flex flex-col justify-center items-start',
      'col-between-start': 'flex flex-col justify-between items-start',
    },
    [/^pc:(.*)$/, ([, d]) => `md:${d}`],
    [/^mobile:(.*)$/, ([, d]) => `lt-md:${d}`],
    [/^common:(.*)$/, ([, d]) => d],
    [/^[^pc^mobile^common]*:(.*)$/, ([, d]) => d],
  ],
  presets: [
    presetWind(),
    presetRemToPx({
      baseFontSize: 4, // 设置为4，实现w-1=1px
    }),
  ],
})
