import styles from "./Sidebar.module.css"

import Image from "next/image"
import Link from "next/link"
import SidebarPersonal from "@components/Sidebar/SidebarPersonal/SidebarPersonal"


export default function Sidebar() {

  return (
    <div className={styles.sidebar}>
      <SidebarPersonal />

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
