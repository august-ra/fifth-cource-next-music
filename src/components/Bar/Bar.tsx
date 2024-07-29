"use client"

import styles from "./Bar.module.css"

import Player from "@components/Player/Player"
import Volume from "@components/Volume/Volume"

import { useCurrentTrack } from "@contexts/CurrentTrackProvider"


export default function Bar() {
  const { currentTrack, getEmptyTrack } = useCurrentTrack()

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barProgress} />
        <div className={styles.barPlayer}>
          <Player currentTrack={currentTrack ?? getEmptyTrack()} />
          <Volume />
        </div>
      </div>
    </div>
  )
}
