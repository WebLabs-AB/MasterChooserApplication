import { Entity, Column } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from './SuperTypes/User';

@Entity('RegularUser')
@ObjectType()
export class RegularUser extends User {
  @Column()
  @Field((type) => Int)
  startingYear: number;
}
