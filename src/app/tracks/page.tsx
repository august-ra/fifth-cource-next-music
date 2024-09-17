import styles from "./Tracks.module.css"

import Filter from "@components/Filter/Filter"
import Playlist from "@components/Playlist/Playlist"

import { TracksAPI } from "@/api/tracks"
import { PlaylistType } from "@/types/tracksTypes"
import { ErrorMessage, isError } from "@/types/errorsTypes"


export default async function Home() {
  let playlist: PlaylistType = []
  let errorMsg: ErrorMessage | null

  try {
    const data = await TracksAPI.getTracks()

    if (isError(data))
      errorMsg = data as ErrorMessage
    else
      [playlist, errorMsg] = [data, null]
  } catch (error: unknown) {
    if (error instanceof Error)
      errorMsg = { status: 0, endpoint: "", message: error.message }
    else
      errorMsg = { status: 0, endpoint: "", message: "Неизвестная ошибка" }
  }

  return (
    <>
      <h2 className={styles.mainTitle}>Треки</h2>
      <Filter playlist={playlist} />
      <Playlist playlist={playlist} errorMsg={errorMsg} />
    </>
  )
}
