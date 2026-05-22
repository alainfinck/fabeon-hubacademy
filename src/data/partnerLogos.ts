/** Logos présents dans public/logos/ */
export interface PartnerLogoFile {
  id: string
  name: string
  src: string
}

export const partnerLogoFiles: PartnerLogoFile[] = [
  { id: 'zund', name: 'Zünd', src: '/logos/4041-Zund%20Logo.svg' },
  { id: 'caldera', name: 'Caldera', src: '/logos/caldera.png' },
  { id: 'epson', name: 'Epson', src: '/logos/epson.png' },
  { id: 'mimaki', name: 'Mimaki', src: '/logos/mimaki.png' },
  {
    id: 'roland',
    name: 'Roland DG',
    src: '/logos/kisspng-roland-dg-roland-corporation-printing-roland-tr-80-5b342b65779160.7596037915301456374898.jpg.webp',
  },
  { id: 'massivit', name: 'Massivit', src: '/logos/massivit.png' },
]
