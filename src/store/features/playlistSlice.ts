import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { TrackType } from "@/types"


interface PlaylistState {
  activePlaylist:   TrackType[]
  shuffledPlaylist: TrackType[]
  currentTrack:     TrackType | null
  isPaused:         boolean
  isShuffled:       boolean
}

interface PlaylistInfo {
  playlist: TrackType[]
  track:    TrackType
}

const initialState: PlaylistState = {
  activePlaylist:   [],
  shuffledPlaylist: [],
  currentTrack:     null,
  isPaused:         true,
  isShuffled:       false,
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

      if (state.isShuffled)
        state.shuffledPlaylist = state.activePlaylist.toSorted(() => 0.5 - Math.random())
      else
        state.shuffledPlaylist = state.activePlaylist
    },
    setCurrentTrack(state, action: PayloadAction<TrackType>) {
      state.currentTrack = action.payload
    },
    selectPrevTrack(state) {
      const index = state.shuffledPlaylist.findIndex((track) => track._id === state.currentTrack?._id)
      const track = state.shuffledPlaylist[index - 1]

      if (track)
        state.currentTrack = track
    },
    selectNextTrack(state) {
      const index = state.shuffledPlaylist.findIndex((track) => track._id === state.currentTrack?._id)
      const track = state.shuffledPlaylist[index + 1]

      if (track)
        state.currentTrack = track
    },
    setIsPaused(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload
    },
    toggleIsShuffled(state) {
      console.log("toggleIsShuffled", state.isShuffled)

      state.isShuffled = !state.isShuffled

      if (state.isShuffled)
        state.shuffledPlaylist = state.activePlaylist.toSorted(() => 0.5 - Math.random())
      else
        state.shuffledPlaylist = state.activePlaylist
    },
  },
})

export const { setActivePlaylistAndTrackInside, setCurrentTrack, setIsPaused, selectPrevTrack, selectNextTrack, toggleIsShuffled } = playlistSlice.actions
export const playlistReducer = playlistSlice.reducer
