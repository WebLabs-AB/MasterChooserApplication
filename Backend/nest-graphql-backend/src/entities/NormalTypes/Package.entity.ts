import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { MasterProfile } from './MasterProfile.entity';

/**
 * Represents a course package, which is part
 * of a master profile. A package specifies
 * a number of courses, where a student only has
 * to read some of the courses. The student
 * decides which of the presented courses
 * they will read.
 */
@Entity('Package')
@ObjectType()
export class Package extends BaseEntity {
  /**
   * ID of the package, which uniquely identifies the package.
   */
  @PrimaryColumn({ name: 'package_id' })
  @Field((type) => Int)
  packageId: number;

  /**
   * Name of the package.
   */
  @Column()
  @Field()
  name: string;

  /**
   * The number of courses the student
   * has to read.
   */
  @Column()
  @Field((type) => Int)
  numObligatoryCourses: number;

  /**
   * Links to a single MasterProfile entity that this entity belongs to.
   * This is a many-to-one relationship where multiple instances of the package entity
   * are connected to one MasterProfile. It is eager-loaded and set to cascade on delete.
   */
  @ManyToOne(() => MasterProfile, (masterProfile) => masterProfile.Packages, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => MasterProfile)
  @JoinColumn({ name: 'master_profile_id' })
  masterProfile: MasterProfile;
}
