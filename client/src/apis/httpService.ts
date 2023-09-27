import LocalStorageService from '@/shared/utils/localStorage'
import store from '@/store'
import { addNotifyToList } from '@/store/notifySlice'
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

const localStorageService = new LocalStorageService()
class HttpService {
  private httpClient: AxiosInstance

  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_END_POINT,
    })

    // Request interceptor
    this.httpClient.interceptors.request.use(async (request) => {
      const token = localStorageService.getToken()
      if (token) {
        request.headers['Authorization'] = `Bearer ${token}`
      }
      return request
    })

    // Response interceptor
    this.httpClient.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        const axiosError: AxiosError = error
        const errorResponse = axiosError.response?.data
        this.handleServerError(errorResponse)
      }
    )
  }

  handleServerError(data: any) {
    switch (data.statusCode) {
      case 400:
        store.dispatch(addNotifyToList({ message: data.message }))
        break

      case 401:
      // Logout

      default:
        break
    }
  }

  async get<T>(url: string, config: any = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.get(url, config)
    return response.data
  }

  async post<T>(url: string, data: any = {}, config: any = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.post(url, data, config)
    return response.data
  }

  async put<T>(url: string, data: any = {}, config: any = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.put(url, data, config)
    return response.data
  }

  async patch<T>(url: string, data: any = {}, config: any = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.patch(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config: any = {}): Promise<T> {
    const response: AxiosResponse<T> = await this.httpClient.delete(url, config)
    return response.data
  }
}

export default HttpService
