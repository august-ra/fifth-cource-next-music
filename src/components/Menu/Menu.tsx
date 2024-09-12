"use client"

import styles from "./Menu.module.css"

import Link from "next/link"

import { Dispatch, SetStateAction } from "react"
import { useQuit } from "@/hooks/useQuit"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setIsPaused } from "@/store/features/playlistSlice"


interface Props {
  setIsOpened: Dispatch<SetStateAction<boolean>>
}

export default function Menu({ setIsOpened }: Props) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const { onQuit } = useQuit()

  function handleStopPlaying() {
    dispatch(setIsPaused(true))
  }

  function handleSignOut(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    onQuit()

    setIsOpened(false)
  }

  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link className={styles.menuLink} href="/tracks/">Главное</Link>
        </li>

        {
          user && user.username
            && (
              <li className={styles.menuItem}>
                <Link className={styles.menuLink} href="/tracks/favourite">Мой плейлист</Link>
              </li>
            )
        }

        <li className={styles.menuItem}>
          {
            user && user.username
              ? (
                <Link className={styles.menuLink} href="#" onClick={handleSignOut}>Выйти</Link>
              )
              : (
                <Link className={styles.menuLink} href="/sign/in" onClick={handleStopPlaying}>Войти</Link>
              )
          }
        </li>
      </ul>
    </div>
  )
}
