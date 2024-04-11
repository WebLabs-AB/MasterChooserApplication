import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, OneToMany } from 'typeorm';

import { User } from './User.entity';
import { MasterSchema } from './MasterSchema.entity';

/**
 * Represents a student, which is one type of extended user.
 * A student studies a specific education at a university, and
 * wants to plan what master courses to study.
 */
@Entity('Student')
@ObjectType()
export class Student extends User {
  // TODO: Year
  // TODO: University
  // TODO: EducationId
  // TODO: StartingYear

  /**
   * Represents the number of MasterSchemas a student has created.
   * This is a one-to-many relationship, indicating that a student can be associated with multiple MasterSchemas.
   * The 'eager: true' option automatically loads the MasterSchema entities when the student is queried.
   * The 'cascade: true' option indicates that operations like persist and remove will cascade to the related MasterSchema entities.
   * This relationship is exposed as a nullable GraphQL field, allowing it to be omitted in queries.
   */
  @OneToMany(() => MasterSchema, (masterSchema) => masterSchema.student, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [MasterSchema], { nullable: true })
  MasterSchemas?: MasterSchema[];
}
