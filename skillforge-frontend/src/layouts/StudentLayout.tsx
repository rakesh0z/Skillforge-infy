import DashboardLayout from './DashboardLayout'

const StudentLayout = () => (
  <DashboardLayout
    title="Student"
    subtitle="Learning workspace"
    navItems={[
      { label: 'Dashboard', path: '/student/dashboard' },
      { label: 'Browse Catalog', path: '/student/courses' },
      { label: 'My Learning', path: '/student/my-courses' },
    ]}
  />
)

export default StudentLayout

