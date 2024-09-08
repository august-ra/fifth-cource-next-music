"use client"

import styles from "./Nav.module.css"

import Image from "next/image"
import Link from "next/link"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { signOut } from "@/store/features/userSlice"


export default function Nav() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const [isOpened, setIsOpened] = useState<boolean>(false)

  function handleSignOut(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

    dispatch(signOut())

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
                <Link href="#" className={styles.menuLink}>Главное</Link>
              </li>

              {
                user && user.username
                  && (
                    <li className={styles.menuItem}>
                      <Link href="#" className={styles.menuLink}>Мой плейлист</Link>
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
                      <Link className={styles.menuLink} href="/sign/in">Войти</Link>
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
