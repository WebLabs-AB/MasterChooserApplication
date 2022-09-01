import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { University } from './University.entity';
import { Education } from './Education.entity';
import { User } from '../SuperTypes/User.entity';
import { MasterSchema } from './MasterSchema.entity';

@Entity('Student')
@ObjectType()
export class Student extends User {
  @Column()
  @Field((type) => Int)
  startingYear: number;

  @ManyToOne(() => University, (university) => university.Students, {
    cascade: true,
  }) // Shows which university a student goes
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @ManyToOne(() => Education, (education) => education.Students, {
    cascade: true,
  }) // Shows which education a student goes
  @Field((type) => Education)
  @JoinColumn({ name: 'educationName' })
  education: Education;

  @OneToMany(() => MasterSchema, (masterschema) => masterschema.student, {
    eager: true,
  }) // Shows what masterschemas a student has created.
  @Field((type) => [MasterSchema])
  masterSchemas?: MasterSchema[];
}
