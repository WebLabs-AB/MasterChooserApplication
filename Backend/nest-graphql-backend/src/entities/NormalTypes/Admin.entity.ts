import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { User } from './User.entity';
import { University } from './University.entity';

/**
 * Represents an admin, which is one type of extended user.
 * An admin works at an university.
 */
@Entity('Admin')
@ObjectType()
export class Admin extends User {
  /**
   * Establishes a many-to-one relationship with the University entity.
   * Each Admin is linked to a single University, with the relationship eagerly loaded.
   * On deletion of the University, related Admin entities will also be removed due to the CASCADE option.
   */
  @ManyToOne(() => University, (university) => university.Admins, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => University)
  @JoinColumn({ name: 'university_id' })
  university: University;
}
