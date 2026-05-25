import { SMART_FACTORY } from './smartFactory'

/** Vignettes thématiques du hero accueil — photos du parc SmartFactory. */
export const homeHeroThemeImages: Record<string, string> = {
  calibration: '/smartfactory/galerie-atelier-3.jpg',
  impression: '/smartfactory/machine-grand-format.jpg',
  decoupe: '/smartfactory/machine-techno.png',
  logiciels: '/smartfactory/galerie-coworking.png',
  ateliers: '/smartfactory/galerie-atelier-1.jpg',
  communication: '/smartfactory/galerie-bienvenue.jpg',
  ia: '/smartfactory/machine-bambu-lab.jpg',
}

export function getHomeHeroThemeImage(categoryId: string): string {
  return homeHeroThemeImages[categoryId] ?? SMART_FACTORY.heroImage
}
