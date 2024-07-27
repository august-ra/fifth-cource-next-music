import styles from "./Volume.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import classNames from "classnames"


export default function Volume() {
  return (
    <div className={styles.volume}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, shared.btn)}>
          <input className={classNames(styles.volumeProgressLine, shared.btn)} type="range" name="range" />
        </div>
      </div>
    </div>
  )
}
