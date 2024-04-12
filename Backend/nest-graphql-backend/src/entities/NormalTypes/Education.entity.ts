import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { University } from './University.entity';
import { MasterProfile } from './MasterProfile.entity';
import { Student } from './Student.entity';

/**
 * Represents an education which is offered at a university.
 * The education limits which courses a student can study.
 */
@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
  /**
   * ID of the education, which uniquely identifies the education.
   */
  @PrimaryColumn({ name: 'education_id' })
  @Field((type) => Int)
  educationId: number;

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
   * Collection of MasterProfiles related to this education entity. It's a one-to-many relationship,
   * with the eager loading of MasterProfiles when the education entity is queried.
   * Cascading is enabled, so operations like update and delete on the education entity will affect its associated MasterProfiles.
   */
  @OneToMany(() => MasterProfile, (masterProfile) => masterProfile.education, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [MasterProfile], { nullable: true })
  MasterProfiles?: MasterProfile[];

  /**
   * Collection of Students associated with this education entity. Similarly, it defines a one-to-many relationship,
   * where eager loading is set to true to automatically include Students when fetching the education entity.
   * Cascading is enabled for update and delete operations to be reflected on the associated Students.
   */
  @OneToMany(() => Student, (student) => student.education, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];

  /**
   * Links each admin to a specific university.
   * Establishes a many-to-one relationship where multiple admins can be associated with a single university.
   * This field is eagerly loaded and deletion will cascade, meaning if the university is deleted,
   * the admin will also be removed.
   */
  @ManyToOne(() => University, (university) => university.Admins, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => University)
  @JoinColumn({ name: 'university_id' })
  university: University;
}
