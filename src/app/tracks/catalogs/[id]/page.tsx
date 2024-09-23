"use client"

import styles from "../../Tracks.module.css"

import Filter from "@components/Filter/Filter"
import Playlist from "@components/Playlist/Playlist"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { setPlaylist, setCatalogName } from "@/store/features/playerSlice"
import { TracksAPI } from "@/api/tracks"
import { ErrorMessage, isError } from "@/types/errorsTypes"


interface Props {
  params: {
    id: string
  },
}

export default function Catalog({ params }: Props) {
  const dispatch = useAppDispatch()
  const { playlists, catalogName, filters } = useAppSelector((state) => state.player)
  const [errorMsg, setErrorMsg] = useState<ErrorMessage | null>(null)

  useEffect(() => {
    Promise.all([TracksAPI.getTracks(), TracksAPI.getCatalogTracks(params.id)])
      .then(([responseTracks, responseCategory]) => {
        if (isError(responseTracks))
          return setErrorMsg(responseTracks as ErrorMessage)

        const tracks = responseTracks.filter((track) => responseCategory.items.includes(track._id))

        dispatch(setPlaylist({ kind: "initial", playlist: responseTracks }))
        dispatch(setPlaylist({ kind: "visible", playlist: tracks }))
        dispatch(setCatalogName(responseCategory.name))
      })
      .catch((error: unknown) => {
        if (error instanceof Error)
          setErrorMsg({ status: 0, endpoint: "", message: error.message })
        else
          setErrorMsg({ status: 0, endpoint: "", message: "Неизвестная ошибка" })
      })
  }, [])

  return (
    <>
      <h2 className={styles.mainTitle}>{catalogName}</h2>
      <Filter visiblePlaylist={playlists.visible} filteredPlaylist={playlists.filtered} filters={filters} />
      <Playlist playlist={playlists.sorted} errorMsg={errorMsg} />
    </>
  )
}
