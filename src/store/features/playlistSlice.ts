import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {TrackType} from "@/types"


interface PlaylistState {
  currentTrack: TrackType | null
}

const initialState: PlaylistState = {
  currentTrack: null,
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
    setCurrentTrack(state, action: PayloadAction<TrackType>) {
      state.currentTrack = action.payload
    },
  },
})

export const { setCurrentTrack } = playlistSlice.actions
export const playlistReducer = playlistSlice.reducer
