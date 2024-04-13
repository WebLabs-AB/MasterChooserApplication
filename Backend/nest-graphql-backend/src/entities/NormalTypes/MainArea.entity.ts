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
   * This is a one-to-many relationship where a specific MainArea can be associated with multiple master schemas.
   * The 'cascade: true' option ensures that operations like insert, update, or delete on the MainArea are also applied to the related MasterSchema entities.
   */
  @OneToMany(() => MasterSchema, (masterSchema) => masterSchema.mainArea, {
    cascade: true,
  })
  @Field((type) => [MasterSchema], { nullable: true })
  MasterSchemas?: MasterSchema[];

  /**
   * This is a one-to-many relationship where a specific MainArea can have multiple associated CourseMainArea entities.
   * The 'cascade: true' option ensures that operations on the MainArea are also applied to the related CourseMainArea entities.
   */
  @OneToMany(
    () => CourseMainArea,
    (courseMainArea) => courseMainArea.mainAreaName,
    {
      cascade: true,
    },
  )
  public courseBelongsToMainArea?: CourseMainArea[];

  /**
   * This is a one-to-many relationship where a specific MainArea can have multiple associated EducationMainArea entities.
   * The 'cascade: true' option ensures that operations on the MainArea are also applied to the related EducationMainArea entities.
   */
  @OneToMany(
    () => EducationMainArea,
    (educationMainArea) => educationMainArea.mainAreaName,
    { cascade: true },
  )
  public mainAreaBelongsToEducation?: EducationMainArea[];
}
