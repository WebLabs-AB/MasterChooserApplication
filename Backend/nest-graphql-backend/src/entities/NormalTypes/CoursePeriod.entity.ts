import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Course } from './Course.entity';
import { Period } from './Period.entity';

/**
 * Represents a CoursePeriod entity within the educational platform.
 * This entity serves to link courses with specific periods during which they are taught.
 * It establishes a many-to-many relationship between courses and periods.
 */
@Entity('CoursePeriod')
@ObjectType()
export class CoursePeriod extends BaseEntity {
  @PrimaryColumn({ name: 'course_id' })
  @Field()
  courseId: string;

  /**
   * Name of the main area.
   */
  @PrimaryColumn({ name: 'period_value' })
  @Field((type) => Int)
  periodValue: number;

  /**
   * The course associated with this period.
   * It establishes a many-to-one relationship with the Course entity.
   */
  @ManyToOne(() => Course, (course) => course.courseBelongsToPeriod)
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  /**
   * The period during which the course is taught.
   * It establishes a many-to-one relationship with the Period entity.
   */
  @ManyToOne(() => Period, (period) => period.courseBelongsToPeriod)
  @Field((type) => Period)
  @JoinColumn({ name: 'period_value' })
  period: Period;
}
