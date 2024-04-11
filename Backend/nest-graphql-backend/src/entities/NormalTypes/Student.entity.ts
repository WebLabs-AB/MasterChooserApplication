import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

import { User } from './User.entity';

/**
 * Represents a student, which is one type of extended user.
 * A student studies a specific education at a university, and
 * wants to plan what master courses to study.
 */
@Entity('Student')
@ObjectType()
export class Student extends User {
  // TODO: Year
  // TODO: University
  // TODO: EducationId
  // TODO: StartingYear
}
