import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface Props {
  className?: string
}

export function ThemeToggle({ className = '' }: Props) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg border border-theme bg-surface hover:bg-muted transition-colors ${className}`}
      aria-label={theme === 'dark' ? 'Activer le mode jour' : 'Activer le mode nuit'}
      title={theme === 'dark' ? 'Mode jour' : 'Mode nuit'}
    >
      <Sun
        className={`w-5 h-5 text-amber-500 transition-all duration-300 ${
          theme === 'dark' ? 'scale-0 rotate-90 opacity-0 absolute' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`w-5 h-5 text-brand-600 dark:text-brand-400 transition-all duration-300 ${
          theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0 absolute'
        }`}
      />
    </button>
  )
}
