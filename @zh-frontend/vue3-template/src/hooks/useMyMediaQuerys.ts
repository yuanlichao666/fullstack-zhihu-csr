import type { Ref } from 'vue'
import { ref } from 'vue'

export function useMyMediaQuerys(args: string[]) {
  return args.map((arg) => {
    return useMediaQuery(arg)
  })
}
