<script setup lang="tsx" generic="T extends ImgSwiperItem | CustomSwiperItem">
// deps
import { get } from 'lodash-es'

// props
export type ImgSwiperItem = {
  img: string
  title: string
  subTitle: string
  desc: string
}
export type CustomSwiperItem = {
  key: string
  [key: string]: any
}

export type SwiperProps<T> = {
  items: T[]
  height?: string
  width?: string
  className?: string
  itemHeight?: string
  itemWidth?: string
  itemClass?: string
}

const { items, height, width, className, itemHeight, itemWidth, itemClass } =
  defineProps<SwiperProps<T>>()

// slots
const slots = defineSlots<{
  itemRender?(props: { item: T }): any
  contentRender?(props: { item: T }): any
}>()

// styles
const containerStyle = computed(() => {
  const styles: Record<string, any> = {}
  if (height) {
    styles.height = height
  }
  if (width) {
    styles.width = width
  }
  return styles
})

const itemStyle = computed(() => {
  const styles: Record<string, any> = {}
  if (itemHeight) {
    styles.height = itemHeight
  }
  if (itemWidth) {
    styles.width = itemWidth
  }
  return styles
})

defineRender(() => {
  const renderSwiper = () => {
    return (
      <el-carousel class="z-swiper w-full h-300" style={containerStyle.value}>
        {renderItems()}
      </el-carousel>
    )
  }

  const renderItems = () => {
    const renderDefaultItem = (item: T) => {
      return (
        <el-carousel-item
          key={get(item, 'key') || get(item, 'img')}
          class="h-full"
        >
          <div
            style={{ backgroundImage: `url(${item.img})`, ...itemStyle.value }}
            class="w-full h-full bg-cover bg-no-repeat"
          >
            <z-container class="h-full row-start-center">
              {renderItemContent(item)}
            </z-container>
          </div>
        </el-carousel-item>
      )
    }

    const renderCustomItem = (item: T) => {
      const CustomItem = slots.itemRender!({ item })
      return (
        <el-carousel-item
          key={get(item, 'key') || get(item, 'img')}
          class="h-full"
        >
          <CustomItem>{renderItemContent(item)}</CustomItem>
        </el-carousel-item>
      )
    }

    return items.map(slots.itemRender ? renderCustomItem : renderDefaultItem)
  }

  const renderItemContent = (item: T) => {
    const renderDefaultContent = (item: T) => {
      return (
        <div class="h-full col-center-start c-white">
          <h1 class="mt-30 font-xxl fw-700">{item.title}</h1>
          <h3 class="font-xl fw-700">{item.subTitle}</h3>
          <p class=" font-base">{item.desc}</p>
          <p class="mt-20 bg-black op-50 p-10 font-sm">
            了解我们的产品
            <icon-custom-arrow-right-circle class="inline-block ml-10"></icon-custom-arrow-right-circle>
          </p>
        </div>
      )
    }

    const renderCustomContent = (item: T) => {}

    return slots.contentRender
      ? renderCustomContent(item)
      : renderDefaultContent(item)
  }
  return renderSwiper()
})
</script>

<style lang="scss">
.el-carousel__container {
  height: 100% !important;
}
</style>
