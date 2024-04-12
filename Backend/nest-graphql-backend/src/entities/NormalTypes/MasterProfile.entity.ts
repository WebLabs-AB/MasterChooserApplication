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
import { Package } from './Package.entity';
import { Teacher } from './Teacher.entity';
import { Education } from './Education.entity';
import { MasterSchema } from './MasterSchema.entity';
import { MasterProfileCourseOptional } from './MasterProfileCourseOptional.entity';
import { MasterProfileCourseRequired } from './MasterProfileCourseRequired.entity';

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

  /**
   * A collection of Package entities associated with the master profile.
   * This establishes a one-to-many relationship and enables cascading operations
   * such as update and delete to related Package entities.
   */
  @OneToMany(() => Package, (the_package) => the_package.masterProfile, {
    cascade: true,
  })
  @Field((type) => [Package], { nullable: true })
  public Packages?: Package[];

  /**
   * Collection of MasterSchemas that have chosen a specific MasterProfile.
   * This is a one-to-many relationship where each MasterProfile can have multiple associated MasterSchemas.
   * The 'eager: true' option ensures that the MasterSchema entities are loaded automatically when the MasterProfile is fetched.
   * The 'cascade: true' option allows changes to the MasterProfile to cascade to its related MasterSchemas,
   * such as updates or deletions.
   */
  @OneToMany(() => MasterSchema, (masterSchema) => masterSchema.masterProfile, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [MasterSchema], { nullable: true })
  MasterSchemas?: MasterSchema[];

  /**
   * Collection of master profile that says this course is optional.
   * It establishes a one-to-many relationship between the optional course and the master profile.
   */
  @OneToMany(
    () => MasterProfileCourseOptional,
    (masterProfileCourseOptional) => masterProfileCourseOptional.course,
    { cascade: true },
  )
  public optionalMasterProfileCourses?: MasterProfileCourseOptional[];

  /**
   * Collection of master profile that says this course is required.
   * It establishes a one-to-many relationship between the optional course and the master profile.
   */
  @OneToMany(
    () => MasterProfileCourseRequired,
    (requiredMasterProfileCourses) => requiredMasterProfileCourses.course,
    { cascade: true },
  )
  public requiredMasterProfileCourses?: MasterProfileCourseRequired[];

  /**
   * Represents the association of a MasterProfile with a single Teacher entity.
   * This is a many-to-one relationship where each MasterProfile references one Teacher.
   * The 'eager: true' option automatically loads the Teacher entity when the MasterProfile is queried.
   * The 'onDelete: "CASCADE"' option means that deleting the Teacher will result in the deletion of the MasterProfile.
   * The 'JoinColumn' decorator specifies the column name that will be used as the foreign key in the database.
   */
  @ManyToOne(() => Teacher, (teacher) => teacher.MasterProfiles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Teacher)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;

  // TODO: EducationId
  @ManyToOne(() => Education, (education) => education.MasterProfiles, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Education)
  @JoinColumn({ name: 'education_id' })
  education: Education;
}
