<template>
  <div>用户详情{{ params.id }}</div>
</template>
<script setup lang="ts">
import { useParams } from '@/hooks/useParams'

type Params = {
  id: string
}
const params = useParams<Params>()
</script>
