import { useQuery } from '@tanstack/react-query'
import { browseCourses } from '../../api/student'
import { getAdminSnapshot } from '../../api/admin'
import LoadingScreen from '../../components/common/LoadingScreen'
import StatCard from '../../components/common/StatCard'

const AdminDashboard = () => {
  const { data: snapshot } = useQuery({
    queryKey: ['admin-snapshot'],
    queryFn: getAdminSnapshot,
  })

  const { data: courses, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: browseCourses,
  })

  if (isLoading || !courses) {
    return <LoadingScreen message="Loading platform metrics..." />
  }

  const totalVideos = courses.reduce((sum, course) => sum + (course.videoCount ?? 0), 0)

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs uppercase text-slate-500">{snapshot}</p>
        <h1 className="text-3xl font-bold text-slate-900">SkillForge Control Center</h1>
        <p className="text-slate-600">Monitor catalog health, role-based activity, and storage.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Live courses" value={courses.length} />
        <StatCard label="Video assets" value={totalVideos} helper="Pulled from MongoDB counts" />
        <StatCard label="Storage provider" value="Cloudinary" helper="Streaming-ready" />
      </div>
      <div className="glass-panel p-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Catalog overview</h2>
        <div className="space-y-3 max-h-[420px] overflow-y-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-slate-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3"
            >
              <div>
                <p className="font-semibold text-slate-900">{course.title}</p>
                <p className="text-xs text-slate-500">{course.instructorName}</p>
              </div>
              <div className="text-xs text-slate-500">
                {course.videoCount ?? 0} videos · {course.studentsCount ?? 0} learners
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

