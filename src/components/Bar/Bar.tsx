"use client"

import styles from "./Bar.module.css"

import Player from "@components/Player/Player"
import ProgressBar from "@components/Bar/ProgressBar/ProgressBar"
import Volume from "@components/Volume/Volume"

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { selectNextTrack, selectPrevTrack, setIsPaused, toggleIsShuffled } from "@/store/features/playerSlice"
import { getEmptyTrack } from "@/store/features/playerSlice"
import { printTime } from "@/utils/datetime"


export default function Bar() {
  const dispatch = useAppDispatch()
  const [isLooped, setIsLooped] = useState<boolean>(false)
  const [position, setPosition] = useState<number>(0)
  const currentTrack = useAppSelector((state) => state.player.currentTrack)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentAudio = audioRef?.current

  useEffect(() => {
    if (!currentTrack || !currentAudio)
      return

    dispatch(setIsPaused(false))
    setPosition(0)

    audioRef.current.currentTime = 0
    currentAudio.play()
  }, [currentTrack])

  useEffect(() => {
    if (currentAudio) {
      audioRef.current.loop = isLooped
    }
  }, [isLooped])

  const togglePlay = useCallback(() => {
    if (!currentAudio || !currentTrack || !currentTrack._id)
      return

    if (currentAudio.paused)
      currentAudio.play()
    else
      currentAudio.pause()

    dispatch(setIsPaused(currentAudio.paused))
  }, [currentTrack])

  const toggleLoop = useCallback(() => setIsLooped((prev) => !prev), [])

  const toggleShuffled = useCallback(() => dispatch(toggleIsShuffled()), [])

  const handleTimeUpdate = useCallback((event: ChangeEvent<HTMLAudioElement>) => {
    setPosition(event.currentTarget.currentTime)
  }, [])

  const goNextTrack = useCallback(() => {
    if (!isLooped)
      handleNextTrack()
  }, [isLooped])

  const handleNextTrack = useCallback(() => dispatch(selectNextTrack()), [])

  const handlePrevTrack = useCallback(() => dispatch(selectPrevTrack()), [])

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio className={styles.barAudio} src={currentTrack?.track_file}
               ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={goNextTrack} />

        <ProgressBar audioRef={audioRef} defaultMax={0} position={position} />

        <div className={styles.barPlayer}>
          <Player currentTrack={currentTrack ?? getEmptyTrack()} isLooped={isLooped}
                  handlePrev={handlePrevTrack} handleNext={handleNextTrack}
                  togglePlay={togglePlay} toggleLoop={toggleLoop} toggleShuffle={toggleShuffled} />

          <Volume audioRef={audioRef} />

          <span className={styles.barTimers}>
            {
              currentAudio && !isNaN(currentAudio.duration)
                && `${printTime(currentAudio.currentTime)} / ${printTime(currentAudio.duration )}`
            }
          </span>
        </div>
      </div>
    </div>
  )
}
