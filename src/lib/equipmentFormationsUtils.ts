import type { Course, Workshop } from '../types'
import type { EquipmentFormationLinks } from '../data/equipmentFormations'

export function resolveFormations(
  links: EquipmentFormationLinks,
  courses: Course[],
  workshops: Workshop[]
): { courses: Course[]; workshops: Workshop[] } {
  const courseSet = new Set(links.courseSlugs)
  const workshopSet = new Set(links.workshopSlugs)
  return {
    courses: courses.filter((c) => courseSet.has(c.slug)),
    workshops: workshops.filter((w) => workshopSet.has(w.slug)),
  }
}
