import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { addSection, createCourse, deleteSection, getInstructorCourses, uploadCourseThumbnail } from '../../api/instructor'
import LoadingScreen from '../../components/common/LoadingScreen'
import { useAuth } from '../../contexts/AuthContext'

interface CourseFormValues {
  title: string
  description: string
  category: string
  level: string
}

const CurriculumBuilder = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [selectedCourseId, setSelectedCourseId] = useState<string>()
  const [newSection, setNewSection] = useState('')

  const { register, handleSubmit, reset } = useForm<CourseFormValues>({
    defaultValues: {
      title: '',
      description: '',
      category: 'Technology',
      level: 'Beginner',
    },
  })

  const { data: courses, isLoading } = useQuery({
    queryKey: ['instructor-courses'],
    queryFn: getInstructorCourses,
  })

  useEffect(() => {
    if (!selectedCourseId && courses?.length) {
      setSelectedCourseId(courses[0].id)
    }
  }, [courses, selectedCourseId])

  const selectedCourse = useMemo(
    () => courses?.find((course) => course.id === selectedCourseId),
    [courses, selectedCourseId]
  )

  const createCourseMutation = useMutation({
    mutationFn: (values: CourseFormValues) =>
      createCourse({
        ...values,
        instructorEmail: user?.email,
        instructorName: user?.name,
        language: 'English',
        status: 'draft',
      }),
    onSuccess: (created) => {
      toast.success('Course created')
      reset()
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
      setSelectedCourseId(created.id)
    },
    onError: () => toast.error('Unable to create course'),
  })

  const addSectionMutation = useMutation({
    mutationFn: () => addSection(selectedCourseId ?? '', newSection),
    onSuccess: () => {
      toast.success('Section added')
      setNewSection('')
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
    },
    onError: () => toast.error('Unable to add section'),
  })

  const deleteSectionMutation = useMutation({
    mutationFn: (sectionId: string) => deleteSection(selectedCourseId ?? '', sectionId),
    onSuccess: () => {
      toast.success('Section removed')
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
    },
  })

  // Thumbnail upload
  const [thumbFile, setThumbFile] = useState<File | null>(null)
  const uploadThumbMutation = useMutation({
    mutationFn: () => uploadCourseThumbnail(selectedCourseId ?? '', thumbFile as File),
    onSuccess: () => {
      toast.success('Course thumbnail uploaded')
      setThumbFile(null)
      queryClient.invalidateQueries({ queryKey: ['instructor-courses'] })
    },
    onError: () => toast.error('Unable to upload thumbnail'),
  })

  if (isLoading) {
    return <LoadingScreen message="Loading courses..." />
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Create a course</h2>
        <form
          className="space-y-4"
          onSubmit={handleSubmit((values) => createCourseMutation.mutate(values))}
        >
          <div>
            <label className="text-sm font-medium text-slate-600">Title</label>
            <input
              {...register('title', { required: true })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Description</label>
            <textarea
              {...register('description', { required: true })}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-600">Category</label>
              <input
                {...register('category')}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-600">Level</label>
              <select
                {...register('level')}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={createCourseMutation.isPending}
            className="w-full brand-gradient text-white font-semibold py-2 rounded-lg disabled:opacity-70"
          >
            {createCourseMutation.isPending ? 'Creating...' : 'Save draft'}
          </button>
        </form>
      </div>
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Curriculum</h2>
          <select
            value={selectedCourseId}
            onChange={(event) => setSelectedCourseId(event.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm"
          >
            {courses?.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        {selectedCourse ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-600">Course thumbnail</label>
              <div className="flex gap-2 items-center mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)}
                  className="rounded-lg border border-slate-200 px-3 py-2 bg-white"
                />
                <button
                  type="button"
                  disabled={!thumbFile || !selectedCourseId || uploadThumbMutation.isPending}
                  onClick={() => uploadThumbMutation.mutate()}
                  className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold disabled:opacity-70"
                >
                  {uploadThumbMutation.isPending ? 'Uploading...' : 'Upload thumbnail'}
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                value={newSection}
                onChange={(event) => setNewSection(event.target.value)}
                placeholder="Section title"
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2"
              />
              <button
                type="button"
                disabled={!newSection || !selectedCourseId}
                onClick={() => addSectionMutation.mutate()}
                className="px-4 py-2 rounded-lg bg-brand-500 text-white text-sm font-semibold disabled:opacity-70"
              >
                Add
              </button>
            </div>
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
              {selectedCourse.sections?.map((section) => (
                <div
                  key={section.id}
                  className="border border-slate-200 rounded-lg p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{section.title}</p>
                    <p className="text-xs text-slate-500">
                      {section.lectures?.length ?? 0} lectures linked
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteSectionMutation.mutate(section.id)}
                    className="text-xs text-red-500"
                  >
                    Delete
                  </button>
                </div>
              )) ?? <p className="text-sm text-slate-500">No sections yet.</p>}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500">Select or create a course to manage curriculum.</p>
        )}
      </div>
    </div>
  )
}

export default CurriculumBuilder

