import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export type NotifyData = {
  title?: string
  message?: string
  type?: 'success' | 'danger' | 'warning'
}

const sliceName = 'notify'

interface NotifyState {
  notifies: NotifyData[]
  loading: boolean
  error: any
}

const initialState: NotifyState = {
  notifies: [],
  loading: false,
  error: null,
}

const notifySlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addNotifyToList: (state, action) => {
      state.notifies = action.payload ? [action.payload] : []
    },
  },
})

export const { addNotifyToList } = notifySlice.actions

// selectors
const notifyStateSelector = (state: RootState) => {
  return state[sliceName]
}
export const selectors = {
  notifyStateSelector,
}

export default notifySlice.reducer
