import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from './Course.entity';
import { StartingYear } from './StartingYear.entity';

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
  @ManyToOne(() => Course, (course) => course.courseBelongsToStartingYear, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  /**
   * The starting year associated with the course.
   * It establishes a many-to-one relationship with the StartingYear entity.
   */
  @ManyToOne(
    () => StartingYear,
    (startingYear) => startingYear.courseBelongsToStartingYear,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @Field((type) => StartingYear)
  @JoinColumn({ name: 'year' })
  staringYear: StartingYear;
}
