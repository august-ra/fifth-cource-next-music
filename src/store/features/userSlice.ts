import { createSlice } from "@reduxjs/toolkit"

import { UserType } from "@/types"


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
})

export const { signOut } = userSlice.actions
export const userReducer = userSlice.reducer
