<script
  setup
  lang="tsx"
  generic="T extends { img: string; [key: string]: any }"
>
// deps
import { register } from 'swiper/element/bundle'
import type { SwiperProps } from './ZSwiper'
import ZImage from './ZImage.vue'
import { px2vw } from '@/utils/px2vw'

register()

// props
const {
  fit = 'cover',
  rows = 1,
  cols = 1,
  loop = true,
  items,
  width,
  height,
  autoplay = true,
  direction = 'horizontal',
  pagination = true,
  navigation = false,
  itemStyle = {},
  containerStyle = {},
} = defineProps<SwiperProps<T>>()

// slots
const slots = defineSlots<{
  default?(props: { item: T }): any
}>()

// emits
const onChange = defineEmit<[newIdx: number]>()

// expose
const [instance, setInstance] = useState<any>(null)
const slideTo = (index: number) => {
  instance.value.swiper.slideTo(index, 500)
}
defineExpose({ slideTo })

// render
defineRender(function () {
  const renderSwiper = () => {
    const _containerStyle = [
      height && { height },
      width && { width },
      containerStyle,
    ] as any
    return (
      <swiper-container
        class={['z-swiper-container w-full h-200']}
        style={_containerStyle.filter(Boolean).map(px2vw)}
        ref={setInstance}
        loop={loop}
        autoplay={autoplay}
        grid-rows={rows}
        direction={direction}
        pagination={pagination}
        navigation={navigation}
        slides-per-view={cols}
        onSwiperslidechange={(e: any) => onChange(e.detail[0].realIndex)}
      >
        {renderItems()}
      </swiper-container>
    )
  }

  const renderItems = () => {
    return items.map((item) => {
      return (
        <swiper-slide
          part="swiper-slide"
          style={px2vw(itemStyle)}
          key={item?.img}
          class={['z-swiper-item w-full h-full relative']}
        >
          {item?.img && (
            <ZImage
              class="w-full h-full"
              src={item?.img}
              alt={item?.alt}
              fit={fit}
            />
          )}
          <div class="w-full h-full  absolute left-0 top-0">
            {slots?.default && slots.default({ item })}
          </div>
        </swiper-slide>
      )
    })
  }

  return renderSwiper()
})
</script>

<style lang="scss" scoped></style>
