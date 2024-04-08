import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a user of the software. A user can either be an
 * admin, student or teacher.
 */
@Entity('User')
@ObjectType()
export class User extends BaseEntity {
    /**
     * Email of the user. The email is unique for each user, and is
     * also used for identifying a specific user.
     */
    @PrimaryColumn({ name: 'email' })
    @Field()
    email: string;

    /**
     * Password of the user. This field is generated from the
     * user-specified password and the salt, to prevent the original
     * password from being exposed.
     */
    @Column()
    @Field()
    password: string;

    /**
     * Salt used for preventing the actual password string from
     * being exposed.
     */
    @Column()
    @Field()
    salt: string;
}
