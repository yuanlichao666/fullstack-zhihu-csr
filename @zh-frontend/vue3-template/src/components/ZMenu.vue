<template>
  <div class="row-start-center font-lg">
    <RouterLink class="item" to="/">产品</RouterLink>
    <RouterLink class="item" to="/about">关于</RouterLink>
    <RouterLink class="item" to="/study/">学习</RouterLink>
    <RouterLink class="item" to="/community">社区</RouterLink>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss">
.item {
  @apply py-2 color-white pointer-events-inherit relative pc:(flex-1 text-center px-16) mobile:( w-full text-left);
  &:hover {
    @apply fw-700;
    &:before {
      content: '';
      @apply flex-content-center
      @apply h-2 w-8 bg-red100  absolute  bottom-0 left-[calc(50%-1rem)] mobile:(w-full left-0 h-1);
    }
  }
}
</style>
