import styles from "./Playlist.module.css"
import cn from "classnames"

import ErrorBlock from "@components/ErrorBlock/ErrorBlock"
import PlaylistSkeleton from "@components/PlaylistSkeleton/PlaylistSkeleton"
import Track from "@components/Track/Track"

import { PlaylistType, TrackType } from "@/types/tracksTypes"
import { ErrorMessage } from "@/types/errorsTypes"


interface Props {
  playlist:  PlaylistType
  isLoading: boolean
  errorMsg:  ErrorMessage | null
}

export default function Playlist({ playlist, errorMsg }: Props) {
  if (errorMsg)
    return (
      <ErrorBlock errorMsg={errorMsg} />
    )

  if (!isLoading && !playlist.length)
    return (
      <div className={styles.playlistWrapper}>Ого! Треки не найдены...</div>
    )

  return (
    <div className={styles.playlistWrapper}>
      <div className={styles.playlistTitle}>
        <div className={cn(styles.playlistCol, styles.col01)}>Трек</div>
        <div className={cn(styles.playlistCol, styles.col02)}>Исполнитель</div>
        <div className={cn(styles.playlistCol, styles.col03)}>Альбом</div>
        <div className={cn(styles.playlistCol, styles.col04)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.playlistContent}>
        {
          isLoading
            ? (
              <PlaylistSkeleton />
            )
            : playlist?.map((track: TrackType) => (
              <Track key={track._id} playlist={playlist} track={track} />
            ))
        }
      </div>
    </div>
  )
}
