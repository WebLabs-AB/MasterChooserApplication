import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { User } from './User.entity';
import { MasterProfile } from './MasterProfile.entity';

/**
 * Represents a teacher, which is one type of extended user.
 * An teacher handles courses.
 */
@Entity('Teacher')
@ObjectType()
export class Teacher extends User {
  /**
   * First name of the teacher.
   */
  @Column()
  @Field()
  firstName: string;

  /**
   * Last name of the teacher.
   */
  @Column()
  @Field()
  lastName: string;

  /**
   * Optional collection of MasterProfile entities that are associated with a single Teacher entity.
   * It's a one-to-many relationship where each Teacher can be linked to multiple MasterProfiles.
   * The 'cascade: true' option ensures that operations like save and delete on the Teacher entity
   * are cascaded to related MasterProfiles.
   */
  @OneToMany(() => MasterProfile, (masterProfile) => masterProfile.teacher, {
    cascade: true,
  })
  @Field((type) => [MasterProfile], { nullable: true })
  public MasterProfiles?: MasterProfile[];
}
