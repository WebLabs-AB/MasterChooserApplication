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
   * Collection of courses that include this master schema.
   * Represents a one-to-many relationship to the master schema.
   */
  @OneToMany(
    () => MasterSchemaCourse,
    (masterSchemaCourse) => masterSchemaCourse.masterSchemaId,
    { cascade: true },
  )
  public courseBelongsToMasterSchema?: MasterSchemaCourse[];

  /**
   * Represents the association of this entity with a single Student entity.
   * This is a many-to-one relationship, where each instance of the current entity refers to one Student.
   * The 'eager: true' option means the Student entity will be automatically loaded when the current entity is queried.
   * The 'onDelete: "CASCADE"' option specifies that deletion of the Student will result in the deletion of the current entity.
   * The 'JoinColumn' decorator sets 'student' as the name of the foreign key column in the database.
   */
  @ManyToOne(() => Student, (student) => student.MasterSchemas, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Student)
  @JoinColumn({ name: 'student' })
  student: Student;

  /**
   * Represents the association of this entity with a single MainArea entity.
   * It establishes a many-to-one relationship, with each instance of the current entity referencing one MainArea.
   * The 'eager: true' option automatically loads the MainArea entity when the current entity is fetched.
   * The 'onDelete: "CASCADE"' option indicates that deleting the MainArea will lead to the deletion of the current entity.
   * The 'JoinColumn' decorator defines 'main_area_name' as the foreign key column in the database.
   */
  @ManyToOne(() => MainArea, (mainArea) => mainArea.MasterSchemas, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => MainArea)
  @JoinColumn({ name: 'main_area_name' })
  mainArea: MainArea;

  /**
   * Represents the association of this entity with a single MasterProfile entity.
   * This many-to-one relationship implies that each instance of the current entity is linked to one MasterProfile.
   * With 'eager: true', the MasterProfile entity is automatically loaded when querying the current entity.
   * The 'onDelete: "CASCADE"' option means that the removal of the MasterProfile will also remove this entity.
   * The 'JoinColumn' specifies that 'master_profile_id' is the foreign key column in the database.
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
