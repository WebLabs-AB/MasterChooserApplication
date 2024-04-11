import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

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
  /*
  @ManyToOne(() => Education, (education) => education.courseConnection)
  @Field((type) => Education)
  @JoinColumn({ name: 'educationId' })
  education: Education;
  */
  /**
   * The course offered as part of the education program.
   * It establishes a many-to-one relationship with the Course entity.
   */
  /*
  @ManyToOne(() => Course, (course) => course.educationConnection)
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;
  */
}
