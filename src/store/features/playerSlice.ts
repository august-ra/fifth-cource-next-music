import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { TracksAPI } from "@/api/tracks"
import { CatalogsCollectionType, PlaylistType, TrackType } from "@/types/tracksTypes"
import { isError } from "@/types/errorsTypes"


const getTracks          = createAsyncThunk("player/getTracks",          TracksAPI.getTracks)
const getFavouriteTracks = createAsyncThunk("player/getFavouriteTracks", TracksAPI.getFavouriteTracks)
const getCatalogs        = createAsyncThunk("player/getCatalogs",        TracksAPI.getCatalogs)


interface PlayerState {
  activePlaylist:   PlaylistType
  shuffledPlaylist: PlaylistType
  favouriteTracks:  PlaylistType
  catalogs:         CatalogsCollectionType
  catalogName:      string
  currentTrack:     TrackType | null
  isPaused:         boolean
  isShuffled:       boolean
}

interface PlayerInfo {
  playlist: PlaylistType
  track:    TrackType
}

const initialState: PlayerState = {
  activePlaylist:   [],
  shuffledPlaylist: [],
  favouriteTracks:  [],
  catalogs:         [],
  catalogName:      "",
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

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActivePlaylist(state, action: PayloadAction<PlaylistType>) {
      state.activePlaylist = action.payload
    },
    setActivePlaylistAndTrackInside(state, action: PayloadAction<PlayerInfo>) {
      state.activePlaylist = action.payload.playlist
      state.currentTrack   = action.payload.track

      if (state.isShuffled)
        state.shuffledPlaylist = state.activePlaylist.toSorted(() => 0.5 - Math.random())
      else
        state.shuffledPlaylist = state.activePlaylist
    },
    setCatalogName(state, action: PayloadAction<string>) {
      state.catalogName = action.payload
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
    selectNextTrack(state, action: PayloadAction<boolean>) {
      const index = state.shuffledPlaylist.findIndex((track) => track._id === state.currentTrack?._id)
      const track = state.shuffledPlaylist[index + 1]

      if (track)
        state.currentTrack = track
      else if (action.payload)
        state.isPaused     = true
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
    likeTrack(state, action: PayloadAction<TrackType>) {
      state.favouriteTracks.push(action.payload)
    },
    dislikeTrack(state, action: PayloadAction<TrackType>) {
      state.favouriteTracks = state.favouriteTracks.filter((track) => track._id !== action.payload._id)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTracks.fulfilled, (state, action) => {
        if (!isError(action.payload))
          state.activePlaylist = action.payload
      })
      .addCase(getTracks.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
      .addCase(getFavouriteTracks.fulfilled, (state, action) => {
        state.favouriteTracks = action.payload
      })
      .addCase(getFavouriteTracks.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
      .addCase(getCatalogs.fulfilled, (state, action) => {
        state.catalogs = action.payload
      })
      .addCase(getCatalogs.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
  },
})

export { getTracks, getFavouriteTracks, getCatalogs }
export const { setActivePlaylist, setActivePlaylistAndTrackInside, setCurrentTrack, setCatalogName, setIsPaused, selectPrevTrack, selectNextTrack, toggleIsShuffled, likeTrack, dislikeTrack } = playerSlice.actions
export const playerReducer = playerSlice.reducer
