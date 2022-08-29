import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column, OneToMany } from 'typeorm';

import { User } from '../SuperTypes/User.entity';
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
  }) // Shows which students studies that education.
  @Field((type) => [MasterProfile])
  MasterProfiles?: MasterProfile[];
}
