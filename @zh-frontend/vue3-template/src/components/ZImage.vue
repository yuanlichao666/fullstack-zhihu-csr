<template>
  <div
    class="z-img-container row-center-center overflow-hidden"
    ref="z-img-container"
  >
    <slot v-if="slots.loading && states.loading" name="loading"></slot>
    <div v-else-if="states.loading">Loading...</div>

    <slot v-if="slots.error && states.error" name="error"></slot>
    <div v-else-if="states.error">Error....</div>
    <img
      v-if="states.success"
      class="w-full h-full"
      :style="{ objectFit: fit }"
      :src="src"
      :alt="alt"
    />
  </div>
</template>
<script setup lang="ts">
const slots = defineSlots<{
  error?: () => any
  loading?: () => any
}>()

const props = defineProps<{
  src: string
  fit: 'contain' | 'cover' | 'fill'
  alt?: string
  lazy?: boolean
}>()
const { src, fit, lazy } = props

const container = useTemplateRef('z-img-container')

const { states } = useZImage({ container, lazy, src })
</script>
