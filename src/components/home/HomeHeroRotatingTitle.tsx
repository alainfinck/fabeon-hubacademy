import { useEffect, useState } from 'react'
import { WordRotate } from '../ui/word-rotate'

const ROTATING_WORDS = [
  "l'impression",
  'la fabrication',
  'la découpe Zünd',
  'la calibration couleur',
  'le prototypage',
  'la signalétique',
  'l\'utlisation des RIPs',
] as const

const WORD_GRADIENTS = [
  'text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-600 dark:from-brand-400 dark:to-cyan-300',
  'text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-orange-500 dark:from-accent-400 dark:to-orange-300',
  'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300',
  'text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-300',
  'text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500 dark:from-brand-400 dark:to-indigo-300',
  'text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-300',
  'text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-accent-500 dark:from-amber-400 dark:to-accent-300',
] as const

export function HomeHeroRotatingTitle() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-heading leading-tight">
      <span className="block">Maîtrisez l&apos;art de</span>
      {reducedMotion ? (
        <span className={WORD_GRADIENTS[0]}>{ROTATING_WORDS[0]}</span>
      ) : (
        <WordRotate
          words={[...ROTATING_WORDS]}
          wordClassNames={[...WORD_GRADIENTS]}
          duration={3200}
        />
      )}
    </h1>
  )
}
