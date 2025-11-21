import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PublicLayout = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-200 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-slate-900">
            SkillForge
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-slate-600">
            <NavLink to="/#curriculum">Curriculum Builder</NavLink>
            <NavLink to="/#instructors">Instructors</NavLink>
            <NavLink to="/#pricing">Pricing</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to={`/${user.role.toLowerCase()}/dashboard`}
                className="text-sm font-semibold text-brand-600"
              >
                Go to portal
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm text-slate-600 font-medium">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-white px-4 py-2 rounded-full brand-gradient"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-slate-500 flex justify-between">
          <p>© {new Date().getFullYear()} SkillForge. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout

