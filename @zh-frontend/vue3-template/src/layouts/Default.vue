<template>
  <!-- header -->
  <div
    :class="[
      'z-header--container',
      'common:(fixed z-10 h-60)',
      y > 0 && 'common:(bg-black op35)',
      'mobile:(transition-all duration-500)',
      show && 'mobile:(h-full bg-black op100)',
    ]"
  >
    <ZContainer
      :class="[
        'z-header--content',
        'common:(h-full)',
        'pc:(row-start-center)',
        'mobile:(row-between-start pt-10)',
      ]"
    >
      <img src="../assets/logo.svg" class="w-40 h-40" />

      <ZMenu
        :class="[
          'mobile:(absolute left-0 top-100 h-0  w-full px-50 mx-auto over-hid col-start-start! transition-all duration-500)',
          show && 'mobile:(h-80%)',
        ]"
      ></ZMenu>

      <div
        class="w-40 h-40 row-center-center cursor-pointer c-gray300 hover:c-white md:hid"
        @click="toggleShow(!show)"
      >
        <Transition name="menu-btn" mode="out-in">
          <icon-custom-menu v-if="!show"></icon-custom-menu>
          <icon-custom-close v-else></icon-custom-close>
        </Transition>
      </div>
    </ZContainer>
  </div>

  <!-- content -->

  <RouterView />

  <!-- footer -->
  <footer class="h-4000">联系我们</footer>
</template>
<script setup lang="ts">
const { y } = useWindowScroll()
const [show, toggleShow] = useToggle(false)
const [wight, toggleWight] = useToggle(false)
watch([wight], () => {
  console.log(wight.value)
})
</script>
<style lang="scss">
.menu-btn-enter-active {
  animation: bounce-in 0.5s;
}
.menu-btn-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
