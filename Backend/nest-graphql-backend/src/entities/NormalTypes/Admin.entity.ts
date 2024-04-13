import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { User } from '../SuperTypes/User.entity';
import { University } from './University.entity';

/**
 * Represents an admin, which is one type of extended user.
 * An admin works at an university.
 */
@Entity('Admin')
@ObjectType()
export class Admin extends User {
  /**
   * This is a many-to-one relationship where each Admin entity is associated with a single University entity.
   * The 'eager: true' option ensures that the University entity is automatically loaded whenever the Admin entity is fetched.
   * The 'onDelete: "CASCADE"' option indicates that the deletion of a University entity will result in the removal of the associated Admin entities.
   */
  @ManyToOne(() => University, (university) => university.Admins, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => University)
  @JoinColumn({ name: 'university_id' })
  university: University;
}
