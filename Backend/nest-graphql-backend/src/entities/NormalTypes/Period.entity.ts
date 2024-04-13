import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CoursePeriod } from './CoursePeriod.entity';

/**
 * Represents a period. A period represents when a course
 * is offered for instance, first half of autumn.
 */
@Entity('Period')
@ObjectType()
export class Period extends BaseEntity {
  /**
   * Period value.
   */
  @PrimaryColumn({ name: 'value' })
  @Field((type) => Int)
  value: number;

  /**
   * This is a one-to-many relationship where a specific course can be associated with multiple periods.
   * The 'cascade: true' option ensures that operations like updates and deletions on the course are also
   * applied to the course periods that include this course.
   */
  @OneToMany(() => CoursePeriod, (coursePeriod) => coursePeriod.periodValue, {
    cascade: true,
  })
  public courseBelongsToPeriod?: CoursePeriod[];
}
