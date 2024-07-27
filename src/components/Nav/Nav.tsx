import Image from "next/image"
import Link from "next/link"

import styles from "./Nav.module.css"


export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Image className={styles.logoImage} src="/img/logo.png" alt="SkyPro Logo" width={114} height={17} />
      </div>
      <div className={styles.burger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="#" className={styles.menuLink}>Главное</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="#" className={styles.menuLink}>Мой плейлист</Link>
          </li>
          <li className={styles.menuItem}>
            <Link href="../signin.html" className={styles.menuLink}>Войти</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
