import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMyCourses } from '../../api/student'
import { useAuth } from '../../contexts/AuthContext'
import LoadingScreen from '../../components/common/LoadingScreen'

const MyCourses = () => {
  const { user } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ['my-courses', user?.email],
    queryFn: () => getMyCourses(user?.email ?? ''),
    enabled: !!user?.email,
  })

  if (isLoading || !data) {
    return <LoadingScreen message="Fetching enrolled courses..." />
  }

  if (data.length === 0) {
    return (
      <div className="glass-panel p-8 text-center space-y-3">
        <p className="text-lg font-semibold text-slate-800">No enrollments yet</p>
        <p className="text-sm text-slate-500">
          Browse catalog to start learning. Progress tracking will update in real-time.
        </p>
        <Link
          to="/student/courses"
          className="inline-flex px-4 py-2 rounded-full brand-gradient text-white text-sm font-semibold"
        >
          Browse catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">My learning</h1>
      <div className="space-y-4">
        {data.map((enrollment) => (
          <div key={enrollment.id} className="glass-panel p-5 flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">{enrollment.courseTitle}</p>
                <p className="text-xs text-slate-500">{enrollment.instructorName}</p>
              </div>
              <Link
                to={`/student/courses/${enrollment.courseId}/watch`}
                className="text-sm font-semibold text-brand-600"
              >
                Resume →
              </Link>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-brand-500"
                style={{ width: `${enrollment.progress ?? 0}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">{Math.round(enrollment.progress ?? 0)}% complete</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyCourses

