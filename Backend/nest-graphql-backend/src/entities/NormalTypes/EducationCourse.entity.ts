import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from './Course.entity';
import { Education } from './Education.entity';

/**
 * Represents an EducationCourse entity within the educational platform.
 * This entity establishes a many-to-many relationship between education programs and courses,
 * indicating which courses are offered as part of specific education programs.
 */
@Entity('EducationCourse')
@ObjectType()
export class EducationCourse extends BaseEntity {
  /**
   * The education program offering the course.
   * It establishes a many-to-one relationship with the Education entity.
   */
  @ManyToOne(() => Education, (education) => education.courseBelongsToEducation)
  @Field((type) => Education)
  @JoinColumn({ name: 'education_id' })
  education: Education;

  /**
   * The course offered as part of the education program.
   * It establishes a many-to-one relationship with the Course entity.
   */
  @ManyToOne(() => Course, (course) => course.courseBelongsToEducation)
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
