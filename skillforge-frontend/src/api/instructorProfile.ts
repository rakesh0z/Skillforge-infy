import apiClient from './http'
import type { InstructorProfile } from '../types'

export const getInstructorProfile = async (email: string): Promise<InstructorProfile> => {
  const { data } = await apiClient.get<InstructorProfile>(`/api/instructor/profile/${email}`)
  return data
}

export const saveInstructorProfile = async (profile: InstructorProfile) => {
  const { data } = await apiClient.post<InstructorProfile>('/api/instructor/profile/save', profile)
  return data
}

export const uploadInstructorProfileImage = async (email: string, file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await apiClient.post<string>(`/api/instructor/profile/upload-image`, formData, {
    params: { email },
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
