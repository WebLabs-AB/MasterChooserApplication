import { Entity } from 'typeorm';

import { User } from './SuperTypes/User';

@Entity('RegularUser')
export class RegularUser extends User {}
