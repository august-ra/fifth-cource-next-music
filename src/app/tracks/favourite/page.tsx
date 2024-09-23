"use client"

import styles from "../Tracks.module.css"

import Filter from "@components/Filter/Filter"
import Playlist from "@components/Playlist/Playlist"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setPlaylist } from "@/store/features/playerSlice"


export default function Home() {
  const dispatch = useAppDispatch()
  const { playlists, filters } = useAppSelector((state) => state.player)

  useEffect(() => {
    dispatch(setPlaylist({ kind: "visible", playlist: playlists.favourite }))
  }, [])

  return (
    <>
      <h2 className={styles.mainTitle}>Любимые треки</h2>
      <Filter visiblePlaylist={playlists.visible} filteredPlaylist={playlists.filtered} filters={filters} />
      <Playlist playlist={playlists.sorted} errorMsg={null} />
    </>
  )
}
