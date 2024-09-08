"use client"

import styles from "./Nav.module.css"

import Image from "next/image"
import Link from "next/link"

import { useState } from "react"
import { useQuit } from "@/hooks/useQuit"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setIsPaused } from "@/store/features/playlistSlice"


export default function Nav() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const { onQuit } = useQuit()
  const [isOpened, setIsOpened] = useState<boolean>(false)

  function handleStopPlaying() {
    dispatch(setIsPaused(true))
  }

  function handleSignOut(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    onQuit()

    setIsOpened(false)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image className={styles.logoImage} src="/img/logo.svg" alt="SkyPro Logo" width={114} height={17} />
      </div>

      <div className={styles.burger} onClick={() => setIsOpened((prev) => !prev)}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>

      {
        isOpened && (
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
    </nav>
  )
}
