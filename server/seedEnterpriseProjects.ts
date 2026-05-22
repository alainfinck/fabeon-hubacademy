import { getDb } from './db.js'
import { enterpriseProjectExamples } from '../src/data/enterpriseProjectExamples.js'

export function seedEnterpriseProjects() {
  const db = getDb()
  const exists = db.prepare('SELECT id FROM enterprise_projects WHERE company = ? LIMIT 1')

  const insert = db.prepare(`
    INSERT INTO enterprise_projects
      (company, contact_name, email, phone, project_type, description, deadline, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  let added = 0
  const tx = db.transaction(() => {
    for (const ex of enterpriseProjectExamples) {
      if (exists.get(ex.company)) continue
      insert.run(
        ex.company,
        ex.contactName,
        ex.email,
        ex.phone,
        ex.projectType,
        ex.description,
        ex.deadline,
        ex.status
      )
      added++
    }
  })
  tx()
  return added > 0
}
