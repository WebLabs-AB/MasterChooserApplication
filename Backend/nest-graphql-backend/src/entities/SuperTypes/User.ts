import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn() // When an user is added to database, save date when user was created.
  createdAt: Date;
}
