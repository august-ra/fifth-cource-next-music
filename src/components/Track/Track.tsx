import styles from "./Track.module.css"


interface Props {
  album:       string
  artist:      string
  title:       string
  additionals: string
  duration:    string
}

export default function Track({ album, artist, title, additionals, duration }: Props) {
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
              {title} <span>{additionals}</span>
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
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>{duration}</span>
        </div>
      </div>
    </div>
  )
}
