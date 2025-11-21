import apiClient from './http'

export const getAdminSnapshot = async (): Promise<string> => {
  const { data } = await apiClient.get<string>('/api/user/admin')
  return data
}

export const getInstructorSnapshot = async (): Promise<string> => {
  const { data } = await apiClient.get<string>('/api/user/instructor')
  return data
}

export const getStudentSnapshot = async (): Promise<string> => {
  const { data } = await apiClient.get<string>('/api/user/student')
  return data
}

