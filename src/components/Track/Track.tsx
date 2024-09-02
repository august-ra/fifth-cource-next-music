"use client"

import styles from "./Track.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import cn from "classnames"

import { useAppDispatch, useAppSelector } from "@/store/store"
import { setActivePlaylistAndTrackInside } from "@/store/features/playlistSlice"
import { PlaylistType, TrackType } from "@/types"
import { printTime } from "@/utils/datetime"


interface Props {
  playlist: PlaylistType
  track:    TrackType
}

export default function Track({ playlist, track }: Props) {
  const dispatch = useAppDispatch()
  const { currentTrack, isPaused } = useAppSelector((state) => state.playlist)

  function handleTrackClick() {
    dispatch(setActivePlaylistAndTrackInside({ playlist, track }))
  }

  const isCurrent: boolean = Boolean(currentTrack) && currentTrack._id === track._id

  return (
    <div className={styles.trackContainer} onClick={handleTrackClick}>
      <div className={styles.track}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
            {
              isCurrent
                && (
                  <div className={cn(styles.trackMark, { [styles.animated]: !isPaused })} />
                )
            }
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink} href="http://">
              {track.name} {/*<span>{additionals}</span>*/}
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">{track.author}</a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">{track.album}</a>
        </div>
        <div className={styles.trackTime}>
          <div className={shared.btnIcon}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            </svg>
          </div>
          <span className={styles.trackTimeText}>{printTime(track.duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  )
}
