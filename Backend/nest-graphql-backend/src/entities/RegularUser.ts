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

  @Field()
  universityName: string; // Used to find out what university the student goes to.

  @ManyToOne(() => University, (university) => university.Students, {
    cascade: true,
  }) // Shows which university a stundent goes
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;
}
