import { Entity, BaseEntity, Column } from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column({ unique: true })
  password: string;
}
