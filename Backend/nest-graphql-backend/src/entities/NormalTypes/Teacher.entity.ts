import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

import { User } from './User.entity';

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
}
