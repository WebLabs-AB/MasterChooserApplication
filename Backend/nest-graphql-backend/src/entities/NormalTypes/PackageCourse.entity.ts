import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Course } from './Course.entity';
import { Package } from './Package.entity';

/**
 * Represents a PackageCourse entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and packages,
 * indicating which courses are included in specific packages.
 */
@Entity('PackageCourse')
@ObjectType()
export class PackageCourse extends BaseEntity {
  @PrimaryColumn({ name: 'course_id' })
  @Field()
  courseId: string;

  @PrimaryColumn({ name: 'package_id' })
  @Field()
  packageId: string;

  /**
   * The course included in the package.
   * It establishes a many-to-one relationship with the Course entity.
   */
  @ManyToOne(() => Course, (course) => course.courseBelongsToPackage)
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  /**
   * The package containing the course.
   * It establishes a many-to-one relationship with the Package entity.
   */
  @ManyToOne(() => Package, (the_package) => the_package.courseBelongsToPackage)
  @Field((type) => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;
}
