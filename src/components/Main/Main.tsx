import styles from "./Main.module.css"

import Filter from "@components/Filter/Filter"
import Nav from "@components/Nav/Nav"
import Playlist from "@components/Playlist/Playlist"
import Searchbar from "@components/Searchbar/Searchbar"
import Sidebar from "@components/Sidebar/Sidebar"

import { TrackType } from "@/types"


interface Props {
  trackList: TrackType[]
  errorMsg: string
}

export default function Main({ trackList, errorMsg }: Props) {
  return (
    <main className={styles.mainContainer}>
      <Nav />

      <div className={styles.main}>
        <Searchbar />

        <h2 className={styles.mainTitle}>Треки</h2>
        <Filter trackList={trackList} />
        <Playlist trackList={trackList} errorMsg={errorMsg} />
      </div>

      <Sidebar />
    </main>
  )
}
