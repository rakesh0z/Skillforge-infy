import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export interface DashboardNavItem {
  label: string
  path: string
}

interface DashboardLayoutProps {
  title: string
  subtitle: string
  navItems: DashboardNavItem[]
}

const DashboardLayout = ({ title, subtitle, navItems }: DashboardLayoutProps) => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase text-slate-500">Workspace</p>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="mt-auto text-sm text-slate-500 hover:text-slate-900 text-left"
        >
          Sign out
        </button>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Signed in as</p>
            <p className="text-sm font-semibold text-slate-900">
              {user?.name} · {user?.role}
            </p>
          </div>
        </header>
        <main className="flex-1 p-8 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout

