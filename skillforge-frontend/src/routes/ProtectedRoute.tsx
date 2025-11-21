import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from '../components/common/LoadingScreen'
import type { UserRole } from '../types'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: UserRole[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <LoadingScreen message="Validating session..." />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute

