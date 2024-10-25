import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { playerReducer } from "@/store/features/playerSlice"
import { userReducer } from "@/store/features/userSlice"


const rootReducer = combineReducers({
  player: playerReducer,
  user:   userReducer,
})

export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
