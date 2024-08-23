import styles from "./Player.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import cn from "classnames"

import ActiveTrack from "@components/ActiveTrack/ActiveTrack"

import { TrackType } from "@/types"


interface Props {
  currentTrack: TrackType
  isPaused:     boolean
  isLooped:     boolean
  togglePlay:   () => void
  toggleLoop:   () => void
}

export default function Player({ currentTrack, isPaused, isLooped, togglePlay, toggleLoop }: Props) {
  const state = isPaused ? "play" : "pause"

  return (
    <div className={styles.player}>
      <div className={styles.playerControls}>
        <div className={styles.playerBtnPrev}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
          </svg>
        </div>
        <div className={styles.playerBtnPlay} onClick={togglePlay}>
          <svg>
            <use xlinkHref={`/img/icon/sprite.svg#icon-${state}`} />
          </svg>
        </div>
        <div className={styles.playerBtnNext}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-next" />
          </svg>
        </div>
        <div className={cn(styles.playerBtnRepeat, shared.btnIcon, { [shared.active]: isLooped })} onClick={toggleLoop}>
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
