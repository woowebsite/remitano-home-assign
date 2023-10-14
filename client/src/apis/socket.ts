import LocalStorageService from '@/shared/utils/localStorage'
import store from '@/store'
import { addNotifyToList } from '@/store/notifySlice'
import { io, Socket } from 'socket.io-client'

class SocketClient {
  private static instance: SocketClient
  private socket: Socket | null = null

  private constructor() {}

  public static getInstance(): SocketClient {
    if (!SocketClient.instance) {
      SocketClient.instance = new SocketClient()
    }
    return SocketClient.instance
  }

  public init() {
    const localStorageService = new LocalStorageService()
    const token = localStorageService.getToken()

    let opt = {}
    if (token) {
      opt = {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
      }
    }

    this.socket = io(`${process.env.NEXT_PUBLIC_API_END_POINT}/`, opt)
    this.socket.connect()

    // Listen for the "new-video" event
    this.socket.on('receive-new-video', (message: string) => {
      try {
        const data = JSON.parse(message)
        const user = localStorageService.getUser()
        if (data.createdBy?.email !== user) {
          store.dispatch(addNotifyToList({ duration: 5000, type: 'success', title: `${data.createdBy?.email} just shared the video`, message: `${data.title}` }))
        }
      } catch (err) {
        console.log(err)
      }
    })
  }

  public getSocket(): Socket | null {
    return this.socket
  }
}

export default SocketClient
