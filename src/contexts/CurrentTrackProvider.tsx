"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { TrackType } from "@/types"


interface CurrentTrackContextValue {
  currentTrack:    TrackType | null,
  setCurrentTrack: Dispatch<SetStateAction<TrackType | null>>,
  getEmptyTrack:   () => TrackType,
}

const CurrentTrackContext = createContext<CurrentTrackContextValue | undefined>(undefined)

interface Props {
  children: ReactNode,
}

function getEmptyTrack(): TrackType {
  return {
    _id:                  0,
    name:                "",
    author:              "",
    release_date:        "",
    genre:               [],
    duration_in_seconds:  0,
    album:               "",
    track_file:          "",
    staredUser:          [],
    logo: {
      type:              "",
      data:              [],
    },
  }
}

export default function CurrentTrackProvider({ children }: Props) {
  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null)

  return (
    <CurrentTrackContext.Provider value={{ currentTrack, setCurrentTrack, getEmptyTrack }}>{children}</CurrentTrackContext.Provider>
  )
}

export function useCurrentTrack() {
  const context = useContext(CurrentTrackContext)

  if (!context)
    throw new Error("useCurrentTrack must be used within CurrentTrackProvider")

  return context
}
