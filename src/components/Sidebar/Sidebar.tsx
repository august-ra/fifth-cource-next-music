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
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <img className={styles.sidebarImg} src="/img/playlist01.png" alt="day's playlist" />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <img className={styles.sidebarImg} src="/img/playlist02.png" alt="day's playlist" />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <img className={styles.sidebarImg} src="/img/playlist03.png" alt="day's playlist" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
