import apiClient from './http'
import type { UserProfile } from '../types'

interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
  role: string
}

export interface LoginResponse {
  token: string
  role: UserProfile['role']
  name: string
  email: string
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await apiClient.post<LoginResponse>('/api/auth/login', payload)
  return data
}

export const register = async (payload: RegisterPayload) => {
  const { data } = await apiClient.post('/api/auth/register', payload)
  return data
}

export const fetchProfile = async (): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile>('/api/user/profile')
  return data
}

