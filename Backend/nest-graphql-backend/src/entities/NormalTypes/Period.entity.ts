import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field()
  value: number;

  /**
   * Collection of courses that is being taught for this specific period.
   * It represents a one-to-many relationship with period.
   */
  @OneToMany(() => CoursePeriod, (coursePeriod) => coursePeriod.course, {
    cascade: true,
  })
  public courseBelongsToPeriod?: CoursePeriod[];
}
