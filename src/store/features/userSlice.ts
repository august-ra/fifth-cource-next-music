import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

import { UserAPI } from "@/api/users"
import { UserType } from "@/types"


const signIn        = createAsyncThunk("user/getUser",       UserAPI.signIn)
const signUp        = createAsyncThunk("user/addUser",       UserAPI.signUp)
const getTokens     = createAsyncThunk("user/getTokens",     UserAPI.getTokens)
const refreshTokens = createAsyncThunk("user/refreshTokens", UserAPI.refreshTokens)


interface TokenState {
  access:  string | null
  refresh: string | null
}

interface UserState {
  user: UserType | null
  tokens: TokenState
}

const initialState: UserState = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null
      state.tokens.access  = null
      state.tokens.refresh = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
      })
      .addCase(signIn.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
      })
      .addCase(signUp.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
      .addCase(getTokens.fulfilled, (state, action: PayloadAction<TokenState>) => {
        state.tokens.access  = action.payload.access
        state.tokens.refresh = action.payload.refresh
      })
      .addCase(getTokens.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
      .addCase(refreshTokens.fulfilled, (state, action: PayloadAction<TokenState>) => {
        state.tokens.access  = action.payload.access
        state.tokens.refresh = action.payload.refresh
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        console.error("Error:", action.error.message)
      })
  },
})

export { signIn, signUp, getTokens, refreshTokens }
export const { signOut } = userSlice.actions
export const userReducer = userSlice.reducer
