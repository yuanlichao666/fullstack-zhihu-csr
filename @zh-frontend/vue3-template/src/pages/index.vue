<template>
  <ZSwiper :items="items" class="h-380"> </ZSwiper>
  <ZContainer class="flex-wrap justify-between items-inherit">
    <div
      class="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10"
    >
      <template v-for="card in cards" :key="card.img || card.title">
        <ZCard v-bind="card" class="w-full"> </ZCard>
      </template>
      <template v-for="card in cards" :key="card.img || card.title">
        <ZCard v-bind="card" class="w-full"> </ZCard>
      </template>
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
  // {
  //   img: img2,
  //   desc: '',
  //   title: '传播技术的种子',
  //   subTitle: '让技术没有门槛，让沟通没有障碍',
  // },
]
const cards = [
  {
    img: 'https://cdn.wwads.cn/creatives/4gRYv7dbauGawfI3Bm8RfImPCYea72Xl12ckFY4l.jpg',
    border: true,
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
      'https://cdn.wwads.cn/creatives/4gRYv7dbauGawfI3Bm8RfImPCYea72Xl12ckFY4l.jpg',
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
