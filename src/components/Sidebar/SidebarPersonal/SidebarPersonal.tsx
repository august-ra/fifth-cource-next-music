"use client"

import styles from "../Sidebar.module.css"

import { useRouter } from "next/navigation"
import { useInitFavouriteTracks } from "@/hooks/useInitFavouriteTracks"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { signOut } from "@/store/features/userSlice"


export default function SidebarPersonal() {
  useInitFavouriteTracks()

  const router   = useRouter()
  const dispatch = useAppDispatch()
  const user     = useAppSelector((state) => state.user.user)

  function handleSigning() {
    if (user && user.username)
      dispatch(signOut())
    else
      router.push("/sign/in")
  }

  return (
    <div className={styles.sidebarPersonal}>
      {
        user && user.username
          && (
            <p className={styles.sidebarPersonalName}>{user.username}</p>
          )
      }
      <div className={styles.sidebarIcon} onClick={handleSigning}>
        <svg>
          <use xlinkHref="/img/icon/sprite.svg#icon-logout" />
        </svg>
      </div>
    </div>
  )
}
