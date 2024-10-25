import { useEffect } from "react"
import { useAppDispatch } from "@/store/store"
import { getCatalogs } from "@/store/features/playerSlice"


export function useInitCatalogs() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCatalogs())
  }, [dispatch])
}
