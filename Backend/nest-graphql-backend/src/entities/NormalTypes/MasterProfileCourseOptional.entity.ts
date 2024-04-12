import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from './Course.entity';
import { MasterProfile } from './MasterProfile.entity';

/**
 * Represents a MasterCourseOptional entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and master profiles,
 * indicating which courses are optional for specific master profiles.
 */
@Entity('MasterProfileCourseOptional')
@ObjectType()
export class MasterProfileCourseOptional extends BaseEntity {
  /**
   * The course that is optional for a master profile.
   * It establishes a many-to-one relationship with the Course entity.
   */
  @ManyToOne(() => Course, (course) => course.optionalMasterProfileCourses)
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  /**
   * The master profile for which the course is optional.
   * It establishes a many-to-one relationship with the MasterProfile entity.
   */
  @ManyToOne(
    () => MasterProfile,
    (masterProfile) => masterProfile.optionalMasterProfileCourses,
  )
  @Field((type) => MasterProfile)
  @JoinColumn({ name: 'masterProfileId' })
  masterProfile: MasterProfile;
}
