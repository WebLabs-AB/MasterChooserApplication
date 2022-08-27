import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, Column } from 'typeorm';

import { User } from '../SuperTypes/User.entity';

@Entity('SuperUser')
@ObjectType()
export class SuperUser extends User {
  @Column()
  @Field()
  liuId: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;
}
