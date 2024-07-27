import styles from "./Playlist.module.css"
import classNames from "classnames"

import Track from "@components/Track/Track"

import { TrackType } from "@/types"


interface Props {
  trackList: TrackType[]
  errorMsg:  string
}

export default function Playlist({ trackList, errorMsg }: Props) {
  if (errorMsg)
    return (
      <div className="playlist__item">{errorMsg}</div>
    )

  return (
    <div className={styles.playlistWrapper}>
      <div className={styles.playlistTitle}>
        <div className={classNames(styles.playlistCol, styles.col01)}>Трек</div>
        <div className={classNames(styles.playlistCol, styles.col02)}>Исполнитель</div>
        <div className={classNames(styles.playlistCol, styles.col03)}>Альбом</div>
        <div className={classNames(styles.playlistCol, styles.col04)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.playlistContent}>
        {
          trackList?.map((track: TrackType) => {
            return <Track {...track}/>
          })
        }
      </div>
    </div>
  )
}
