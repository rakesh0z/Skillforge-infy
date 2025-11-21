import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import type { Location } from 'history'
import { useAuth } from '../contexts/AuthContext'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormValues = z.infer<typeof schema>

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: FormValues) => {
    const profile = await login(values.email, values.password)
    const target = (location.state as { from?: Location })?.from?.pathname
    navigate(target ?? `/${profile.role.toLowerCase()}/dashboard`, { replace: true })
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-brand-600 uppercase">Welcome back</p>
        <h2 className="text-4xl font-bold text-slate-900">Sign in to SkillForge</h2>
        <p className="text-slate-600">
          Continue where you left off, manage your teaching workflows, or orchestrate the platform
          like an admin.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
            placeholder="you@domain.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Password</label>
          <input
            type="password"
            {...register('password')}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full brand-gradient text-white font-semibold py-2 rounded-lg disabled:opacity-70"
        >
          {isSubmitting ? 'Checking credentials...' : 'Log in'}
        </button>
        <p className="text-sm text-center text-slate-500">
          Need an account?{' '}
          <Link to="/register" className="text-brand-600 font-semibold">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage

