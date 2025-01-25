import { useFetch, type UseFetchReturn } from '@vueuse/core'

export function useUserList() {
  return useFetch<UseFetchReturn<{ data: Array<{ name: string }> }>>('/api/users').get().json()
}
