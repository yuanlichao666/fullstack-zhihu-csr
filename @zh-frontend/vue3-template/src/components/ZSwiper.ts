import type { CSSProperties } from 'vue'

export type SwiperProps<T> = {
  fit?: 'fill' | 'contain' | 'cover' //图片如何填充容器
  items: T[]
  rows?: number
  cols?: number
  loop?: boolean
  height?: string
  width?: string
  direction?: 'horizontal' | 'vertical'
  navigation?: boolean //左右两侧的导航按钮
  pagination?: boolean //指示分页的小原点
  scrollbar?: boolean //指示分页的长条、进度条
  autoplay?: boolean
  containerStyle?: CSSProperties
  itemStyle?: CSSProperties
}
