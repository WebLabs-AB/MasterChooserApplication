import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

// Own files.
import { User } from '../SuperTypes/User.entity';

@Entity('Admin')
@ObjectType()
export class Admin extends User {}
