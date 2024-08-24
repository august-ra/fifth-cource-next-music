import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux"
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { playlistReducer } from "@/store/features/playlistSlice"

export function makeStore() {
  return configureStore({
    reducer: combineReducers({
      playlist: playlistReducer,
    })
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
