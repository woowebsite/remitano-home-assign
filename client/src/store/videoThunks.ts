import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllVideo, shareVideo } from '@/apis/videoService'

export const fetchAllVideoData = createAsyncThunk('video/fetchAllVideoData', async (_, { rejectWithValue }) => {
  try {
    return await fetchAllVideo()
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const shareVideoData = createAsyncThunk('video/shareVideoData', async (sharedLink: string, _) => {
  return await shareVideo(sharedLink)
})
