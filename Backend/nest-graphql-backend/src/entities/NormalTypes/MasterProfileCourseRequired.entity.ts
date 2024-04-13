import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { MasterProfile } from './MasterProfile.entity';
import { Course } from './Course.entity';

/**
 * Represents a MasterCourseRequired entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and master profiles,
 * indicating which courses are required for specific master profiles.
 */
@Entity('MasterProfileCourseRequired')
@ObjectType()
export class MasterProfileCourseRequired extends BaseEntity {
  @PrimaryColumn({ name: 'course_id' })
  @Field()
  courseId: string;

  @PrimaryColumn({ name: 'master_profile_id', type: 'uuid' })
  @Field()
  masterProfileId: string;

  /**
   * The course that is required for a master profile.
   * It establishes a many-to-one relationship with the Course entity.
   */
  @ManyToOne(() => Course, (course) => course.requiredMasterProfileCourses)
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  /**
   * The master profile for which the course is required.
   * It establishes a many-to-one relationship with the MasterProfile entity.
   */
  @ManyToOne(
    () => MasterProfile,
    (masterProfile) => masterProfile.requiredMasterProfileCourses,
  )
  @Field((type) => MasterProfile)
  @JoinColumn({ name: 'master_profile_id' })
  masterProfile: MasterProfile;
}
