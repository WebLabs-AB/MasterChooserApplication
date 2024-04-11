import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a PackageCourse entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and packages,
 * indicating which courses are included in specific packages.
 */
@Entity('PackageCourse')
@ObjectType()
export class PackageCourse extends BaseEntity {
  /**
   * The course included in the package.
   * It establishes a many-to-one relationship with the Course entity.
   */
  /*
  @ManyToOne(() => Course, (course) => course.packageConnection)
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;
  */
  /**
   * The package containing the course.
   * It establishes a many-to-one relationship with the Package entity.
   */
  /*
  @ManyToOne(() => Package, (package) => package.courseConnection)
  @Field((type) => Package)
  @JoinColumn({ name: 'packageId' })
  package: Package;
  */
}
