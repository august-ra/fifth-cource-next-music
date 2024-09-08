"use client"

import { useAppDispatch } from "@/store/store"
import { signOut } from "@/store/features/userSlice"
import { usePathname, useRouter } from "next/navigation"

export function useQuit() {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  function handleQuit() {
    dispatch(signOut())

    if (pathname === "/tracks/favourite")
      router.replace("/tracks/")
  }

  return { onQuit: handleQuit }
}
