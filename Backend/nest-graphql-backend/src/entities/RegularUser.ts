import { Entity } from 'typeorm';
import { ObjectType } from '@nestjs/graphql';

import { User } from './SuperTypes/User';

@Entity('RegularUser')
@ObjectType()
export class RegularUser extends User {}
