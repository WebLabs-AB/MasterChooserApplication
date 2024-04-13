import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MasterSchema } from './MasterSchema.entity';
import { CourseMainArea } from './CourseMainArea.entity';
import { EducationMainArea } from './EducationMainArea.entity';

/**
 * Represents a main area. All courses are part of one or more
 * main areas, such as "data technology" and "computer science".
 */
@Entity('MainArea')
@ObjectType()
export class MainArea extends BaseEntity {
  /**
   * Name of the main area.
   */
  @PrimaryColumn({ name: 'name' })
  @Field()
  name: string;

  /**
   * Contains all MasterSchemas that have chosen a specific MainArea.
   * This is a one-to-many relationship where each mainArea can have multiple associated MasterSchema entities.
   * The 'cascade: true' option means any operations like insert, update, or delete on the mainArea will also be applied to the related MasterSchema entities.
   * This property is nullable, meaning the mainArea may not always have associated MasterSchema entities.
   */
  @OneToMany(() => MasterSchema, (masterSchema) => masterSchema.mainArea, {
    cascade: true,
  })
  @Field((type) => [MasterSchema], { nullable: true })
  MasterSchemas?: MasterSchema[];

  /**
   * Collection of courses that belongs to this main area.
   * It indicates a one-to-many relationship with main areas.
   */
  @OneToMany(
    () => CourseMainArea,
    (courseMainArea) => courseMainArea.mainAreaName,
    {
      cascade: true,
    },
  )
  public courseBelongsToMainArea?: CourseMainArea[];

  @OneToMany(
    () => EducationMainArea,
    (educationMainArea) => educationMainArea.mainAreaName,
    { cascade: true },
  )
  public mainAreaBelongsToEducation?: EducationMainArea[];
}
