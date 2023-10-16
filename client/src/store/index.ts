import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit'
import videoSlice from '@/store/videoSlice'
import notifySlice from '@/store/notifySlice'
import userSlice from '@/store/userSlice'

export const rootReducer = combineReducers({
  video: videoSlice,
  user: userSlice,
  notify: notifySlice,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      user: userSlice,
      video: videoSlice,
      notify: notifySlice,
    },
    preloadedState,
  })
}

export const store = configureStore({
  reducer: rootReducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
