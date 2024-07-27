import styles from "./Playlist.module.css"
import classNames from "classnames"

import Track from "@components/Track/Track"


export default function Playlist() {
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
        <Track artist={"Welcome Reality"} album={""} title={"Nero"} additionals={""} duration={"4:44"} />
        <Track artist={"Dynoro, Outwork, Mr. Gee"} album={""} title={"Elektro"} additionals={""} duration={"2:22"} />
        <Track artist={"Ali Bakgor"} album={""} title={"I’m Fire"} additionals={""} duration={"2:22"} />
        <Track artist={"Стоункат, Psychopath"} album={""} title={"Non Stop"} additionals={"(Remix)"} duration={"4:12"} />
        <Track artist={"Jaded, Will Clarke, AR/CO"} album={""} title={"Run Run"} additionals={"(feat. AR/CO)"} duration={"2:54"} />
        <Track artist={"Blue Foundation, Zeds Dead"} album={""} title={"Eyes on Fire"} additionals={"(Zeds Dead Remix)"} duration={"5:20"} />
        <Track artist={"HYBIT, Mr. Black, Offer Nissim, Hi Profile"} album={""} title={"Mucho Bien"} additionals={"(Hi Profile Remix)"} duration={"3:41"} />
        <Track artist={"minthaze"} album={"Captivating"} title={"Knives n Cherries"} additionals={""} duration={"1:48"} />
        <Track artist={"minthaze"} album={"Captivating"} title={"Knives n Cherries"} additionals={""} duration={"1:48"} />
        <Track artist={"Calvin Harris, Disciples"} album={""} title={"How Deep Is Your Love"} additionals={""} duration={"3:32"} />
        <Track artist={"Tom Boxer"} album={"Soundz Made in Romania"} title={"Morena"} additionals={""} duration={"3:36"} />
      </div>
    </div>
  )
}
