import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Course } from './Course.entity';
import { Education } from './Education.entity';

@Entity('CourseEducations')
@ObjectType()
export class CourseEducations extends BaseEntity {
  @PrimaryColumn()
  @Field()
  courseId: string;

  @PrimaryColumn({ name: 'educationId', type: 'uuid' })
  @Field()
  educationId: string;

  @ManyToOne(() => Course, (course) => course.educationConnection)
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @ManyToOne(() => Education, (education) => education.courseConnection)
  @Field((type) => Education)
  @JoinColumn({ name: 'educationId' })
  education: Education;
}
