import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueries } from '@tanstack/react-query'
import { getCourseById, getCourseVideos, updateProgress } from '../../api/student'
import LoadingScreen from '../../components/common/LoadingScreen'
import VideoPlayer from '../../components/common/VideoPlayer'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

const CoursePlayer = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { user } = useAuth()

  const [courseQuery, videoQuery] = useQueries({
    queries: [
      {
        queryKey: ['course', courseId],
        queryFn: () => getCourseById(courseId ?? ''),
        enabled: !!courseId,
      },
      {
        queryKey: ['videos', courseId],
        queryFn: () => getCourseVideos(courseId ?? ''),
        enabled: !!courseId,
      },
    ],
  })

  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const videos = videoQuery.data ?? []
  const currentVideo = useMemo(
    () => videos.find((video) => video.id === (activeVideo ?? videos[0]?.id)),
    [videos, activeVideo]
  )

  const progressMutation = useMutation({
    mutationFn: (progress: number) =>
      updateProgress(user?.email ?? '', courseId ?? '', progress),
    onSuccess: () => toast.success('Progress updated'),
    onError: () => toast.error('Unable to update progress'),
  })

  if (courseQuery.isLoading || videoQuery.isLoading || !courseQuery.data) {
    return <LoadingScreen message="Preparing player..." />
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel p-5">
        <p className="text-xs uppercase text-slate-500">Now learning</p>
        <h1 className="text-2xl font-semibold text-slate-900">{courseQuery.data.title}</h1>
      </div>

      {currentVideo ? (
        <VideoPlayer
          key={currentVideo.id}
          src={currentVideo.videoUrl}
          title={currentVideo.title}
          poster={currentVideo.thumbnail}
        />
      ) : (
        <div className="glass-panel p-10 text-center text-slate-500">
          No videos have been uploaded yet.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Lecture playlist</h2>
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-2">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideo(video.id)}
                className={`w-full text-left p-3 rounded-xl border ${
                  video.id === currentVideo?.id
                    ? 'border-brand-200 bg-brand-50'
                    : 'border-transparent bg-white'
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{video.title}</p>
                <p className="text-xs text-slate-500">{video.sectionTitle}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3 glass-panel p-5">
          <h3 className="text-lg font-semibold text-slate-900">Progress tracking</h3>
          <p className="text-sm text-slate-500">
            SkillForge stores granular percentage values in MongoDB enrollment documents.
          </p>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            onChange={(event) => progressMutation.mutate(Number(event.target.value))}
            className="w-full accent-brand-500"
          />
          <p className="text-xs text-slate-500">
            Drag slider to push completion percentage ({progressMutation.isPending ? 'Saving...' : 'Auto-saved'}).
          </p>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer

