import styles from "./ActiveTrack.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import cn from "classnames"

import { TrackType } from "@/types"


interface Props {
  currentTrack: TrackType
}

export default function ActiveTrack({ currentTrack }: Props) {
  if (!currentTrack._id)
    return (
      <div className={cn(styles.track, styles.emptyTrack)}>
        <div className={styles.trackImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={cn(styles.trackAlbum, styles.trackAlbumLink)}>
          Не выбрана песня
        </div>
      </div>
    )

  return (
    <div className={styles.track}>
      <div className={styles.trackContainer}>
        <div className={styles.trackImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">{currentTrack.name}</a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">{currentTrack.author}</a>
        </div>
      </div>
      <div className={styles.trackLikeContainer}>
        <div className={cn(styles.trackLike, shared.btnIcon)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          </svg>
        </div>
        <div className={cn(styles.trackDislike, shared.btnIcon)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
          </svg>
        </div>
      </div>
    </div>
  )
}
