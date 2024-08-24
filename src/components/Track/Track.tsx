"use client"

import styles from "./Track.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"

import { useAppDispatch } from "@/store/store"
import { setCurrentTrack } from "@/store/features/playlistSlice"
import { TrackType } from "@/types"
import { printTime } from "@/utils/datetime"


interface Props {
  track: TrackType
}

export default function Track({ track }: Props) {
  const dispatch = useAppDispatch()

  function handleTrackClick() {
    dispatch(setCurrentTrack(track))
  }

  return (
    <div className={styles.trackContainer} onClick={handleTrackClick}>
      <div className={styles.track}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
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
