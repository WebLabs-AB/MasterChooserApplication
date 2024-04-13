import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { University } from './University.entity';
import { MasterProfile } from './MasterProfile.entity';
import { Student } from './Student.entity';
import { EducationCourse } from './EducationCourse.entity';
import { EducationMainArea } from './EducationMainArea.entity';

/**
 * Represents an education which is offered at a university.
 * The education limits which courses a student can study.
 */
@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
  /**
   * UUID of the education, which is auto-generated, which uniquely identifies the education.
   */
  @PrimaryGeneratedColumn('uuid', { name: 'education_id' })
  @Field()
  educationId: string;

  /**
   * Full name of the education.
   */
  @Column()
  @Field()
  name: string;

  /**
   * Number of ECTS (swe. HP) on advanced level required for the education.
   */
  @Column()
  @Field((type) => Int)
  totalA1X: number;

  /**
   * Short symbol for the education. For instance,
   * - D -> data technology
   * - U -> software development
   */
  @Column()
  @Field()
  symbol: string;

  /**
   * This is a one-to-many relationship where an education entity can have multiple associated master profiles.
   * The 'eager: true' option ensures that MasterProfiles are loaded automatically with the education entity.
   * The 'cascade: true' option ensures that updates and deletions on the education entity are also applied to the associated master profiles.
   */
  @OneToMany(() => MasterProfile, (masterProfile) => masterProfile.education, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [MasterProfile], { nullable: true })
  MasterProfiles?: MasterProfile[];

  /**
   * This is a one-to-many relationship where an education can have multiple associated students.
   * The 'cascade: true' option ensures that updates and deletions on the education entity are also applied to the associated Students.
   */
  @OneToMany(() => Student, (student) => student.education, {
    cascade: true,
  })
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];

  /**
   * This is a one-to-many relationship where a specific education entity can have multiple associated courses.
   * The 'cascade: true' option ensures that updates and deletions on the education entity are also applied to the associated courses.
   */
  @OneToMany(
    () => EducationCourse,
    (educationCourse) => educationCourse.educationId,
    { cascade: true },
  )
  public courseBelongsToEducation?: EducationCourse[];

  /**
   * This is a one-to-many relationship where a specific education entity can have multiple associated main areas.
   * The 'cascade: true' option ensures that updates and deletions on the education entity are also applied to the associated main areas.
   */
  @OneToMany(
    () => EducationMainArea,
    (educationMainArea) => educationMainArea.educationId,
    { cascade: true },
  )
  public mainAreaBelongsToEducation?: EducationMainArea[];

  /**
   * This is a many-to-one relationship where multiple admins can be associated with a single university.
   * The 'onDelete: "CASCADE"' option ensures that the deletion of the university entity will also result in the deletion of the associated admins.
   */
  @ManyToOne(() => University, (university) => university.Admins, {
    onDelete: 'CASCADE',
  })
  @Field((type) => University)
  @JoinColumn({ name: 'university_id' })
  university: University;
}
