import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Course } from './Course.entity';
import { MainArea } from './MainArea.entity';

/**
 * Represents a CourseMainArea entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and main areas,
 * indicating which main areas are associated with specific courses.
 */
@Entity('CourseMainArea')
@ObjectType()
export class CourseMainArea extends BaseEntity {
  @PrimaryColumn({ name: 'course_id' })
  @Field()
  courseId: string;

  /**
   * Name of the main area.
   */
  @PrimaryColumn({ name: 'main_area_name' })
  @Field()
  mainAreaName: string;

  /**
   * The course associated with the main area.
   * It establishes a many-to-one relationship with the Course entity.
   */
  @ManyToOne(() => Course, (course) => course.courseBelongsToMainArea)
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  /**
   * The main area associated with the course.
   * It establishes a many-to-one relationship with the MainArea entity.
   */
  @ManyToOne(() => MainArea, (mainArea) => mainArea.courseBelongsToMainArea)
  @Field((type) => MainArea)
  @JoinColumn({ name: 'main_area_name' })
  mainArea: MainArea;
}
