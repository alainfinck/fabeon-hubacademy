export interface Partner {
  id: string
  name: string
  /** Couleur principale de la marque */
  brandColor: string
  /** Fichier dans public/logos/ */
  logoSrc?: string
  /** Clé simple-icons (si disponible) */
  iconSlug?: 'epson' | 'hp' | 'fujifilm' | '3m'
}

export const partners: Partner[] = [
  { id: 'caldera', name: 'Caldera', brandColor: '#D92228', logoSrc: '/logos/caldera.png' },
  { id: 'zund', name: 'Zünd', brandColor: '#00843D', logoSrc: '/logos/4041-Zund%20Logo.svg' },
  { id: 'epson', name: 'Epson', brandColor: '#003399', logoSrc: '/logos/epson.png' },
  { id: 'mimaki', name: 'Mimaki', brandColor: '#E60012', logoSrc: '/logos/mimaki.png' },
  { id: 'hp', name: 'HP', brandColor: '#0096D6', iconSlug: 'hp' },
  { id: 'canon', name: 'Canon', brandColor: '#BC0024' },
  {
    id: 'roland',
    name: 'Roland DG',
    brandColor: '#E4002B',
    logoSrc:
      '/logos/kisspng-roland-dg-roland-corporation-printing-roland-tr-80-5b342b65779160.7596037915301456374898.jpg.webp',
  },
  { id: 'massivit', name: 'Massivit', brandColor: '#6B21A8', logoSrc: '/logos/massivit.png' },
  { id: 'efi', name: 'EFI', brandColor: '#00A651' },
  { id: 'onyx', name: 'Onyx', brandColor: '#1A1A1A' },
  { id: 'fujifilm', name: 'Fujifilm', brandColor: '#019347', iconSlug: 'fujifilm' },
  { id: 'ricoh', name: 'Ricoh', brandColor: '#CF142B' },
  { id: 'xerox', name: 'Xerox', brandColor: '#E4002B' },
  { id: '3m', name: '3M', brandColor: '#FF0000', iconSlug: '3m' },
  { id: 'avery', name: 'Avery Dennison', brandColor: '#E4002B' },
  { id: 'mutoh', name: 'Mutoh', brandColor: '#0054A4' },
]
