import type { ShallowRef } from 'vue'

export function useZIntersectionObserver(
  el: ShallowRef<HTMLDivElement | null> | undefined,
  cb: (isVisible: boolean) => any,
) {
  const isVisible = ref<boolean>(false)
  const res = useIntersectionObserver(el, ([entry], observerElement) => {
    isVisible.value = entry?.isIntersecting || false
    cb(isVisible.value)
  })

  return { ...res, isVisible }
}
