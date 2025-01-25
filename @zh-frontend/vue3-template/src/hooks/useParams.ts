export function useParams<T>() {
  return useRoute().params as T
}
