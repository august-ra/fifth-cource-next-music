import styles from "./Volume.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import cn from "classnames"


export default function Volume() {
  return (
    <div className={styles.volume}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={cn(styles.volumeProgress, shared.btn)}>
          <input className={cn(styles.volumeProgressLine, shared.btn)} type="range" name="range" />
        </div>
      </div>
    </div>
  )
}
