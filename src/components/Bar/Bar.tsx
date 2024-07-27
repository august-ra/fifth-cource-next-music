import styles from "./Bar.module.css"

import Player from "@components/Player/Player"
import Volume from "@components/Volume/Volume"


export default function Bar() {
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barProgress} />
        <div className={styles.barPlayer}>
          <Player />
          <Volume />
        </div>
      </div>
    </div>
  )
}
