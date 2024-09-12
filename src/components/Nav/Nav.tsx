"use client"

import styles from "./Nav.module.css"

import Image from "next/image"
import Menu from "@components/Menu/Menu"

import { useState } from "react"


export default function Nav() {
  const [isOpened, setIsOpened] = useState<boolean>(false)

  function handleOpen() {
    setIsOpened((prev) => !prev)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image className={styles.logoImage} src="/img/logo.svg" alt="SkyPro Logo" width={114} height={17} />
      </div>

      <div className={styles.burger} onClick={handleOpen}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>

      {
        isOpened
          && (
            <Menu setIsOpened={setIsOpened} />
          )
      }
    </nav>
  )
}
