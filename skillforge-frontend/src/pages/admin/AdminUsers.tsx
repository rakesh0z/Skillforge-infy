import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { browseCourses } from '../../api/student'
import LoadingScreen from '../../components/common/LoadingScreen'

const AdminUsers = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: browseCourses,
  })

  const instructorStats = useMemo(() => {
    const counts = new Map<string, number>()
    courses?.forEach((course) => {
      if (course.instructorName) {
        counts.set(course.instructorName, (counts.get(course.instructorName) ?? 0) + 1)
      }
    })
    return Array.from(counts.entries()).map(([name, total]) => ({ name, total }))
  }, [courses])

  if (isLoading || !courses) {
    return <LoadingScreen message="Aggregating instructors..." />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">People overview</h1>
        <p className="text-slate-600">
          Instructors and students share the same Spring Security realm. Admin APIs can expand from
          here.
        </p>
      </div>
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Instructor footprint</h2>
        <div className="space-y-2">
          {instructorStats.length ? (
            instructorStats.map((stat) => (
              <div
                key={stat.name}
                className="flex items-center justify-between border border-slate-200 rounded-lg px-4 py-2 text-sm"
              >
                <span className="font-semibold text-slate-800">{stat.name}</span>
                <span className="text-slate-500">{stat.total} courses</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No instructors yet.</p>
          )}
        </div>
      </div>
      <div className="glass-panel p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">Roadmap</h2>
        <ul className="list-disc text-sm text-slate-600 pl-5 space-y-1">
          <li>Wire dedicated `/api/admin/users` endpoint to list all registered users</li>
          <li>Attach moderation actions (ban/reset password) via JWT-protected routes</li>
          <li>Plug analytics (active sessions, Cloudinary bandwidth) for compliance</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminUsers

