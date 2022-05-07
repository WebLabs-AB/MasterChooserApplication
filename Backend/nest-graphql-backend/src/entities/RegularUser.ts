import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from './SuperTypes/User';
import { University } from './University';

@Entity('RegularUser')
@ObjectType()
export class RegularUser extends User {
  @Column()
  @Field((type) => Int)
  startingYear: number;

  @Column()
  @Field()
  universityName: string; // Used to find out what university the student goes to.

  @ManyToOne(() => University, (university) => university.Students) // Shows which university a stundent goes
  @Field((type) => University)
  university: University;
}
