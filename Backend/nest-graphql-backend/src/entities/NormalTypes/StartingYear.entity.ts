import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Student } from './Student.entity';
import { CourseStartingYear } from './CourseStartingYear.entity';

/**
 * Represents a year, which a student started studying.
 */
@Entity('StartingYear')
@ObjectType()
export class StartingYear extends BaseEntity {
  /**
   * Year.
   */
  @PrimaryColumn({ name: 'year' })
  @Field((type) => Int)
  year: number;

  /**
   * Represents that multiple Students can go to a single University.
   * This is a one-to-many relationship where each Student references their Education.
   * The 'eager: true' option automatically loads the Student entities when the Education is queried.
   * The 'cascade: true' option means that operations on the Education entity will cascade to the related Student entities.
   * The relationship is also nullable, allowing for the possibility of an Education without any associated Students.
   */
  @OneToMany(() => Student, (student) => student.education, {
    cascade: true,
  })
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];

  /**
   * Collection of courses that is available for this starting years.
   * It maps a one-to-many relationship with starting years.
   */
  @OneToMany(
    () => CourseStartingYear,
    (courseStartingYear) => courseStartingYear.startYear,
    { cascade: true },
  )
  public courseBelongsToStartingYear?: CourseStartingYear[];
}
