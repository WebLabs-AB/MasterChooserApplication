import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a master profile, which is a specialization of
 * an education. A master profile sets additional requirements
 * on possible courses.
 */
@Entity('MasterProfile')
@ObjectType()
export class MasterProfile extends BaseEntity {
  /**
   * ID of the master profile, which uniquely identifies
   * the master profile.
   */
  @PrimaryColumn({ name: 'master_profile_id' })
  @Field((type) => Int)
  masterProfileId: number;

  /**
   * Name of the master profile.
   */
  @Column()
  @Field()
  name: string;

  /**
   * Number of ECTS (swe. HP) on advanced level required on
   * the possible courses.
   */
  @Column()
  @Field((type) => Int)
  a1xHpRequirement: number;

  /**
   * Total number of ECTS (swe. HP) required on
   * the possible courses.
   */
  @Column()
  @Field((type) => Int)
  totalHpRequirement: number;

  /**
   * Number of optional courses.
   */
  @Column()
  @Field((type) => Int)
  numOptionalCourses: number;

  // TODO: TeacherEmail

  // TODO: EducationId
}
