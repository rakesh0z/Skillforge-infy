import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from '../components/common/LoadingScreen'
import { getInstructorProfile, saveInstructorProfile, uploadInstructorProfileImage } from '../api/instructorProfile'

const ProfilePage = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState<any>({})

  const { data: instructorProfile, isLoading } = useQuery({
    queryKey: ['instructor-profile', user?.email],
    queryFn: () => getInstructorProfile(user?.email ?? ''),
    enabled: user?.role === 'INSTRUCTOR' && !!user?.email,
  })

  useEffect(() => {
    if (user) {
      setLocal({ name: user.name, email: user.email })
    }
    if (instructorProfile) setLocal(instructorProfile)
  }, [user, instructorProfile])

  const saveMutation = useMutation({
    mutationFn: (payload: any) => saveInstructorProfile(payload),
    onSuccess: (data) => {
      toast.success('Profile saved')
      queryClient.invalidateQueries({ queryKey: ['instructor-profile', user?.email] })
      setEditing(false)
    },
    onError: () => toast.error('Unable to save profile'),
  })

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadInstructorProfileImage(user?.email ?? '', file),
    onSuccess: (url) => {
      toast.success('Profile image uploaded')
      setLocal((s: any) => ({ ...s, profileImageUrl: url }))
      queryClient.invalidateQueries({ queryKey: ['instructor-profile', user?.email] })
    },
    onError: () => toast.error('Unable to upload image'),
  })

  if (isLoading) return <LoadingScreen message="Loading profile..." />

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={local?.profileImageUrl ?? local?.profileImage ?? '/vite.svg'}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="text-sm text-slate-500">Signed in as</p>
          <p className="text-lg font-semibold">{local?.name}</p>
          <p className="text-xs text-slate-500">{local?.email}</p>
        </div>
      </div>

      {user?.role === 'INSTRUCTOR' ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Bio</label>
            <textarea
              value={local?.bio ?? ''}
              onChange={(e) => setLocal((s: any) => ({ ...s, bio: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-600">LinkedIn</label>
              <input
                value={local?.linkedin ?? ''}
                onChange={(e) => setLocal((s: any) => ({ ...s, linkedin: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">GitHub</label>
              <input
                value={local?.github ?? ''}
                onChange={(e) => setLocal((s: any) => ({ ...s, github: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600">Profile image</label>
            <div className="flex gap-2 items-center mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) uploadMutation.mutate(f)
                }}
                className="rounded-lg border border-slate-200 px-3 py-2 bg-white"
              />
              <p className="text-xs text-slate-500">Upload a square image for best results</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => saveMutation.mutate(local)}
              className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold disabled:opacity-70"
            >
              {saveMutation.isPending ? 'Saving...' : 'Save profile'}
            </button>
            <button
              onClick={() => {
                setLocal(instructorProfile ?? { name: user?.name, email: user?.email })
                setEditing(false)
              }}
              className="px-4 py-2 rounded-lg border text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-slate-500">Member since: —</p>
          <p className="text-sm text-slate-500">No editable student profile available yet.</p>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
