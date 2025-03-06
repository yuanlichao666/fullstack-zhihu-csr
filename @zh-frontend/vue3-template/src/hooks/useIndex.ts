import type { Ref } from 'vue'
import { ref } from 'vue'

export function useIndex(
  initialIndex: number,
): [Ref<number>, (newIndex: number) => void, (newIndex: number) => boolean] {
  const _index = ref<number>(initialIndex) as Ref<number>

  const change = (newIndex: number) => {
    _index.value = newIndex
  }

  const isActive = (index: number) => {
    return _index.value === index
  }

  return [_index, change, isActive]
}
