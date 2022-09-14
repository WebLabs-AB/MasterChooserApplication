import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Own files.
import { Course } from './Course.entity';
import { StartingYear } from './StartingYear.entity';

@Entity('CourseToStartingYear')
@ObjectType()
export class CourseToStartingYear extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  courseToStartingYearId: string;

  @Column()
  @Field()
  hp: number;

  @Column()
  @Field()
  level: string;

  @Column()
  @Field()
  schemaBlock: string;

  @ManyToOne(() => Course, (course) => course.courseToStartingYear, {
    eager: true,
  })
  @JoinColumn({ name: 'course' })
  public course!: Course;

  @ManyToOne(
    () => StartingYear,
    (startingYear) => startingYear.courseToStartingYear,
    {
      eager: true,
    },
  )
  @JoinColumn({ name: 'startingyear' })
  public startingYear!: StartingYear;
}
