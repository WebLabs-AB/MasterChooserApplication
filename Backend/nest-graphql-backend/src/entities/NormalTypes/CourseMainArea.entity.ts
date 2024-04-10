import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a CourseMainArea entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and main areas,
 * indicating which main areas are associated with specific courses.
 */
@Entity('CourseMainArea')
@ObjectType()
export class CourseMainArea extends BaseEntity {
  /**
   * The course associated with the main area.
   * It establishes a many-to-one relationship with the Course entity.
   */
  /*
  @ManyToOne(() => Course, (course) => course.mainAreaConnection)
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;
  */
  /**
   * The main area associated with the course.
   * It establishes a many-to-one relationship with the MainArea entity.
   */
  /*
  @ManyToOne(() => MainArea, (mainArea) => mainArea.courseConnection)
  @Field((type) => MainArea)
  @JoinColumn({ name: 'mainAreaName' })
  mainArea: MainArea;
  */
}
