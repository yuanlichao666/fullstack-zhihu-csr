<template>
  <div class="col-start-start pos-relative">
    <!-- avatar -->
    <ZImage
      v-if="avatar"
      :src="avatar"
      fit="cover"
      :lazy="true"
      class="w-80 h-80 rounded-full pos-absolute top-0 left-50% translate-x--50%"
    ></ZImage>

    <!-- card -->
    <div
      :class="[
        'h-full w-full flex-grow-1 col-start-start overflow-hidden',
        rounded && 'rounded-5',
        border && 'border-1',
        avatar && 'mt-40',
      ]"
    >
      <!-- prefix -->
      <slot name="prefix"></slot>

      <!-- icon -->
      <div v-if="icon" class="flex-grow-1 row-start-center px-20">
        <component :is="icon" class="h-40 w-40"></component>
      </div>

      <!-- image -->
      <ZImage
        v-if="img"
        :src="img"
        fit="cover"
        :lazy="true"
        class="flex-grow-1 w-full"
        :class="imageRound && 'rounded-5'"
      ></ZImage>

      <!-- content -->
      <div v-if="content" class="col-start-start p-20 mt-auto">
        <div class="font-sm line-clamp-1 mb-10 font-700">
          {{ content.title }}
        </div>
        <p class="font-xs line-clamp-2 color-gray-700">
          {{ content.subTitle }}
        </p>
        <!-- suffix -->
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'

interface CardProps {
  img?: string
  icon?: Component<any>
  avatar?: string
  border?: boolean
  rounded?: boolean
  content?: {
    title?: string
    subTitle?: string
  }
  imageRound?: boolean
}
const slots = defineSlots<{
  prefix?: (props: CardProps & HTMLAttributes) => any
  suffix?: (props: CardProps & HTMLAttributes) => any
}>()

const props = defineProps<CardProps>()
const { img, icon, avatar, content, border, rounded, imageRound } = props
</script>
