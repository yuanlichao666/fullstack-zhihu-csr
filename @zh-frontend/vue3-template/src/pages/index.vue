<template>
  <ZSwiper :items="items" class="h-380"> </ZSwiper>
  <ZContainer>
    <div class="w-full grid-inc gap-10 mt-10">
      <ZCard
        v-for="card in cards"
        :key="card.img || card?.content?.title"
        v-bind="card"
        class="w-full h-200"
      >
      </ZCard>
    </div>
  </ZContainer>
</template>

<script setup lang="ts">
import img1 from '@/assets/images/bg.png'
import img2 from '@/assets/images/banner.jpg'

// ts-ignore

const items = [
  {
    img: img1,
    desc: '',
    title: '传播技术的种子',
    subTitle: '让技术没有门槛，让沟通没有障碍',
  },
  {
    img: img2,
    desc: '',
    title: '传播技术的种子',
    subTitle: '让技术没有门槛，让沟通没有障碍',
  },
] as any
const cards = [
  {
    img: 'data:image/jpeg;base64,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',
    border: true,
    rounded: true,
    content: {
      title: '传播技术的种子',
      subTitle: '让技术没有门槛，让沟通没有障碍,让技术没有门槛，让沟通没有障碍',
    },
  },
  {
    icon: IconCustomDelete,
    border: true,
    content: {
      title: '传播技术的种子',
      subTitle: '让技术没有门槛，让沟通没有障碍,让技术没有门槛，让沟通没有障碍',
    },
  },
  {
    border: true,
    avatar:
      'https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/samantha/logo-icon-white-bg.png',
    content: {
      title: '传播技术的种子',
      subTitle: '让技术没有门槛，让沟通没有障碍,让技术没有门槛，让沟通没有障碍',
    },
  },
]
</script>
<route lang="json">
{
  "meta": {
    "layout": "Default"
  }
}
</route>
