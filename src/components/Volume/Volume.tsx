"use client"

import styles from "./Volume.module.css"
import shared from "@/components/SharedButtons/SharedButtons.module.css"
import cn from "classnames"

import { ChangeEvent, RefObject, useEffect, useState } from "react"


interface Props {
  audioRef: RefObject<HTMLAudioElement>
}

export default function Volume({ audioRef }: Props) {
  const [volume, setVolume] = useState<number>(0.5)

  useEffect(() => {
    if (!audioRef.current)
      return

    audioRef.current.volume = volume
  }, [volume])

  function handleChangeVolume(event: ChangeEvent<HTMLInputElement>) {
    setVolume(Number(event.target.value))
  }

  return (
    <div className={styles.volume}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={cn(styles.volumeProgress, shared.btn)}>
          <input className={cn(styles.volumeProgressLine, shared.btn)} type="range" min={0} max={1} step={0.01} value={volume} onChange={handleChangeVolume} />
        </div>
      </div>
    </div>
  )
}
