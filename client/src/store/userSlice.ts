import { createSlice } from '@reduxjs/toolkit'
import { UserData } from '@/types/user'
import { getProfile, loginOrRegister } from './userThunks'
import { RootState } from '@/store'

interface UserState {
  user: UserData | null
  loading: boolean
  error: any
}
const sliceName = 'user'

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    userLogout: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginOrRegister.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginOrRegister.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginOrRegister.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
  },
})

export const { userLogout } = userSlice.actions

const userStateSelector = (state: RootState) => {
  return state[sliceName]
}
export const selectors = {
  userStateSelector,
}

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice
export { userSlice }
export default reducer
