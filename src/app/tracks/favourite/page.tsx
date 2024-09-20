"use client"

import styles from "../Tracks.module.css"

import Filter from "@components/Filter/Filter"
import Playlist from "@components/Playlist/Playlist"

import { useAppSelector } from "@/store/store"


export default function Home() {
  const favouriteTracks = useAppSelector((state) => state.player.favouriteTracks)

  return (
    <>
      <h2 className={styles.mainTitle}>Любимые треки</h2>
      <Filter playlist={favouriteTracks} />
      <Playlist playlist={favouriteTracks} errorMsg={null} />
    </>
  )
}
