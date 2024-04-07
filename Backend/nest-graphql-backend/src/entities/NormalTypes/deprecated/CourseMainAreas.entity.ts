import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from './Course.entity';
import { MainArea } from './MainArea.entity';

@Entity('CourseMainAreas')
@ObjectType()
export class CourseMainAreas extends BaseEntity {
  @PrimaryColumn()
  @Field()
  courseId: string;

  @PrimaryColumn()
  @Field()
  type: string;

  @ManyToOne(() => Course, (course) => course.mainAreaConnection)
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => MainArea, (mainArea) => mainArea.courseConnection)
  @Field((type) => MainArea)
  @JoinColumn({ name: 'type' })
  mainArea: MainArea;
}
