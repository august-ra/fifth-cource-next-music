"use client"

import styles from "./Sidebar.module.css"

import Image from "next/image"
import Link from "next/link"

import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { signOut } from "@/store/features/userSlice"


export default function Sidebar() {
  const router   = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)

  function handleSigning() {
    if (user && user.username)
      dispatch(signOut())
    else
      router.push("/sign/in")
  }

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarPersonal}>
        {
          user && user.username
            && (
              <p className={styles.sidebarPersonalName}>{user.username}</p>
            )
        }
        <div className={styles.sidebarIcon} onClick={handleSigning}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-logout"/>
          </svg>
        </div>
      </div>

      <div className={styles.sidebarList}>
        <Link href="#">
          <Image src="/img/playlist01.png" alt="day's playlist" width={250} height={150} />
        </Link>
        <Link href="#">
          <Image src="/img/playlist02.png" alt="dancing hit's playlist" width={250} height={150} />
        </Link>
        <Link href="#">
          <Image src="/img/playlist03.png" alt="indie's playlist" width={250} height={150} />
        </Link>
      </div>
    </div>
  )
}
