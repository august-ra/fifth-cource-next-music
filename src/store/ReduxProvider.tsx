"use client"

import { ReactNode, useRef } from "react"
import { Provider } from "react-redux"
import { AppStore, makeStore } from "@/store/store"


interface Props {
  children: ReactNode
}

export default function ReduxProvider({ children }: Props) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current)
    storeRef.current = makeStore()

  return (
    <Provider store={storeRef.current}>{children}</Provider>
  )
}
