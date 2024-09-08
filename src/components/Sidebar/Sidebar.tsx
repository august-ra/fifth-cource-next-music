import styles from "./Sidebar.module.css"


export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>Sergey.Ivanov</p>
        <div className={styles.sidebarIcon}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-logout" />
          </svg>
        </div>
      </div>
      <div className={styles.sidebarBlock}>
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
    </div>
  )
}
