import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

import { User } from './User.entity';

/**
 * Represents a admin, which is one type of extended user.
 * An admin works at a university.
 */
@Entity('Admin')
@ObjectType()
export class Admin extends User {
    // TODO: UniversityId
}
