import styles from "./Track.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"


interface Props {
  album:               string
  author:              string
  name:                string
  duration_in_seconds: number
  _id:                 number
}

export default function Track({ album, author: artist, name: title, duration_in_seconds: duration, _id }: Props) {
  return (
    <div className={styles.trackContainer}>
      <div className={styles.track}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink} href="http://">
              {title} {/*<span>{additionals}</span>*/}
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">{artist}</a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">{album}</a>
        </div>
        <div className={styles.trackTime}>
          <div className={shared.btnIcon}>
            <svg>
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            </svg>
          </div>
          <span className={styles.trackTimeText}>{duration}</span>
        </div>
      </div>
    </div>
  )
}
