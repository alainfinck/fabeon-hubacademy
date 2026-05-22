import { getDb } from './db.js'
import { categories } from '../src/data/categories.js'
import { courses } from '../src/data/courses.js'
import { workshops } from '../src/data/workshops.js'

export function seedDatabase() {
  const db = getDb()
  const count = db.prepare('SELECT COUNT(*) as n FROM categories').get() as { n: number }
  if (count.n > 0) return false

  const insertCategory = db.prepare(`
    INSERT INTO categories (id, label, description, icon, color)
    VALUES (@id, @label, @description, @icon, @color)
  `)

  const insertCourse = db.prepare(`
    INSERT INTO courses (
      id, slug, title, subtitle, description, category, level, format,
      duration, lessons_count, instructor, instructor_role, tags, featured,
      equipment, software, objectives, prerequisites, image_gradient, sort_order
    ) VALUES (
      @id, @slug, @title, @subtitle, @description, @category, @level, @format,
      @duration, @lessons_count, @instructor, @instructor_role, @tags, @featured,
      @equipment, @software, @objectives, @prerequisites, @image_gradient, @sort_order
    )
  `)

  const insertModule = db.prepare(`
    INSERT INTO modules (id, course_id, title, sort_order)
    VALUES (@id, @course_id, @title, @sort_order)
  `)

  const insertLesson = db.prepare(`
    INSERT INTO lessons (
      id, course_id, module_id, title, duration, type, description, content, video_url, sort_order
    ) VALUES (
      @id, @course_id, @module_id, @title, @duration, @type, @description, @content, @video_url, @sort_order
    )
  `)

  const insertWorkshop = db.prepare(`
    INSERT INTO workshops (
      id, slug, title, description, date, location, seats, seats_left,
      duration, equipment, level, price, image_gradient, sort_order
    ) VALUES (
      @id, @slug, @title, @description, @date, @location, @seats, @seats_left,
      @duration, @equipment, @level, @price, @image_gradient, @sort_order
    )
  `)

  const tx = db.transaction(() => {
    categories.forEach((c) => insertCategory.run(c))

    courses.forEach((course, ci) => {
      insertCourse.run({
        id: course.id,
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        category: course.category,
        level: course.level,
        format: course.format,
        duration: course.duration,
        lessons_count: course.lessonsCount,
        instructor: course.instructor,
        instructor_role: course.instructorRole,
        tags: JSON.stringify(course.tags),
        featured: course.featured ? 1 : 0,
        equipment: course.equipment ? JSON.stringify(course.equipment) : null,
        software: course.software ? JSON.stringify(course.software) : null,
        objectives: JSON.stringify(course.objectives),
        prerequisites: JSON.stringify(course.prerequisites),
        image_gradient: course.imageGradient,
        sort_order: ci,
      })

      course.modules.forEach((mod, mi) => {
        insertModule.run({
          id: mod.id,
          course_id: course.id,
          title: mod.title,
          sort_order: mi,
        })
        mod.lessons.forEach((lesson, li) => {
          insertLesson.run({
            id: lesson.id,
            course_id: course.id,
            module_id: mod.id,
            title: lesson.title,
            duration: lesson.duration,
            type: lesson.type,
            description: lesson.description,
            content: lesson.content ?? null,
            video_url: lesson.videoUrl ?? null,
            sort_order: li,
          })
        })
      })
    })

    workshops.forEach((w, i) => {
      insertWorkshop.run({
        id: w.id,
        slug: w.slug,
        title: w.title,
        description: w.description,
        date: w.date,
        location: w.location,
        seats: w.seats,
        seats_left: w.seatsLeft,
        duration: w.duration,
        equipment: JSON.stringify(w.equipment),
        level: w.level,
        price: w.price,
        image_gradient: w.imageGradient,
        sort_order: i,
      })
    })
  })

  tx()
  return true
}
