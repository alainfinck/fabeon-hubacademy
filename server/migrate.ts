import { getDb } from './db.js'

const WORKSHOP_LOCATION = 'Fabeon HubAcademy — Illkirch-Graffenstaden'

/** Met à jour les lieux d'ateliers déjà en base (seed antérieur). */
export function migrateContactInfo() {
  const db = getDb()
  db.prepare(
    `UPDATE workshops
     SET location = ?
     WHERE location LIKE '%Lyon%' OR location LIKE '%Paris%' OR location LIKE '%Fabeon —%'`
  ).run(WORKSHOP_LOCATION)
}
