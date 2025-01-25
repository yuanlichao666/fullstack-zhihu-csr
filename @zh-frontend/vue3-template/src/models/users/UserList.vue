<template>
  <div>{{ isFetching ? '加载中' : '加载完成' }}</div>
  {{ data }}
  <div v-for="item in data?.data" :key="item.name">
    {{ item.name }}
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '@vueuse/core'
import { useUserList } from './useUsers'

const { isFetching, error, data } = useUserList()
watch(data, () => {
  console.log(data.value)
})
</script>
