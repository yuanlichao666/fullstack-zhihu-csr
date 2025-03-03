<template>
  <!-- 轮播图 -->
  <ZSwiper :items="lessons" class="h-380" :rows="1" :cols="1"> </ZSwiper>
  <!-- 传播知识的种子 -->
  <ZContainer class="f-col! mt-30">
    <div class="w-full">
      <h5 class="font-bold font-xl lh-none">
        “<br />传播知识的种子，让分享带来价值
      </h5>
      <div class="mt-10 w-full row-start-center">
        <p class="w-600 font-xs font-normal color-gray-500 line-clamp-2">
          多年来，维恩科技不忘初心，已建立行业服务标杆为目标，不断提升自身技术服务水平，
          帮助客户在互联网推广自己的产品、服务和品牌，为客户创造价值从而实现自身价值
        </p>
        <hr class="h-2 w-200 ml-auto mb-8 bg-black" />
        <h5 class="font-bold font-xl color-black">”</h5>
      </div>
    </div>
    <div class="w-full mt-30 grid gap-10 pc:(grid-cols-4) mobile:(grid-cols-1)">
      <a href="" v-for="card in products" :key="card?.content?.title">
        <ZCard class="z-card-link w-full h-230" v-bind="card">
          <template #suffix>
            <div class="font-xs w-full row-between-center mt-10">
              <icon-carbon-direction-straight-right class="h-25 w-25 mt-10" />
            </div>
          </template>
        </ZCard>
      </a>
    </div>
    <hr class="h-2 w-full mt-20 bg-black" />
  </ZContainer>

  <!-- 我想要访问 -->
  <ZContainer class="f-col! mt-40">
    <div class="w-full">
      <h5 class="font-bold font-xl lh-none">我想要访问</h5>
      <p class="font-xs mt-20 font-normal color-gray-500 line-clamp-2">
        多年来，维恩科技不忘初心，已建立行业服务标杆为目标，不断提升自身技术服务水平，
        帮助客户在互联网推广自己的产品、服务和品牌，为客户创造价值从而实现自身价值
      </p>
    </div>
    <div class="w-full mt-30 grid gap-20 pc:(grid-cols-3) mobile:(grid-cols-1)">
      <a href="" class="" v-for="card in wants" :key="card?.content?.title">
        <ZCard class="w-full h-260" v-bind="card" image-round>
          <template #suffix>
            <div class="font-xs w-full row-between-center mt-10">
              <div>查看更多</div>
              <icon-custom-direction-right />
            </div>
          </template>
        </ZCard>
      </a>
    </div>
  </ZContainer>

  <!-- 课程展示 -->
  <div class="mt-20">
    <ZContainer class="grid cols-12">
      <ZSwiper
        class="h-380 pc:(col-span-8) mobile:(col-span-12)"
        :items="lessons"
        @change="changeLesson"
      >
      </ZSwiper>
      <div
        class="h-full pc:(col-span-4) mobile:(col-span-12) p-20 col-center-start bg-dark-50 color-white"
      >
        <div class="font-md fw-700">{{ lessons[currentLesson].name }}</div>
        <div class="font-xs mt-20">{{ lessons[currentLesson].desc }}</div>
        <icon-carbon-direction-straight-right class="h-25 w-25 mt-15" />
      </div>
    </ZContainer>
  </div>

  <!-- 合作伙伴 -->
  <ZContainer class="f-col! mt-40">
    <div class="w-full mb-30">
      <h5 class="font-bold font-xl lh-none">合作伙伴</h5>
      <p class="w-300 font-xs mt-20 font-normal color-gray-500 line-clamp-2">
        多年来，维恩科技不忘初心，已建立行业服务标杆为目标，不断提升自身技术服务水平，
      </p>
    </div>
    <ZSwiper
      :rows="1"
      :cols="cols"
      :items="friedns"
      class="h-100"
      autoPlay="true"
      space-between="30"
    >
      <template #contentRender> </template>
    </ZSwiper>
  </ZContainer>

  <!-- 公司团队 -->
  <ZContainer class="group f-row mt-40 mobile:(f-col)">
    <div
      class="flex-1 mobile:(w-full ml--70) h-500 grid grid-rows-20 grid-cols-20 gap-10"
    >
      <ZImage
        :src="img1"
        class="row-start-2 row-span-6 col-start-1 col-span-11"
      ></ZImage>
      <ZImage
        :src="img1"
        class="row-start-1 row-span-7 col-start-12 col-span-9"
      ></ZImage>
      <ZImage
        :src="img1"
        class="row-start-8 row-span-6 col-start-5 col-span-8"
      ></ZImage>
      <ZImage
        :src="img1"
        class="row-start-8 row-span-7 col-start-13 col-span-7"
      ></ZImage>
    </div>
    <div class="flex-1 mobile:(w-full) col-center-center text-left pc:(p-40)">
      <h5 class="w-full font-bold font-xl lh-none">公司团队</h5>
      <p class="font-xs mt-20 font-normal color-gray-500">
        他们都选择了为恩科技，我们的使命就是让他们的选择变得坚定和正确为客户创造更大的价值从而实现自己的价值我们的目标就是去让知识造福所有的程序员，让程序员入门不难，也能持续的成长。
      </p>
    </div>
  </ZContainer>
</template>

<script setup lang="ts">
import img1 from '@/assets/images/bg.png'
import img2 from '@/assets/images/banner.jpg'

const products = [
  {
    icon: IconCarbonStore,
    content: {
      title: 'tomic社区',
      subTitle:
        '让技术没有门槛，让沟通没有障碍,让技术没有门槛，让沟通没有障碍婴用品的跨境电商小程序，主要为中国用户提供优质婴用品的跨境电商小程序，主要为中国用户提供优质婴用品的跨境电商小程序，主要为中国用户提供优质',
    },
  },
  {
    icon: IconCarbonBuilding,
    content: {
      title: 'tomic知识学院',
      subTitle:
        '让技术没有门槛，让沟通没有障碍,让技术没有门槛，让沟通没有障碍婴用品的跨境电商小程序，主要为中国用户提供优质',
    },
  },
  {
    icon: IconCarbonBook,
    content: {
      title: 'tomic微服务',
      subTitle:
        '让技术没有门槛，让沟通没有障碍,让技术没有门槛，让沟通没有障碍婴用品的跨境电商小程序，主要为中国用户提供优质',
    },
  },
  {
    icon: IconCarbonAirplay,
    content: {
      title: 'tomic技术',
      subTitle:
        '让技术没有门槛，让沟通没有障碍,让技术没有门槛，让沟通没有障碍婴用品的跨境电商小程序，主要为中国用户提供优质',
    },
  },
]

const wants = [
  {
    img: img1,
    content: {
      title: 'tomic社区小程序',
      subtitle: '一句话介绍',
    },
  },
  {
    img: img1,
    content: {
      title: 'tomic社区小程序',
      subtitle: '一句话介绍',
    },
  },
  {
    img: img1,
    content: {
      title: 'tomic社区小程序',
      subtitle: '一句话介绍',
    },
  },
  {
    img: img1,
    content: {
      title: 'tomic社区小程序',
      subtitle: '一句话介绍',
    },
  },
  {
    img: img1,
    content: {
      title: 'tomic社区小程序',
      subtitle: '一句话介绍',
    },
  },
  {
    img: img1,
    content: {
      title: 'tomic社区小程序',
      subtitle: '一句话介绍',
    },
  },
]

const lessons = [
  {
    img: img1,
    name: '1德国w家小程序',
    desc: '德国w家是一款主营母婴用品的跨境电商小程序，主要为中国用户提供优质的海外商品，服务万千中国宝宝',
    title: '传播技术的种子',
    subTitle: '让技术没有门槛，让沟通没有障碍',
  },
  {
    img: img2,
    name: '2德国w家小程序',
    desc: '德国w家是一款主营母婴用品的跨境电商小程序，主要为中国用户提供优质的海外商品，服务万千中国宝宝',
    title: '传播技术的种子',
    subTitle: '让技术没有门槛，让沟通没有障碍',
  },
  {
    img: img2,
    name: '2德国w家小程序',
    desc: '德国w家是一款主营母婴用品的跨境电商小程序，主要为中国用户提供优质的海外商品，服务万千中国宝宝',
    title: '传播技术的种子',
    subTitle: '让技术没有门槛，让沟通没有障碍',
  },
  {
    img: img2,
    name: '2德国w家小程序',
    desc: '德国w家是一款主营母婴用品的跨境电商小程序，主要为中国用户提供优质的海外商品，服务万千中国宝宝',
    title: '传播技术的种子',
    subTitle: '让技术没有门槛，让沟通没有障碍',
  },
]
const [currentLesson, changeLesson] = useState<number>(0)

const friedns = [
  {
    img: img1,
  },
  {
    img: img2,
  },
  {
    img: img2,
  },
  {
    img: img1,
  },
  {
    img: img1,
  },
]
const [lg, md, sm] = useMyMediaQuerys([
  '(min-width: 1024px)',
  '(min-width: 768px)',
  '(min-width: 640px)',
])
const cols = computed(() => {
  return lg.value ? 4 : md.value ? 3 : sm.value ? 2 : 1
})
</script>
<route lang="json">
{
  "meta": {
    "layout": "Default"
  }
}
</route>
<style lang="scss" scoped>
:deep(.z-card-link:hover) {
  @apply bg-sky-500 translate-y--2 color-white! duration-100 shadow-lg;
  p {
    color: white;
  }
}
.group {
  .z-img-container {
    height: 100%;
    width: 100%;
  }
}
</style>
