import type { Course } from '../../types'
import clsx from 'clsx'

interface CourseCardProps {
  course: Course
  actionLabel?: string
  onAction?: (courseId: string) => void
  highlight?: boolean
}

const CourseCard = ({ course, actionLabel, onAction, highlight }: CourseCardProps) => (
  <div
    className={clsx(
      'glass-panel p-5 flex flex-col gap-3 border',
      highlight ? 'border-brand-200' : 'border-transparent'
    )}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
      <span className="text-xs font-semibold text-brand-600 uppercase">
        {course.level ?? 'All levels'}
      </span>
    </div>
    <p className="text-sm text-slate-600 line-clamp-2">
      {course.description || 'No description yet.'}
    </p>
    <div className="flex items-center justify-between text-sm text-slate-500">
      <span>{course.instructorName}</span>
      <span>{course.language}</span>
    </div>
    {actionLabel && (
      <button
        type="button"
        onClick={() => onAction?.(course.id)}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded-lg transition"
      >
        {actionLabel}
      </button>
    )}
  </div>
)

export default CourseCard

