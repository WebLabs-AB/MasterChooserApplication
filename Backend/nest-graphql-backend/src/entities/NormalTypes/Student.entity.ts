import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from '../SuperTypes/User.entity';
import { MasterSchema } from './MasterSchema.entity';
import { University } from './University.entity';
import { Education } from './Education.entity';
import { StartingYear } from './StartingYear.entity';

/**
 * Represents a student, which is one type of extended user.
 * A student studies a specific education at a university, and
 * wants to plan what master courses to study.
 */
@Entity('Student')
@ObjectType()
export class Student extends User {
  /**
   * This is a one-to-many relationship where a specific student can be associated with multiple master schemas.
   * The 'eager: true' option ensures that the master schemas is loaded automatically with the student entity.
   * The 'cascade: true' option ensures that updates and deletions on the student entity are also applied to the master schemas associated with the student.
   */
  @OneToMany(() => MasterSchema, (masterSchema) => masterSchema.student, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [MasterSchema], { nullable: true })
  MasterSchemas?: MasterSchema[];

  /**
   * This is a many-to-one relationship where multiple students can be associated with a single university.
   * The 'eager: true' option ensures that the University entity is loaded automatically when the Student is fetched.
   * The 'onDelete: "CASCADE"' option will delete the Student records when the associated University is deleted.
   */
  @ManyToOne(() => University, (university) => university.Students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => University)
  @JoinColumn({ name: 'university_id' })
  university: University;

  /**
   * This is a many-to-one relationship where each student is linked to one education.
   * The 'eager: true' option ensures the Education entity is loaded automatically when the Student is fetched.
   * The 'onDelete: "CASCADE"' option will delete the Student records when the associated Education is deleted.
   */
  @ManyToOne(() => Education, (education) => education.Students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Education)
  @JoinColumn({ name: 'education_id' })
  education: Education;

  /**
   * This is a many-to-one relationship where each student is linked to one starting year.
   * The 'eager: true' option ensures the StartingYear entity is loaded automatically when the Student is fetched.
   * The 'onDelete: "CASCADE"' option ensures that if the StartingYear is deleted, the linked Student will also be removed.
   */
  @ManyToOne(() => StartingYear, (startingYear) => startingYear.Students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => StartingYear)
  @JoinColumn({ name: 'year' })
  year: StartingYear;
}
