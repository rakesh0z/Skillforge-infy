interface LoadingScreenProps {
  message?: string
}

const LoadingScreen = ({ message = 'Loading...' }: LoadingScreenProps) => (
  <div className="min-h-[300px] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3 text-slate-600">
      <div className="h-12 w-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  </div>
)

export default LoadingScreen

