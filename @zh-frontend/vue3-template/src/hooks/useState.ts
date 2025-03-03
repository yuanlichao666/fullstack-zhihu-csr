import type { Ref } from 'vue'
import { ref } from 'vue'

export function useState<T>(initialState: T): [Ref<T>, (newState: T) => void] {
  const state = ref<T>(initialState) as Ref<T>

  const dispatch = (newState: T) => {
    state.value = newState
  }

  return [state, dispatch]
}
