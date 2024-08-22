"use client"

import styles from "./Bar.module.css"

import Player from "@components/Player/Player"
import ProgressBar from "@components/Bar/ProgressBar/ProgressBar"
import Volume from "@components/Volume/Volume"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useCurrentTrack } from "@contexts/CurrentTrackProvider"
import { printTime } from "@/utils/datetime"


export default function Bar() {
  const [isPaused, setIsPaused] = useState<boolean>(true)
  const [isLooped, setIsLooped] = useState<boolean>(false)
  const [position, setPosition] = useState<number>(0)
  const { currentTrack, getEmptyTrack } = useCurrentTrack()
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentAudio = audioRef?.current

  useEffect(() => {
    if (!currentAudio)
      return

    setIsPaused(false)
    setPosition(0)

    audioRef.current.currentTime = 0
    currentAudio.play()
  }, [currentTrack])

  useEffect(() => {
    if (currentAudio) {
      console.log(isLooped)
      audioRef.current.loop = isLooped
    }
  }, [isLooped])

  function togglePlay() {
    if (!currentAudio)
      return

    if (currentAudio.paused)
      currentAudio.play()
    else
      currentAudio.pause()

    setIsPaused(currentAudio.paused)
  }

  function toggleLoop() {
    setIsLooped((prev) => !prev)
  }

  function handleTimeUpdate(event: ChangeEvent<HTMLAudioElement>) {
    setPosition(event.currentTarget.currentTime)
  }

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    if (currentAudio)
      currentAudio.currentTime = Number(event.target.value)
  }

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        {
          currentAudio && !isNaN(currentAudio.duration)
            && <span className={styles.barTimers}>
              {printTime(currentAudio.currentTime)} / {printTime(currentAudio.duration )}
            </span>
        }

        <audio src={currentTrack?.track_file} ref={audioRef} onTimeUpdate={handleTimeUpdate} />

        <ProgressBar max={currentAudio?.duration || 0} position={position} handleSeek={handleSeek} />

        <div className={styles.barPlayer}>
          <Player currentTrack={currentTrack ?? getEmptyTrack()} isPaused={isPaused} isLooped={isLooped} togglePlay={togglePlay} toggleLoop={toggleLoop} />

          <Volume audioRef={audioRef} />
        </div>
      </div>
    </div>
  )
}
