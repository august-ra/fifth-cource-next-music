import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {TrackType} from "@/types"


interface PlaylistState {
  activePlaylist: TrackType[]
  currentTrack:   TrackType | null
  isPaused:       boolean
}

interface PlaylistInfo {
  playlist: TrackType[]
  track:    TrackType
}

const initialState: PlaylistState = {
  activePlaylist: [],
  currentTrack:   null,
  isPaused:       false,
}

export function getEmptyTrack(): TrackType {
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

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setActivePlaylistAndTrackInside(state, action: PayloadAction<PlaylistInfo>) {
      state.activePlaylist = action.payload.playlist
      state.currentTrack   = action.payload.track
    },
    setCurrentTrack(state, action: PayloadAction<TrackType>) {
      state.currentTrack = action.payload
    },
    setIsPaused(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload
    },
  },
})

export const { setActivePlaylistAndTrackInside, setCurrentTrack, setIsPaused } = playlistSlice.actions
export const playlistReducer = playlistSlice.reducer
