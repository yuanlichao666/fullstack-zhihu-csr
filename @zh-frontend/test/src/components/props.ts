export type SwiperPropsItem =
  | {
      img: string
      title: string
      subTitle: string
      desc: string
    }
  | {
      key: string
      [key: string]: any
    }

export type SwiperPropsItems<T extends SwiperPropsItem> = T[]

export type SwiperProps<T> = {
  items: T[]
  height?: string
  width?: string
  className?: string
  itemHeight?: string
  itemWidth?: string
  itemClass?: string
}
