import { getDb } from './db.js'
import { exchangePostSeeds } from '../src/data/exchangeHubSeeds.js'

export function seedExchangeHub() {
  const db = getDb()
  const exists = db.prepare('SELECT id FROM exchange_posts LIMIT 1').get()
  if (exists) return

  const insert = db.prepare(
    `INSERT INTO exchange_posts (topic, title, body, author_name, author_role, reply_count)
     VALUES (?, ?, ?, ?, ?, ?)`
  )

  for (const post of exchangePostSeeds) {
    insert.run(
      post.topic,
      post.title,
      post.body,
      post.authorName,
      post.authorRole,
      post.replyCount
    )
  }
}
