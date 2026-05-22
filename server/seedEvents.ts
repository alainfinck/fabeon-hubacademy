import { getDb } from './db.js'
import { events } from '../src/data/events.js'

export function seedEvents() {
  const db = getDb()
  const exists = db.prepare('SELECT id FROM events WHERE slug = ? LIMIT 1')

  const insert = db.prepare(`
    INSERT INTO events (
      id, slug, title, description, type, format, date, end_date, time_label,
      location, speakers, topics, seats, seats_left, price, free, featured, image_gradient, sort_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  let added = 0
  const tx = db.transaction(() => {
    events.forEach((e, i) => {
      if (exists.get(e.slug)) return
      insert.run(
        e.id,
        e.slug,
        e.title,
        e.description,
        e.type,
        e.format,
        e.date,
        e.endDate ?? null,
        e.time ?? null,
        e.location,
        JSON.stringify(e.speakers),
        JSON.stringify(e.topics),
        e.seats ?? null,
        e.seatsLeft ?? null,
        e.price,
        e.free ? 1 : 0,
        e.featured ? 1 : 0,
        e.imageGradient,
        i
      )
      added++
    })
  })
  tx()
  return added > 0
}
