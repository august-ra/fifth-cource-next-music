import styles from "./Main.module.css"

import Filter from "@components/Filter/Filter"
import Nav from "@components/Nav/Nav"
import Playlist from "@components/Playlist/Playlist"
import Searchbar from "@components/Searchbar/Searchbar"
import Sidebar from "@components/Sidebar/Sidebar"


export default function Main() {
  return (
    <main className={styles.mainContainer}>
      <Nav />

      <div className={styles.main}>
        <Searchbar />
        <h2 className={styles.mainTitle}>Треки</h2>
        <Filter />
        <Playlist />
      </div>

      <Sidebar />
    </main>
  )
}
