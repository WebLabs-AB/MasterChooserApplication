import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a MasterCourseOptional entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and master profiles,
 * indicating which courses are optional for specific master profiles.
 */
@Entity('MasterCourseOptional')
@ObjectType()
export class MasterCourseOptional extends BaseEntity {
  /**
   * The course that is optional for a master profile.
   * It establishes a many-to-one relationship with the Course entity.
   */
  /*
  @ManyToOne(() => Course, (course) => course.masterProfileConnection)
  @Field((type) => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course;
  */
  /**
   * The master profile for which the course is optional.
   * It establishes a many-to-one relationship with the MasterProfile entity.
   */
  /*
  @ManyToOne(
    () => MasterProfile,
    (masterProfile) => masterProfile.courseConnection,
  )
  @Field((type) => MasterProfile)
  @JoinColumn({ name: 'masterProfileId' })
  masterProfile: MasterProfile;
  */
}
