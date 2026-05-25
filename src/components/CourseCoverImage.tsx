import type { Course } from '../types'
import { coverFallbackSeed, getCourseCoverImage } from '../data/coverImages'
import { CardCoverImage } from './CardCoverImage'

interface Props {
  course: Pick<Course, 'id' | 'category' | 'title' | 'imageGradient' | 'imageUrl'>
  className?: string
  sizes?: string
}

export function CourseCoverImage({ course, className = 'h-36', sizes }: Props) {
  return (
    <CardCoverImage
      src={getCourseCoverImage(course)}
      imageGradient={course.imageGradient}
      alt={course.title}
      className={className}
      sizes={sizes}
      fallbackSeed={coverFallbackSeed(course.id)}
    />
  )
}
