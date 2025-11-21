import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getInstructorCourses, uploadVideo } from '../../api/instructor'
import LoadingScreen from '../../components/common/LoadingScreen'
import { useAuth } from '../../contexts/AuthContext'

const VideoUploads = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const { data: courses, isLoading } = useQuery({
    queryKey: ['instructor-courses'],
    queryFn: getInstructorCourses,
  })
  const [selectedCourseId, setSelectedCourseId] = useState<string>()
  const [selectedSectionTitle, setSelectedSectionTitle] = useState<string>()
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (!selectedCourseId && courses?.length) {
      setSelectedCourseId(courses[0].id)
    }
  }, [courses, selectedCourseId])

  const selectedCourse = useMemo(
    () => courses?.find((course) => course.id === selectedCourseId),
    [courses, selectedCourseId]
  )

  useEffect(() => {
    if (selectedCourse && !selectedSectionTitle) {
      setSelectedSectionTitle(selectedCourse.sections?.[0]?.title)
    }
  }, [selectedCourse, selectedSectionTitle])

  const uploadMutation = useMutation({
    mutationFn: () =>
      uploadVideo({
        courseId: selectedCourseId ?? '',
        sectionTitle: selectedSectionTitle,
        file: file as File,
        title,
        uploadedBy: user?.email ?? '',
      }),
    onSuccess: () => {
      toast.success('Video sent to Cloudinary & curriculum updated')
      setFile(null)
      setTitle('')
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
    },
    onError: (error: any) =>
      toast.error(error?.response?.data?.error ?? 'Upload failed. Check Cloudinary creds.'),
  })

  const submitDisabled = !file || !title || uploadMutation.isPending

  if (isLoading || !courses?.length) {
    return <LoadingScreen message="Fetching courses..." />
  }

  return (
    <div className="glass-panel p-6 space-y-5">
      <h2 className="text-xl font-semibold text-slate-900">Upload lecture</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Course</label>
          <select
            value={selectedCourseId}
            onChange={(event) => {
              setSelectedCourseId(event.target.value)
              setSelectedSectionTitle(undefined)
            }}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Section</label>
          <select
            value={selectedSectionTitle}
            onChange={(event) => setSelectedSectionTitle(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            {selectedCourse?.sections?.map((section) => (
              <option key={section.id} value={section.title}>
                {section.title}
              </option>
            )) ?? <option>No sections yet</option>}
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-600">Video title</label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Introduction"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Video file</label>
          <input
            type="file"
            accept="video/*"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 bg-white"
          />
          <p className="text-xs text-slate-500 mt-1">Max 500MB, streamed via Cloudinary.</p>
        </div>
      </div>
      <button
        type="button"
        disabled={submitDisabled}
        onClick={() => uploadMutation.mutate()}
        className="w-full brand-gradient text-white font-semibold py-2 rounded-lg disabled:opacity-70"
      >
        {uploadMutation.isPending ? 'Uploading...' : 'Upload & attach'}
      </button>
    </div>
  )
}

export default VideoUploads

