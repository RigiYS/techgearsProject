import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '@/config/api.config'

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
  withCredentials: false, // Token-based auth, no cookies needed
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    console.error('[Request Error]:', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('auth-storage')

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    if (status === 403) {
      console.error('[Forbidden]: You do not have permission to access this resource')
    }

    if (status && status >= 500) {
      console.error('[Server Error]: Please try again later')
    }

    if (error.code === 'ECONNABORTED') {
      console.error('[Timeout]: Request took too long')
    }

    if (!error.response) {
      console.error('[Network Error]: Unable to connect to server. Make sure backend is running.')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance

export type { AxiosError, AxiosResponse }
