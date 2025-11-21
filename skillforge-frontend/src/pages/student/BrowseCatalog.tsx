import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { browseCourses, enrollInCourse } from '../../api/student'
import CourseCard from '../../components/common/CourseCard'
import LoadingScreen from '../../components/common/LoadingScreen'
import { useAuth } from '../../contexts/AuthContext'

const BrowseCatalog = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: courses, isLoading } = useQuery({
    queryKey: ['catalog'],
    queryFn: browseCourses,
  })

  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => enrollInCourse(user?.email ?? '', courseId),
    onSuccess: () => {
      toast.success('Enrollment confirmed!')
      queryClient.invalidateQueries({ queryKey: ['my-courses'] })
    },
    onError: (error: any) => toast.error(error?.response?.data ?? 'Could not enroll'),
  })

  if (isLoading || !courses) {
    return <LoadingScreen message="Loading catalog..." />
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">Browse courses</h1>
        <p className="text-slate-600">All instructor content powered by the Spring Boot backend.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            actionLabel={
              enrollMutation.isPending && enrollMutation.variables === course.id
                ? 'Enrolling...'
                : 'Enroll'
            }
            onAction={(id) => enrollMutation.mutate(id)}
          />
        ))}
      </div>
    </div>
  )
}

export default BrowseCatalog

