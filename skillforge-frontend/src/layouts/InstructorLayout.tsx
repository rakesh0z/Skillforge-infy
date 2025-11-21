import DashboardLayout from './DashboardLayout'

const InstructorLayout = () => (
  <DashboardLayout
    title="Instructor"
    subtitle="Course authoring"
    navItems={[
      { label: 'Dashboard', path: '/instructor/dashboard' },
      { label: 'Curriculum Builder', path: '/instructor/curriculum' },
      { label: 'Video Uploads', path: '/instructor/videos' },
    ]}
  />
)

export default InstructorLayout

