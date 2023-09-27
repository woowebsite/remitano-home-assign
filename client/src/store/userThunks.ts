import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserProfile, userLoginOrRegister } from '@/apis/userService'
import { LoginRegisterFormData } from '@/types/video'
import LocalStorageService from '@/shared/services/localStorage'
import { userLogout } from './userSlice'
import SocketClient from '@/apis/socket'
const localStorage = new LocalStorageService()

export const loginOrRegister = createAsyncThunk('user/loginOrRegister', async (payload: LoginRegisterFormData, { rejectWithValue }) => {
  try {
    const { email, password } = payload
    const user = await userLoginOrRegister(email, password)
    localStorage.setToken(user.token)
    localStorage.setUser(user?.email)

    const socketClient = SocketClient.getInstance()
    const socket = socketClient.getSocket()
    if (socket) socket.removeAllListeners()
    socketClient.init()

    return user
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getProfile = createAsyncThunk('user/getProfile', async (_, { rejectWithValue }) => {
  try {
    return await getUserProfile()
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
  localStorage.clearToken()
  localStorage.removeItem('user')
  dispatch(userLogout())
  return true
})
