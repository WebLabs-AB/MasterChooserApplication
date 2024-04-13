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

import { MasterProfile } from './MasterProfile.entity';
import { PackageCourse } from './PackageCourse.entity';

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
   * UUID of the package, which is auto-generated, which uniquely identifies the package.
   */
  @PrimaryGeneratedColumn('uuid', { name: 'package_id' })
  @Field()
  packageId: string;

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
   * This is a one-to-many relationship where a specific package can have multiple associated courses.
   * The 'cascade: true' option ensures that operations such as updates and deletions on the package
   * are also applied to the related PackageCourse entities.
   */
  @OneToMany(() => PackageCourse, (packageCourse) => packageCourse.packageId, {
    cascade: true,
  })
  public courseBelongsToPackage?: PackageCourse[];

  /**
   * This is a many-to-one relationship where a package is linked to a specific master profile.
   * The 'eager: true' option automatically loads the master profile when the package is queried.
   * The 'onDelete: "CASCADE"' option ensures that deletion of the master profile will also result in the deletion of the linked package.
   */
  @ManyToOne(() => MasterProfile, (masterProfile) => masterProfile.Packages, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => MasterProfile)
  @JoinColumn({ name: 'master_profile_id' })
  masterProfile: MasterProfile;
}
