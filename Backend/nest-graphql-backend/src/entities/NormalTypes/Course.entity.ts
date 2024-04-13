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
   * Collection of master profile that requires this course.
   * It defines a one-to-many relationship between the required course and the master profile.
   */
  @OneToMany(
    () => MasterProfileCourseRequired,
    (masterProfileCourseRequired) => masterProfileCourseRequired.courseId,
    { cascade: true },
  )
  public requiredMasterProfileCourses?: MasterProfileCourseRequired[];

  /**
   * Collection of master profile that says this course is optional.
   * It establishes a one-to-many relationship between the optional course and the master profile.
   */
  @OneToMany(
    () => MasterProfileCourseOptional,
    (masterProfileCourseOptional) => masterProfileCourseOptional.courseId,
    { cascade: true },
  )
  public optionalMasterProfileCourses?: MasterProfileCourseOptional[];

  /**
   * Collection of master schemas that include this course.
   * Represents a one-to-many relationship to the master schema.
   */
  @OneToMany(
    () => MasterSchemaCourse,
    (masterSchemaCourse) => masterSchemaCourse.courseId,
    { cascade: true },
  )
  public courseBelongsToMasterSchema?: MasterSchemaCourse[];

  /**
   * Collection of main areas to which this course belongs to.
   * It indicates a one-to-many relationship with main areas.
   */
  @OneToMany(
    () => CourseMainArea,
    (courseMainArea) => courseMainArea.courseId,
    {
      cascade: true,
    },
  )
  public courseBelongsToMainArea?: CourseMainArea[];

  /**
   * Collection of education programs that offers this course.
   * Defines a one-to-many relationship with education.
   */
  @OneToMany(
    () => EducationCourse,
    (educationCourse) => educationCourse.courseId,
    { cascade: true },
  )
  public courseBelongsToEducation?: EducationCourse[];

  /**
   * Collection of starting years when this course is available.
   * It maps a one-to-many relationship with starting years.
   */
  @OneToMany(
    () => CourseStartingYear,
    (courseStartingYear) => courseStartingYear.courseId,
    { cascade: true },
  )
  public courseBelongsToStartingYear?: CourseStartingYear[];

  /**
   * Collection of packages that include this course.
   * Establishes a one-to-many relationship with package.
   */
  @OneToMany(() => PackageCourse, (packageCourse) => packageCourse.courseId, {
    cascade: true,
  })
  public courseBelongsToPackage?: PackageCourse[];

  /**
   * Collection of periods during which this course is taught.
   * It represents a one-to-many relationship with period.
   */
  @OneToMany(() => CoursePeriod, (coursePeriod) => coursePeriod.courseId, {
    cascade: true,
  })
  public courseBelongsToPeriod?: CoursePeriod[];

  /**
   * The teacher responsible for the course. This is a many-to-one relationship as multiple courses
   * can be taught by the same teacher. The relationship is eagerly loaded and cascaded on delete.
   */
  @ManyToOne(() => Teacher, (teacher) => teacher.Courses, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Teacher)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;
}
