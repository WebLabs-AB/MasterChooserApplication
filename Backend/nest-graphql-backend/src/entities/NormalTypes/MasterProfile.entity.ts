import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Package } from './Package.entity';
import { Teacher } from './Teacher.entity';
import { Education } from './Education.entity';
import { MasterSchema } from './MasterSchema.entity';
import { MasterProfileCourseOptional } from './MasterProfileCourseOptional.entity';
import { MasterProfileCourseRequired } from './MasterProfileCourseRequired.entity';

/**
 * Represents a master profile, which is a specialization of
 * an education. A master profile sets additional requirements on possible courses.
 */
@Entity('MasterProfile')
@ObjectType()
export class MasterProfile extends BaseEntity {
  /**
   * UUID of the master profile, which is auto-generated, which uniquely identifies the master profile.
   */
  @PrimaryGeneratedColumn('uuid', { name: 'master_profile_id' })
  @Field()
  masterProfileId: string;

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
   * This is a one-to-many relationship where a specific MasterProfile can offer multiple Packages.
   * The 'cascade: true' option ensures that updates and deletions on the master profile are also applied to associated course packages.
   */
  @OneToMany(() => Package, (the_package) => the_package.masterProfile, {
    cascade: true,
  })
  @Field((type) => [Package], { nullable: true })
  public Packages?: Package[];

  /**
   * This is a one-to-many relationship where a specific master profile can belong to multiple master schemas.
   * The 'cascade: true' option ensures that updates and deletions on the master profile are also applied to the master schemas that have chosen
   * this master profile.
   */
  @OneToMany(() => MasterSchema, (masterSchema) => masterSchema.masterProfile, {
    cascade: true,
  })
  @Field((type) => [MasterSchema], { nullable: true })
  MasterSchemas?: MasterSchema[];

  /**
   * This is a one-to-many relationship where the master profile can have multiple optional courses.
   * The 'cascade: true' option ensures that updates and deletions on the master profile are also applied to the optional courses
   * that belongs to associated master profile.
   */
  @OneToMany(
    () => MasterProfileCourseOptional,
    (masterProfileCourseOptional) =>
      masterProfileCourseOptional.masterProfileId,
    { cascade: true },
  )
  public optionalMasterProfileCourses?: MasterProfileCourseOptional[];

  /**
   * This is a one-to-many relationship, where a master profile can specify multiple required courses.
   * The 'cascade: true' option allows for updates and deletions on the master profile to affect its required courses.
   */
  @OneToMany(
    () => MasterProfileCourseRequired,
    (requiredMasterProfileCourses) =>
      requiredMasterProfileCourses.masterProfileId,
    { cascade: true },
  )
  public requiredMasterProfileCourses?: MasterProfileCourseRequired[];

  /**
   * This is a many-to-one relationship where multiple master profiles can belong to a single teacher.
   * The 'onDelete: "CASCADE"' option means that deleting a teacher will result in the deletion of the it's associated master profiles.
   */
  @ManyToOne(() => Teacher, (teacher) => teacher.MasterProfiles, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Teacher)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;

  /**
   * This is a many-to-one relationship where multiple master profiles can be offered for an education.
   * The 'onDelete: "CASCADE"' option means that deleting the education will result in the deletion of it's associated master profiles.
   */
  @ManyToOne(() => Education, (education) => education.MasterProfiles, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Education)
  @JoinColumn({ name: 'education_id' })
  education: Education;
}
