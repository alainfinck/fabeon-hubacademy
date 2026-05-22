export function PageLoader({ label = 'Chargement…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
      <p className="text-muted text-sm">{label}</p>
    </div>
  )
}

export function PageError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="text-center py-24 px-4">
      <p className="text-red-500 dark:text-red-400 mb-4">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-4 py-2 rounded-lg bg-brand-600 text-white text-sm font-medium"
        >
          Réessayer
        </button>
      )}
    </div>
  )
}
