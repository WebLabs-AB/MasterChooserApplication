import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

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
}
