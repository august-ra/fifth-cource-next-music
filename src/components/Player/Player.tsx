import styles from "./Player.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import cn from "classnames"

import ActiveTrack from "@components/ActiveTrack/ActiveTrack"

import { TrackType } from "@/types"


interface Props {
  currentTrack: TrackType
}

export default function Player({ currentTrack }: Props) {
  return (
    <div className={styles.player}>
      <div className={styles.playerControls}>
        <div className={styles.playerBtnPrev}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
          </svg>
        </div>
        <div className={styles.playerBtnPlay}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-play" />
          </svg>
        </div>
        <div className={styles.playerBtnNext}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-next" />
          </svg>
        </div>
        <div className={cn(styles.playerBtnRepeat, shared.btnIcon)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
          </svg>
        </div>
        <div className={cn(styles.playerBtnShuffle, shared.btnIcon)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
          </svg>
        </div>
      </div>

      <ActiveTrack currentTrack={currentTrack} />
    </div>
  )
}
