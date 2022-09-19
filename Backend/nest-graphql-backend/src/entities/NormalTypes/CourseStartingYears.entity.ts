import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

// Own files.
import { Course } from './Course.entity';
import { StartingYear } from './StartingYear.entity';

@Entity('CourseStartingYears')
@ObjectType()
export class CourseStartingYears extends BaseEntity {
  @PrimaryColumn()
  @Field()
  courseId: string;

  @PrimaryColumn()
  @Field((type) => Int)
  yearTaught: number;

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
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'courseId' })
  public course!: Course;

  @ManyToOne(
    () => StartingYear,
    (startingYear) => startingYear.courseToStartingYear,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'yearTaught' })
  public year!: StartingYear;
}
