import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CoursePeriods } from './CoursePeriods.entity';

@Entity('Period')
@ObjectType()
export class Period extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => Int)
  value: number;

  @OneToMany(() => CoursePeriods, (coursePeriods) => coursePeriods.periodValue)
  public courseConnection: CoursePeriods[];
}
