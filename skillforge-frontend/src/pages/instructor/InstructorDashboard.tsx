import { useQuery } from '@tanstack/react-query'
import { getInstructorCourses } from '../../api/instructor'
import LoadingScreen from '../../components/common/LoadingScreen'
import StatCard from '../../components/common/StatCard'
import CourseCard from '../../components/common/CourseCard'
import { useAuth } from '../../contexts/AuthContext'

const InstructorDashboard = () => {
  const { user } = useAuth()
  const { data: courses, isLoading } = useQuery({
    queryKey: ['instructor-courses'],
    queryFn: getInstructorCourses,
  })

  if (isLoading || !courses) {
    return <LoadingScreen message="Fetching courses..." />
  }

  const published = courses.filter((course) => course.status === 'published').length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Instructor HQ</h1>
        <p className="text-slate-600">Design, upload, and launch curriculum effortlessly.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Total courses" value={courses.length} />
        <StatCard label="Published" value={published} />
        <StatCard label="Cloud videos" value={courses.reduce((sum, c) => sum + (c.videoCount ?? 0), 0)} />
      </div>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Your catalog</h2>
        {courses.length ? (
          <div className="grid md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-6">
            <p className="text-sm text-slate-500">
              No courses yet. Use the curriculum builder to spin up your first program, {user?.name}.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default InstructorDashboard

