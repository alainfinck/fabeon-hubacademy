import type { EnterpriseProject, EnterpriseProjectDetail, EnterpriseProjectStatus } from '../src/types/index.js'

type ProjectRow = {
  id: number
  company: string
  contact_name: string
  email: string
  phone: string | null
  project_type: string
  description: string
  deadline: string | null
  status: string
  created_at: string
}

export function mapEnterpriseProject(row: ProjectRow): EnterpriseProject {
  return {
    id: row.id,
    company: row.company,
    projectType: row.project_type,
    description: row.description,
    deadline: row.deadline,
    status: row.status as EnterpriseProjectStatus,
    createdAt: row.created_at,
  }
}

export function mapEnterpriseProjectDetail(row: ProjectRow): EnterpriseProjectDetail {
  return {
    ...mapEnterpriseProject(row),
    contactName: row.contact_name,
  }
}
