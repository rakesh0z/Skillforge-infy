import apiClient from './http'

export const updateUserProfile = async (payload: any) => {
  const { data } = await apiClient.post('/api/user/profile/update', payload)
  return data
}

export const uploadAvatar = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await apiClient.post('/api/user/profile/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
