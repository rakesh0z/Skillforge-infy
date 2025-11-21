interface StatCardProps {
  label: string
  value: string | number
  helper?: string
}

const StatCard = ({ label, value, helper }: StatCardProps) => (
  <div className="glass-panel p-5">
    <p className="text-sm uppercase tracking-wide text-slate-500">{label}</p>
    <p className="text-3xl font-semibold text-slate-900 mt-1">{value}</p>
    {helper && <p className="text-xs text-slate-500 mt-2">{helper}</p>}
  </div>
)

export default StatCard

