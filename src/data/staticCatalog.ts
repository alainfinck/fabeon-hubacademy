import { categories } from './categories'
import { courses } from './courses'
import { workshops } from './workshops'
import { events } from './events'

/** Catalogue embarqué — secours si l'API Vercel (/tmp SQLite) ne répond pas ou renvoie vide. */
export const staticCategories = categories
export const staticCourses = courses
export const staticWorkshops = workshops
export const staticEvents = events
