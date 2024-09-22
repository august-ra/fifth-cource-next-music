import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { TracksAPI } from "@/api/tracks"
import { CatalogsCollectionType, PlaylistType, TrackType } from "@/types/tracksTypes"
import { isError } from "@/types/errorsTypes"


const getTracks          = createAsyncThunk("player/getTracks",          TracksAPI.getTracks)
const getFavouriteTracks = createAsyncThunk("player/getFavouriteTracks", TracksAPI.getFavouriteTracks)
const getCatalogs        = createAsyncThunk("player/getCatalogs",        TracksAPI.getCatalogs)


/* interfaces */

interface PlayerState {
  playlists: {
    empty:     PlaylistType
    initial:   PlaylistType // full
    favourite: PlaylistType
    active:    PlaylistType // playing
    shuffled:  PlaylistType
    visible:   PlaylistType // shown
    filtered:  PlaylistType
  }
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

interface PlaylistInfo {
  kind:     keyof PlayerState['playlists']
  playlist: PlaylistType
}


/* initial state */

const initialState: PlayerState = {
  playlists: {
    empty:     [],
    initial:   [],
    favourite: [],
    active:    [],
    shuffled:  [],
    visible:   [],
    filtered:  [],
  },
  catalogs:     [],
  catalogName:  "",
  currentTrack: null,
  isPaused:     true,
  isShuffled:   false,
}

/* functions */

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


/* slice */

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlaylist(state, action: PayloadAction<PlaylistInfo>) {
      state.playlists[action.payload.kind] = action.payload.playlist ?? state.playlists.empty

      if (action.payload.kind === "active") {
        if (state.isShuffled)
          state.playlists.shuffled = state.playlists.active.toSorted(() => 0.5 - Math.random())
        else
          state.playlists.shuffled = state.playlists.active
      } else if (action.payload.kind === "visible") {
        state.playlists.filtered = state.playlists.visible
      }
    },
    setActivePlaylistAndTrackInside(state, action: PayloadAction<PlayerInfo>) {
      state.playlists.active = action.payload.playlist
      state.currentTrack     = action.payload.track

      if (state.isShuffled)
        state.playlists.shuffled = state.playlists.active.toSorted(() => 0.5 - Math.random())
      else
        state.playlists.shuffled = state.playlists.active
    },
    setCatalogName(state, action: PayloadAction<string>) {
      state.catalogName = action.payload
    },
    selectPrevTrack(state) {
      const index = state.playlists.shuffled.findIndex((track) => track._id === state.currentTrack?._id)
      const track = state.playlists.shuffled[index - 1]

      if (track)
        state.currentTrack = track
    },
    selectNextTrack(state, action: PayloadAction<boolean>) {
      const index = state.playlists.shuffled.findIndex((track) => track._id === state.currentTrack?._id)
      const track = state.playlists.shuffled[index + 1]

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
        state.playlists.shuffled = state.playlists.active.toSorted(() => 0.5 - Math.random())
      else
        state.playlists.shuffled = state.playlists.active
    },
    likeTrack(state, action: PayloadAction<TrackType>) {
      state.playlists.favourite.push(action.payload)
    },
    dislikeTrack(state, action: PayloadAction<TrackType>) {
      state.playlists.favourite = state.playlists.favourite.filter((track) => track._id !== action.payload._id)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTracks.fulfilled, (state, action) => {
        if (!isError(action.payload))
          state.playlists.initial = action.payload
      })
      .addCase(getTracks.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
      .addCase(getFavouriteTracks.fulfilled, (state, action) => {
        state.playlists.favourite = action.payload
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
export const { setPlaylist, setActivePlaylistAndTrackInside, setCatalogName, setIsPaused, selectPrevTrack, selectNextTrack, toggleIsShuffled, likeTrack, dislikeTrack } = playerSlice.actions
export const playerReducer = playerSlice.reducer
