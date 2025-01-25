<template>
  <div class="col-start-start w-full pos-relative">
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
      class="w-full h-full flex-grow-1 col-start-start"
      :class="{ 'divide-y border-1': border, 'mt-40': avatar }"
    >
      <!-- prefix -->
      <slot name="prefix"></slot>

      <!-- icon -->
      <div v-if="icon" class="flex-grow-1 w-full">
        <component :is="icon" class="w-80 h-80"></component>
      </div>

      <!-- image -->
      <ZImage
        v-if="img"
        :src="img"
        fit="cover"
        :lazy="true"
        class="flex-grow-1 w-full"
      ></ZImage>

      <!-- content -->
      <div v-if="content" class="col-start-start px-20 mt-auto">
        <div class="mt-auto font-md lh-loose font-700">
          {{ content.title }}
        </div>
        <p class="font-sm line-clamp-2">
          {{ content.subTitle }}
        </p>
      </div>

      <!-- suffix -->
      <slot name="suffix" :class="{}"></slot>
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
  content?: {
    title?: string
    subTitle?: string
  }
}
const slots = defineSlots<{
  prefix?: (props: CardProps & HTMLAttributes) => any
  suffix?: (props: CardProps & HTMLAttributes) => any
}>()

const props = defineProps<CardProps>()
const { img, icon, avatar, content, border } = props
</script>
