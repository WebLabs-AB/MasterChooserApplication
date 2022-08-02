import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('User')
@ObjectType()
export class User extends BaseEntity {
  @PrimaryColumn()
  @Field(() => String, { description: 'User email ' })
  email: string;

  @Column()
  password: string;

  @Field(() => String, { description: 'User time created ' })
  @CreateDateColumn() // When an user is added to database, save date when user was created.
  createdAt: Date;
}
