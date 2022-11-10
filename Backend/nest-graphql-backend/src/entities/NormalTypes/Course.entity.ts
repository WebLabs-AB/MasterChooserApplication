import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

// Own files.
import { CourseStartingYears } from './CourseStartingYears.entity';
import { Teacher } from './Teacher.entity';
import { University } from './University.entity';
import { CourseEducations } from './CourseEducations.entity';
import { CourseMainAreas } from './CourseMainAreas.entity';
import { CoursePeriods } from './CoursePeriods.entity';

@Entity('Course')
@ObjectType()
export class Course extends BaseEntity {
  @PrimaryColumn()
  @Field()
  courseId: string;

  @Column()
  @Field()
  courseName: string;

  @Column()
  @Field()
  courseLink: string;

  @Field(() => String, { description: 'Time when course was created ' })
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => CourseStartingYears,
    (courseToStartingYear) => courseToStartingYear.course,
    {
      cascade: true,
    },
  )
  public courseToStartingYear!: CourseStartingYears[];

  @OneToMany(
    () => CourseEducations,
    (courseEducations) => courseEducations.courseId,
  )
  public educationConnection: CourseEducations[];

  @OneToMany(() => CoursePeriods, (coursePeriods) => coursePeriods.courseId)
  public periodConnection: CoursePeriods[];

  @OneToMany(
    () => CourseMainAreas,
    (courseMainAreas) => courseMainAreas.courseId,
  )
  public mainAreaConnection: CourseMainAreas[];

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, {
    eager: true,
    onDelete: 'CASCADE',
  }) // Shows what teacher the course belongs to.
  @Field((type) => Teacher)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;

  @ManyToOne(() => University, (university) => university.courses, {
    eager: true,
    onDelete: 'CASCADE',
  }) // Shows what university the course belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;
}
