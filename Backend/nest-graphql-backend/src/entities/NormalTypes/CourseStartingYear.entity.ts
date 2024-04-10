import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a CourseStartingYear entity within the educational platform.
 * This entity represents the starting year of a course for a specific level and schema block.
 * It establishes a many-to-many relationship between courses and starting years.
 */
@Entity('CourseStartingYear')
@ObjectType()
export class CourseStartingYear extends BaseEntity {
  /**
   * The level of the course starting year.
   */
  @Column()
  @Field((type) => Int)
  level: number;

  /**
   * The schema block of the course starting year.
   */
  @Column({ name: 'schema_block' })
  @Field((type) => Int)
  schemaBlock: number;

  /**
   * The course associated with the starting year.
   * It establishes a many-to-one relationship with the Course entity.
   */
  /*
  @ManyToOne(() => Course, (course) => course.startingYearConnection, {
    eager: true, // Eagerly load the associated course
    onDelete: 'CASCADE', // Cascade delete behavior
  })
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;
  */

  /**
   * The starting year associated with the course.
   * It establishes a many-to-one relationship with the StartingYear entity.
   */
  /*
  @ManyToOne(
    () => StartingYear,
    (startingYear) => startingYear.courseConnection,
    {
      eager: true, // Eagerly load the associated starting year
      onDelete: 'CASCADE', // Cascade delete behavior
    },
  )
  @Field((type) => StartingYear)
  @JoinColumn({ name: 'yearId' })
  staringYear: StartingYear;
  */
}
