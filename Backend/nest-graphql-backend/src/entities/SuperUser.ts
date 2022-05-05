import { Entity, Column } from 'typeorm';

import { User } from './SuperTypes/User';

@Entity('SuperUser')
export class SuperUser extends User {
  @Column()
  liuId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
