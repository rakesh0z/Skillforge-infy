import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

let authToken: string | null = null

export const setAuthToken = (token: string | null) => {
  authToken = token
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
})

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export default apiClient

