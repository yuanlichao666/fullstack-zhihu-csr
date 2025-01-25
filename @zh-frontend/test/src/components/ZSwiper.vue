<script setup lang="tsx" generic="T extends SwiperPropsItem">
// deps
import { get } from 'lodash-es'
import type { SwiperPropsItem, SwiperProps } from './props'

// props

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
      <el-carousel class="z-swiper w-full h-full" style={containerStyle.value}>
        {renderItems()}
      </el-carousel>
    )
  }

  const renderItems = () => {
    const renderDefaultItem = (item: T) => {
      return (
        <el-carousel-item key={get(item, 'key') || get(item, 'img')}>
          <div
            style={{ backgroundImage: `url(${item.img})`, ...itemStyle.value }}
            class="w-full h-full bg-cover bg-no-repeat"
          >
            <z-container class="h-full">{renderItemContent(item)}</z-container>
          </div>
        </el-carousel-item>
      )
    }

    const renderCustomItem = (item: T) => {
      const CustomItem = slots.itemRender!({ item })
      return (
        <el-carousel-item key={get(item, 'key') || get(item, 'img')}>
          <CustomItem>{renderItemContent(item)}</CustomItem>
        </el-carousel-item>
      )
    }

    return items.map(slots.itemRender ? renderCustomItem : renderDefaultItem)
  }

  const renderItemContent = (item: T) => {
    const renderDefaultContent = (item: T) => {
      return (
        <div class="h-full flex flex-col justify-center items-start c-white fw-700">
          <h1>{item.title}</h1>
          <h3>{item.subTitle}</h3>
          <p>{item.desc}</p>
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
