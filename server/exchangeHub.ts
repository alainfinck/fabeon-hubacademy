import type { CategoryId, ExchangePost } from '../src/types/index.js'

export interface ExchangePostRow {
  id: number
  topic: string
  title: string
  body: string
  author_name: string
  author_role: string | null
  reply_count: number
  created_at: string
}

export function mapExchangePost(row: ExchangePostRow): ExchangePost {
  return {
    id: row.id,
    topic: row.topic as CategoryId,
    title: row.title,
    body: row.body,
    authorName: row.author_name,
    authorRole: row.author_role,
    replyCount: row.reply_count,
    createdAt: row.created_at,
  }
}
