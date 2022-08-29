import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';

import { User } from '../SuperTypes/User.entity';
import { Course } from './Course.entity';
import { MasterProfile } from './MasterProfile.entity';

@Entity('Teacher')
@ObjectType()
export class Teacher extends User {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @OneToMany(() => MasterProfile, (masterprofile) => masterprofile.teacher, {
    eager: true,
  }) // Shows which masterprofiles was created by a teacher.
  @Field((type) => [MasterProfile])
  MasterProfiles?: MasterProfile[];

  @OneToMany(() => Course, (course) => course.teacher, {
    eager: true,
  }) // Shows which courses was created by a teacher.
  @Field((type) => [Course])
  courses?: Course[];
}
