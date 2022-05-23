import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { User } from './SuperTypes/User';
import { University } from './University';
import { Education } from './Education';

@Entity('RegularUser')
@ObjectType()
export class RegularUser extends User {
  @Column()
  @Field((type) => Int)
  startingYear: number;

  @Column()
  @Field()
  universityName: string; // Used to find out what university the student goes to.

  @Column()
  @Field()
  educationName: string; // Used to find out what education the student studies.

  @ManyToOne(() => University, (university) => university.Students, {
    cascade: true,
  }) // Shows which university a student goes
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @ManyToOne(() => Education, (education) => education.Students, {
    cascade: true,
  }) // Shows which university a student goes
  @Field((type) => Education)
  @JoinColumn({ name: 'educationName' })
  education: Education;
}
