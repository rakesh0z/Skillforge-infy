import { useQuery } from '@tanstack/react-query'
import { browseCourses } from '../../api/student'
import LoadingScreen from '../../components/common/LoadingScreen'

const AdminCourses = () => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: browseCourses,
  })

  if (isLoading || !courses) {
    return <LoadingScreen message="Inspecting catalog..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Course registry</h1>
          <p className="text-slate-600">Fetched straight from MongoDB via student catalog API.</p>
        </div>
      </div>
      <div className="overflow-x-auto glass-panel">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead>
            <tr className="text-xs uppercase text-slate-500 border-b border-slate-200">
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Instructor</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Sections</th>
              <th className="px-4 py-2">Videos</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-slate-100">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-900">{course.title}</p>
                  <p className="text-xs text-slate-500">{course.category}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{course.instructorName}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {course.status}
                  </span>
                </td>
                <td className="px-4 py-3">{course.sections?.length ?? 0}</td>
                <td className="px-4 py-3">{course.videoCount ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminCourses

