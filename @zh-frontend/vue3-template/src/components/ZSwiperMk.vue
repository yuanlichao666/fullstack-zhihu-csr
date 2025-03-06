<template>
  <div class="w-full">
    <ul class="h-150 px-40 row-around-center">
      <li
        class="h-full p-20 col-between-center font-md color-gray font-700 cursor-pointer"
        :class="{ 'title--active': isActive(index) }"
        v-for="(item, index) in _items"
        @click="slideTo(index)"
        :key="index"
      >
        <p>{{ index }}</p>
        <div class="h-2 w-30 bg-gray"></div>
        <p>{{ item?.name }}</p>
      </li>
    </ul>
    <ZSwiper
      fit="contain"
      ref="swiper"
      :items="_items"
      :height="height"
      :navigation="true"
      :autoplay="autoplay"
      @onChange="change"
      :item-style="{ paddingLeft: '50px', paddingRight: '50px' }"
    ></ZSwiper>
  </div>
</template>
<script setup lang="ts">
import { useIndex } from '@/hooks/useIndex'

const {
  images,
  height = '200px',
  autoplay = true,
} = defineProps<{
  images: Record<string, any>[]
  height?: string
  autoplay?: boolean
}>()

const _items = computed(() =>
  images.map((v) => {
    return { img: v.image, name: v.title }
  }),
)

const [index, change, isActive] = useIndex(0)
const swiper = useTemplateRef('swiper')
function slideTo(index: number) {
  swiper.value?.slideTo(index)
}

// element plus中的状态类名处理，处理状态类的时候可以借鉴一下
// const itemKls = computed(() => [
//   ns.e('item'),
//   ns.is('active', active.value),
//   ns.is('in-stage', inStage.value),
//   ns.is('hover', hover.value),
//   ns.is('animating', animating.value),
//   {
//     [ns.em('item', 'card')]: isCardType.value,
//     [ns.em('item', 'card-vertical')]: isCardType.value && isVertical.value,
//   },
// ])

// element plus中的样式处理，可借鉴
// const activeStyle = computed<CSSProperties>(() => {
//   const fillValue = checkboxGroup?.fill?.value ?? ''
//   return {
//     backgroundColor: fillValue,
//     borderColor: fillValue,
//     color: checkboxGroup?.textColor?.value ?? '',
//     boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : undefined,
//   }
// })
// const itemStyle = computed<CSSProperties>(() => {
//   const translateType = `translate${unref(isVertical) ? 'Y' : 'X'}`
//   const _translate = `${translateType}(${unref(translate)}px)`
//   const _scale = `scale(${unref(scale)})`
//   const transform = [_translate, _scale].join(' ')

//   return {
//     transform,
//   }
// })
</script>
<style lang="scss" scoped>
.title--active {
  color: orange;
  div {
    background-color: orange;
  }
}
.z-swiper-container::part(bullet) {
  width: 8px;
  transition: width 500ms;
}
.z-swiper-container::part(bullet-active) {
  width: 30px;
  border-radius: 10px;
  transition: width 500ms;
  background-color: orange; /* 覆盖按钮样式 */
}
.z-swiper-container::part(button-prev),
.z-swiper-container::part(button-next) {
  @apply h-40 w-40 rounded-50 p-10 color-gray-500 bg-white  shadow-lg;
}
:deep(.z-image-container) {
  padding: 20px;
}
// .z-swiper-container::part(swiper-slide) {
//   @apply px-40;
// }
</style>
