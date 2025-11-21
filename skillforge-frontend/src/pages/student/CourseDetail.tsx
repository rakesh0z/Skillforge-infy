import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCourseById } from '../../api/student'
import LoadingScreen from '../../components/common/LoadingScreen'

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>()

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => getCourseById(courseId ?? ''),
    enabled: !!courseId,
  })

  if (isLoading || !course) {
    return <LoadingScreen message="Loading course..." />
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel p-8 space-y-2">
        <p className="text-sm text-slate-500 uppercase">Course</p>
        <h1 className="text-3xl font-bold text-slate-900">{course.title}</h1>
        <p className="text-slate-600">{course.description}</p>
        <div className="text-sm text-slate-500 flex flex-wrap gap-4">
          <span>Instructor: {course.instructorName}</span>
          <span>Language: {course.language}</span>
          <span>Level: {course.level}</span>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Curriculum</h2>
        {course.sections?.length ? (
          <div className="space-y-3">
            {course.sections.map((section) => (
              <div key={section.id} className="glass-panel p-5 space-y-2">
                <p className="font-semibold text-slate-900">{section.title}</p>
                <ul className="text-sm text-slate-600 space-y-1">
                  {section.lectures?.map((lecture) => (
                    <li key={lecture.id} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-brand-400" />
                      {lecture.title}
                    </li>
                  )) ?? <li className="text-xs text-slate-400">No lectures yet</li>}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-5 text-sm text-slate-500">No sections defined yet.</div>
        )}
      </div>
    </div>
  )
}

export default CourseDetail

