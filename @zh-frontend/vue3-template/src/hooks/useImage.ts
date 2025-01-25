import type { ShallowRef } from 'vue'

type UseImgOpritons = {
  src: string
  lazy?: boolean
  container?: ShallowRef<HTMLDivElement | null>
  onload?: () => any
  onerror?: () => any
}
export function useZImage(options: UseImgOpritons) {
  // core
  const img = new Image()
  const { src, container, lazy, onload, onerror } = options
  const status = ref<'loading' | 'error' | 'success'>('loading')

  let inited = false
  function load() {
    console.log('load')
    if (!inited) {
      img.onload = () => {
        status.value = 'success'
        if (onload) onload()
      }
      img.onerror = () => {
        status.value = 'error'
        if (onerror) onerror()
      }
      img.src = src
      inited = true
    }
  }
  function distory() {
    img.onload = null
    img.onerror = null
  }

  // lazy load
  useZIntersectionObserver(container, (isVisible) => {
    console.log('inter')
    if (lazy && isVisible) {
      load()
    }
  })

  // unlazy load
  onBeforeMount(() => {
    if (!lazy) {
      load()
    }
  })

  // distory
  onUnmounted(() => {
    if (inited) {
      distory()
    }
  })

  const states = computed(() => {
    return {
      success: status.value === 'success',
      loading: status.value === 'loading',
      error: status.value === 'error',
    }
  })

  return { states }
}
