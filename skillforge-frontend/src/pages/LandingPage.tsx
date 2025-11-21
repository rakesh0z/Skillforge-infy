import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Curriculum Builder',
    description: 'Design modular courses with drag-and-drop sections, lectures, and rich metadata.',
  },
  {
    title: 'Cloud-native video delivery',
    description: 'Upload once to Cloudinary and stream securely with adaptive playback.',
  },
  {
    title: 'Progress intelligence',
    description: 'Track completion, momentum, and cohort performance in real time.',
  },
]

const LandingPage = () => (
  <div className="relative overflow-hidden">
    <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <p className="text-sm font-semibold text-brand-600 uppercase">SkillForge</p>
        <h1 className="text-5xl font-bold text-slate-900 leading-tight">
          Build professional learning experiences with SkillForge — no platform middleman.
        </h1>
        <p className="text-lg text-slate-600">
          Ship multi-role academies with student, instructor, and admin workspaces powered by Spring
          Boot, MongoDB, Cloudinary, and JWT-secured single sessions.
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="px-6 py-3 rounded-full brand-gradient text-white font-semibold shadow-lg shadow-brand-500/30"
          >
            Launch your academy
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-semibold"
          >
            View dashboards
          </Link>
        </div>
      </div>
      <div className="glass-panel p-8 space-y-6">
        <p className="text-sm font-semibold text-slate-500 uppercase">Trusted capabilities</p>
        {features.map((feature) => (
          <div key={feature.title}>
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
)

export default LandingPage

