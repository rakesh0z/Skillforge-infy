import { Navigate, Route, Routes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import StudentLayout from '../layouts/StudentLayout'
import InstructorLayout from '../layouts/InstructorLayout'
import AdminLayout from '../layouts/AdminLayout'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import StudentDashboard from '../pages/student/StudentDashboard'
import BrowseCatalog from '../pages/student/BrowseCatalog'
import MyCourses from '../pages/student/MyCourses'
import CourseDetail from '../pages/student/CourseDetail'
import CoursePlayer from '../pages/student/CoursePlayer'
import InstructorDashboard from '../pages/instructor/InstructorDashboard'
import ProfilePage from '../pages/ProfilePage'
import CurriculumBuilder from '../pages/instructor/CurriculumBuilder'
import VideoUploads from '../pages/instructor/VideoUploads'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminUsers from '../pages/admin/AdminUsers'
import AdminCourses from '../pages/admin/AdminCourses'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route index element={<LandingPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>

    <Route
      path="student"
      element={
        <ProtectedRoute allowedRoles={['STUDENT']}>
          <StudentLayout />
        </ProtectedRoute>
      }
    >
      <Route path="profile" element={<ProfilePage />} />
      <Route path="dashboard" element={<StudentDashboard />} />
      <Route path="courses" element={<BrowseCatalog />} />
      <Route path="my-courses" element={<MyCourses />} />
      <Route path="courses/:courseId" element={<CourseDetail />} />
      <Route path="courses/:courseId/watch" element={<CoursePlayer />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Route>

    <Route
      path="instructor"
      element={
        <ProtectedRoute allowedRoles={['INSTRUCTOR']}>
          <InstructorLayout />
        </ProtectedRoute>
      }
    >
      <Route path="profile" element={<ProfilePage />} />
      <Route path="dashboard" element={<InstructorDashboard />} />
      <Route path="curriculum" element={<CurriculumBuilder />} />
      <Route path="videos" element={<VideoUploads />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Route>

    <Route
      path="admin"
      element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="courses" element={<AdminCourses />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default AppRoutes

