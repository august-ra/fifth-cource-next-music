import styles from "./ActiveTrack.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import classNames from "classnames"


export default function ActiveTrack() {
  return (
    <div className={styles.track}>
      <div className={styles.trackContainer}>
        <div className={styles.trackImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">Ты та...</a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">Баста</a>
        </div>
      </div>
      <div className={styles.trackLikeContainer}>
        <div className={classNames(styles.trackLike, shared.btnIcon)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          </svg>
        </div>
        <div className={classNames(styles.trackDislike, shared.btnIcon)}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
          </svg>
        </div>
      </div>
    </div>
  )
}
