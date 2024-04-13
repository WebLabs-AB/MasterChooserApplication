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
import { MasterProfileCourseOptional } from './MasterProfileCourseOptional.entity';
import { MasterProfileCourseRequired } from './MasterProfileCourseRequired.entity';
import { MasterSchemaCourse } from './MasterSchemaCourse.entity';
import { CourseMainArea } from './CourseMainArea.entity';
import { EducationCourse } from './EducationCourse.entity';
import { CourseStartingYear } from './CourseStartingYear.entity';
import { PackageCourse } from './PackageCourse.entity';
import { CoursePeriod } from './CoursePeriod.entity';
import { Teacher } from './Teacher.entity';

/**
 * Represents a Course entity within the educational platform. This entity serves as a fundamental building block
 * for organizing the curriculum, associated teaching staff, and enrolment requirements. It is linked to various
 * aspects of the educational model, such as master profiles, education programs, and course packages.
 */
@Entity('Course')
@ObjectType()
export class Course extends BaseEntity {
  /**
   * Unique identifier for the course.
   */
  @PrimaryColumn({ name: 'course_id' })
  @Field()
  courseId: string;

  /**
   * The name of the course.
   */
  @Column()
  @Field()
  name: string;

  /**
   * The number of credit points (HP - Högskolepoäng) the course provides.
   */
  @Column()
  @Field((type) => Int)
  hp: number;

  /**
   * This is a one-to-many relationship where a course may be required by multiple master profiles.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the master profiles that require this course.
   */
  @OneToMany(
    () => MasterProfileCourseRequired,
    (masterProfileCourseRequired) => masterProfileCourseRequired.courseId,
    { cascade: true },
  )
  public requiredMasterProfileCourses?: MasterProfileCourseRequired[];

  /**
   * This is a one-to-many relationship where a course may be optional for multiple master profiles.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the master profiles that have this course as optional.
   */
  @OneToMany(
    () => MasterProfileCourseOptional,
    (masterProfileCourseOptional) => masterProfileCourseOptional.courseId,
    { cascade: true },
  )
  public optionalMasterProfileCourses?: MasterProfileCourseOptional[];

  /**
   * This is a one-to-many relationship where a course can be included in multiple master schemas.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the master schemas including this course.
   */
  @OneToMany(
    () => MasterSchemaCourse,
    (masterSchemaCourse) => masterSchemaCourse.courseId,
    { cascade: true },
  )
  public courseBelongsToMasterSchema?: MasterSchemaCourse[];

  /**
   * This is a one-to-many relationship where a course can belong to multiple main areas.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the main areas to which this course belongs.
   */
  @OneToMany(
    () => CourseMainArea,
    (courseMainArea) => courseMainArea.courseId,
    { cascade: true },
  )
  public courseBelongsToMainArea?: CourseMainArea[];

  /**
   * This is a one-to-many relationship where a course may be offered by multiple education programs.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the education programs that offer this course.
   */
  @OneToMany(
    () => EducationCourse,
    (educationCourse) => educationCourse.courseId,
    { cascade: true },
  )
  public courseBelongsToEducation?: EducationCourse[];

  /**
   * This is a one-to-many relationship where a course may be available for multiple starting years.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the starting years in which this course is available.
   */
  @OneToMany(
    () => CourseStartingYear,
    (courseStartingYear) => courseStartingYear.courseId,
    { cascade: true },
  )
  public courseBelongsToStartingYear?: CourseStartingYear[];

  /**
   * This is a one-to-many relationship where a course may be included in multiple packages.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the packages that include this course.
   */
  @OneToMany(() => PackageCourse, (packageCourse) => packageCourse.courseId, {
    cascade: true,
  })
  public courseBelongsToPackage?: PackageCourse[];

  /**
   * This is a one-to-many relationship where a course may be taught during multiple periods.
   * The 'cascade: true' option ensures that updates and deletions on the course are also applied to the periods during which this course is taught.
   */
  @OneToMany(() => CoursePeriod, (coursePeriod) => coursePeriod.courseId, {
    cascade: true,
  })
  public courseBelongsToPeriod?: CoursePeriod[];

  /**
   * This is a many-to-one relationship where multiple courses can be taught by a single teacher.
   * The 'onDelete: "CASCADE"' option means that deleting the teacher will result in the deletion of the courses they are responsible for.
   */
  @ManyToOne(() => Teacher, (teacher) => teacher.Courses, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Teacher)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;
}
