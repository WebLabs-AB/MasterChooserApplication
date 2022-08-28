import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';

import { User } from '../SuperTypes/User.entity';

@Entity('Teacher')
@ObjectType()
export class Teacher extends User {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;
}
