<script setup lang="tsx" generic="T extends Record<string, any>">
// deps
import { get, template } from 'lodash-es'
import { register } from 'swiper/element/bundle'
import type { SwiperProps } from './ZSwiper'

register()

// props

const {
  items,
  rows,
  cols,
  itemHeight,
  itemWidth,
  itemClass,
  containerClass,
  containerWidth,
  containerHeight,
} = defineProps<SwiperProps<T>>()

// slots
const slots = defineSlots<{
  itemRender?(props: { item: T }): any
  contentRender?(props: { item: T }): any
}>()

// computed styles
const containerStyle = computed(() => {
  return {
    height: containerHeight || itemHeight,
    width: containerWidth || itemHeight,
  }
})
const itemStyle = computed(() => {
  return {
    height: itemHeight || containerHeight,
    width: itemWidth || containerWidth,
  }
})

// emits
const change = defineEmit<[newIdx: number, oldIdx: number]>()

// render
defineRender(function () {
  const renderSwiper = () => {
    return (
      <swiper-container
        class={['z-swiper-container w-full min-h-80', containerClass]}
        style={containerStyle.value}
        slides-per-view={cols}
        grid-rows={rows}
        autoPlay={true}
        loop={true}
        onChange={change}
      >
        {renderItems()}
      </swiper-container>
    )
  }

  const renderItems = () => {
    const renderDefaultItem = (item: T) => {
      return (
        <swiper-slide
          style={itemStyle.value}
          key={item?.img}
          class={['z-swiper-item w-full h-full', itemClass]}
        >
          <div
            style={{
              backgroundImage: `url(${item?.img || null})`,
              ...itemStyle.value,
            }}
            class="w-full h-full bg-cover bg-no-repeat"
          >
            <z-container class="w-full h-full row-start-center">
              {renderItemContent(item)}
            </z-container>
          </div>
        </swiper-slide>
      )
    }

    const renderCustomItem = (item: T) => {
      const CustomItem = slots.itemRender!({ item })
      return (
        <swiper-slide
          key={get(item, 'key') || get(item, 'img')}
          class="w-full h-full"
        >
          <CustomItem>{renderItemContent(item)}</CustomItem>
        </swiper-slide>
      )
    }

    return items.map(slots.itemRender ? renderCustomItem : renderDefaultItem)
  }

  const renderItemContent = (item: T) => {
    const renderDefaultContent = (item: T) => {
      return (
        <div class="h-full col-center-start c-white">
          <h1 class="mt-30 p-y-10 font-xl fw-700">{item?.title}</h1>
          <h3 class="font-sm fw-400">{item?.subTitle}</h3>
          <p class="mt-20 p-10  bg-black op-50 font-sm">
            了解我们的产品
            <icon-custom-arrow-right-circle class="inline-block ml-10"></icon-custom-arrow-right-circle>
          </p>
        </div>
      )
    }

    const renderCustomContent = (item: T) => {
      return <div></div>
    }

    return slots.contentRender
      ? renderCustomContent(item)
      : renderDefaultContent(item)
  }
  return renderSwiper()
})
</script>

<style lang="scss" scoped></style>
