import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';

import { User } from '../SuperTypes/User.entity';
import { MasterProfile } from './MasterProfile.entity';
import { Course } from './Course.entity';

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
   * This is a one-to-many relationship where a teacher can have multiple associated master profiles.
   * The 'cascade: true' option ensures that operations like updates and deletions on the teacher entity
   * are also applied to the master profiles associated with this teacher.
   */
  @OneToMany(() => MasterProfile, (masterProfile) => masterProfile.teacher, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [MasterProfile], { nullable: true })
  public MasterProfiles?: MasterProfile[];

  /**
   * This is a one-to-many relationship where a teacher can be associated with multiple courses.
   * The 'cascade: true' option ensures that any updates and deletions on the teacher entity are
   * cascaded to the courses that the teacher is associated with.
   */
  @OneToMany(() => Course, (course) => course.teacher, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [Course], { nullable: true })
  public Courses?: Course[];
}
