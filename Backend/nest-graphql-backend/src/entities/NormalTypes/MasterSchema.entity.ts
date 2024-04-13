import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from './Student.entity';
import { MainArea } from './MainArea.entity';
import { MasterProfile } from './MasterProfile.entity';
import { MasterSchemaCourse } from './MasterSchemaCourse.entity';

/**
 * Represents a master schema, which students can create.
 * A master schema represents planned master courses.
 */
@Entity('MasterSchema')
@ObjectType()
export class MasterSchema extends BaseEntity {
  /**
   * UUID of the master profile, which is auto-generated, which uniquely identifies the master profile.
   */
  @PrimaryGeneratedColumn('uuid', { name: 'master_schema_id' })
  @Field()
  masterSchemaId: string;

  /**
   * Name.
   */
  @Column()
  @Field()
  name: string;

  /**
   * Date of when the schema was created.
   */
  @CreateDateColumn({ name: 'created_date' })
  @Field()
  createdDate: string;

  /**
   * A boolean representing whether the schema is finished or not.
   */
  @Column()
  @Field()
  finished: boolean;

  /**
   * Year of when the first master course will be studied.
   */
  @Column({ name: 'first_year' })
  @Field((type) => Int)
  firstYear: number;

  /**
   * This is a one-to-many relationship where a specific master schema can have multiple associated courses.
   * The 'cascade: true' option ensures that operations like update and delete on the master schema will be reflected in the related courses.
   */
  @OneToMany(
    () => MasterSchemaCourse,
    (masterSchemaCourse) => masterSchemaCourse.masterSchemaId,
    { cascade: true },
  )
  public courseBelongsToMasterSchema?: MasterSchemaCourse[];

  /**
   * This is a many-to-one relationship where each instance of the current entity is associated with a single Student entity.
   * The 'onDelete: "CASCADE"' option ensures that when a Student is deleted, the associated entity instance is also removed from the database.
   */
  @ManyToOne(() => Student, (student) => student.MasterSchemas, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Student)
  @JoinColumn({ name: 'student' })
  student: Student;

  /**
   * This is a many-to-one relationship where each instance of the current entity is associated with a single MainArea entity.
   * The 'eager: true' option means that the MainArea entity is automatically loaded when the current entity is fetched.
   * The 'onDelete: "CASCADE"' option ensures that deleting the MainArea results in the deletion of the associated entity instance.
   */
  @ManyToOne(() => MainArea, (mainArea) => mainArea.MasterSchemas, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => MainArea)
  @JoinColumn({ name: 'main_area_name' })
  mainArea: MainArea;

  /**
   * This is a many-to-one relationship where each instance of the current entity is associated with a single MasterProfile entity.
   * With 'eager: true', the MasterProfile is loaded automatically when the current entity is fetched.
   * The 'onDelete: "CASCADE"' option ensures that removal of the MasterProfile will propagate the deletion to the associated entity instance.
   */
  @ManyToOne(
    () => MasterProfile,
    (masterProfile) => masterProfile.MasterSchemas,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  )
  @Field((type) => MasterProfile)
  @JoinColumn({ name: 'master_profile_id' })
  masterProfile: MasterProfile;
}
