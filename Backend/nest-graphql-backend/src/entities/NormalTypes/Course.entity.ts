import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

// Own files.
import { CourseToStartingYear } from './CourseToStartingYear.entity';
import { Education } from './Education.entity';
import { MainArea } from './MainArea.entity';
import { Period } from './Period.entity';
import { Teacher } from './Teacher.entity';
import { University } from './University.entity';

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
    () => CourseToStartingYear,
    (courseToStartingYear) => courseToStartingYear.course,
    {
      eager: true,
    },
  )
  public courseToStartingYear!: CourseToStartingYear[];

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, {
    cascade: true,
  }) // Shows what teacher the course belongs to.
  @Field((type) => Teacher)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;

  @ManyToOne(() => University, (university) => university.courses, {
    cascade: true,
  }) // Shows what university the course belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @ManyToMany(() => Education, (education) => education.courses, {
    cascade: true,
  })
  @JoinTable() // Shows what educations the course belongs to.
  educations: Education[];

  @ManyToMany(() => Period, {
    cascade: true,
  })
  @JoinTable() // Shows what periods the course is being taught, could be 1 or more.
  period: Period[];

  @ManyToMany(() => MainArea, {
    cascade: true,
  })
  @JoinTable() // Shows what main areas the course belongs to, could be 1 or more.
  mainArea: MainArea[];
}
