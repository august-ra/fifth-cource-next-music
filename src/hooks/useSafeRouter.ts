import { useRouter } from "next/navigation"


export function useSafeRouter() {
  try {
    return useRouter()
  } catch (error: unknown) {
    return {
      push:    () => {},
      replace: () => {},
    }
  }
}
