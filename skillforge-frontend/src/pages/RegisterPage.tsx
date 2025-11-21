import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import type { UserRole } from '../types'

const schema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

const RegisterPage = () => {
  const { register: signup } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'STUDENT',
    },
  })

  const onSubmit = async (values: FormValues) => {
    const { confirmPassword, ...payload } = values
    await signup(payload as { name: string; email: string; password: string; role: UserRole })
    navigate('/login')
  }

  return (
    <div className="max-w-5xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold text-brand-600 uppercase">Create workspace</p>
        <h2 className="text-4xl font-bold text-slate-900">Join SkillForge</h2>
        <ul className="space-y-2 text-slate-600 text-sm">
          <li>• JWT-protected single-session auth</li>
          <li>• Cloudinary-backed video management</li>
          <li>• Role-native dashboards</li>
          <li>• MongoDB persistence already wired in the backend</li>
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-8 space-y-5">
        <div>
          <label className="text-sm font-medium text-slate-600">Full name</label>
          <input
            {...register('name')}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Aanya Verma"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="you@domain.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              {...register('password')}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Confirm password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Role</label>
          <select
            {...register('role')}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 bg-white"
          >
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full brand-gradient text-white font-semibold py-2 rounded-lg disabled:opacity-70"
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
        <p className="text-sm text-center text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-brand-600 font-semibold">
            Sign in instead
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage

