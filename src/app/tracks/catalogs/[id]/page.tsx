"use client"

import styles from "../../Tracks.module.css"

import Filter from "@components/Filter/Filter"
import Playlist from "@components/Playlist/Playlist"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setPlaylist, setCatalogName } from "@/store/features/playerSlice"
import { TracksAPI } from "@/api/tracks"
import { isError } from "@/types/errorsTypes"


interface Props {
  params: {
    id: string
  },
}

export default function Catalog({ params }: Props) {
  const dispatch = useAppDispatch()
  const { playlists, catalogName } = useAppSelector((state) => state.player)

  useEffect(() => {
    Promise.all([TracksAPI.getTracks(), TracksAPI.getCatalogTracks(params.id)])
      .then(([responseTracks, responseCategory]) => {
        if (isError(responseTracks))
          return

        const tracks = responseTracks.filter((track) => responseCategory.items.includes(track._id))

        dispatch(setPlaylist({ kind: "initial", playlist: responseTracks }))
        dispatch(setPlaylist({ kind: "visible", playlist: tracks }))
        dispatch(setCatalogName(responseCategory.name))
      })
  }, [])

  return (
    <>
      <h2 className={styles.mainTitle}>{catalogName}</h2>
      <Filter playlist={playlists.filtered} />
      <Playlist playlist={playlists.filtered} errorMsg={null} />
    </>
  )
}
