import DashboardLayout from './DashboardLayout'

const AdminLayout = () => (
  <DashboardLayout
    title="Admin"
    subtitle="Platform control center"
    navItems={[
      { label: 'Overview', path: '/admin/dashboard' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Courses', path: '/admin/courses' },
    ]}
  />
)

export default AdminLayout

