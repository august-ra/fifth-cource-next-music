import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { TracksAPI } from "@/api/tracks"
import { CatalogsType, PlaylistType, TrackType } from "@/types/tracksTypes"


const getFavouriteTracks = createAsyncThunk("playlist/getFavouriteTracks", TracksAPI.getFavouriteTracks)
const getCatalogs        = createAsyncThunk("playlist/getCatalogs",        TracksAPI.getCatalogs)


interface PlaylistState {
  activePlaylist:   PlaylistType
  shuffledPlaylist: PlaylistType
  favouriteTracks:  PlaylistType
  catalogs:         CatalogsType
  catalogName:      string
  currentTrack:     TrackType | null
  isPaused:         boolean
  isShuffled:       boolean
}

interface PlaylistInfo {
  playlist: PlaylistType
  track:    TrackType
}

const initialState: PlaylistState = {
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

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setActivePlaylist(state, action: PayloadAction<PlaylistType>) {
      state.activePlaylist = action.payload

      if (state.isShuffled)
        state.shuffledPlaylist = state.activePlaylist.toSorted(() => 0.5 - Math.random())
      else
        state.shuffledPlaylist = state.activePlaylist
    },
    setActivePlaylistAndTrackInside(state, action: PayloadAction<PlaylistInfo>) {
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

export { getFavouriteTracks, getCatalogs }
export const { setActivePlaylist, setActivePlaylistAndTrackInside, setCatalogName, setIsPaused, selectPrevTrack, selectNextTrack, toggleIsShuffled, likeTrack, dislikeTrack } = playlistSlice.actions
export const playlistReducer = playlistSlice.reducer
