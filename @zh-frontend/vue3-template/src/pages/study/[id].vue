<template>
  <div>用户详情{{ params.id }}</div>
</template>
<script setup lang="ts">
type Params = {
  id: string
}
const params = useParams<Params>()
</script>
