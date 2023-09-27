import { createSlice } from '@reduxjs/toolkit'
import { VideoData } from '@/types/video'
import { fetchAllVideoData, shareVideoData } from './videoThunks'
import { RootState } from '@/store'

interface VideoState {
  videos: VideoData[]
  loading: boolean
  error: any
  sharedLinkStatus: '' | 'start' | 'success' | 'fail'
}

const sliceName = 'video'

const initialState: VideoState = {
  videos: [],
  loading: false,
  error: null,
  sharedLinkStatus: '',
}

const videoSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    resetSharedLinkStatus: (state) => {
      return { ...state, sharedLinkStatus: '' }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVideoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllVideoData.fulfilled, (state, action) => {
        state.loading = false
        state.videos = action.payload
      })
      .addCase(fetchAllVideoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(shareVideoData.pending, (state) => {
        state.loading = true
        state.sharedLinkStatus = 'start'
      })
      .addCase(shareVideoData.fulfilled, (state, action) => {
        state.loading = false
        state.sharedLinkStatus = 'success'
      })
      .addCase(shareVideoData.rejected, (state, action) => {
        state.loading = false
        state.sharedLinkStatus = 'fail'
      })
  },
})

export const { resetSharedLinkStatus } = videoSlice.actions
const videoStateSelector = (state: RootState) => {
  return state[sliceName]
}
const sharedLinkStatusSelector = (state: RootState) => {
  const dataSelected = state[sliceName]
  return dataSelected.sharedLinkStatus
}

export const selectors = {
  sharedLinkStatusSelector,
  videoStateSelector,
}

export default videoSlice.reducer
