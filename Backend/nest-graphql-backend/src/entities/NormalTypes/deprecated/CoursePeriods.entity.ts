import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Course } from './Course.entity';
import { Period } from './Period.entity';

@Entity('CoursePeriods')
@ObjectType()
export class CoursePeriods extends BaseEntity {
  @PrimaryColumn()
  @Field()
  courseId: string;

  @PrimaryColumn()
  @Field((type) => Int)
  periodValue: number;

  @ManyToOne(() => Course, (course) => course.periodConnection)
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Period, (period) => period.courseConnection)
  @Field((type) => Period)
  @JoinColumn({ name: 'periodValue' })
  period: Period;
}
