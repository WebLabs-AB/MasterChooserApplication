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
    eager: true, // ManyToOne should always be eager to able to loaded when using find.
    onDelete: 'CASCADE',
  }) // Shows which university a student goes
  @JoinColumn({ name: 'universityName' })
  @Field((type) => University)
  university: University;

  @ManyToOne(() => Education, (education) => education.Students, {
    eager: true,
    onDelete: 'CASCADE',
  }) // Shows which education a student goes
  @JoinColumn({ name: 'educationName' })
  @Field((type) => Education)
  education: Education;

  @OneToMany(() => MasterSchema, (masterschema) => masterschema.student, {
    cascade: true,
  }) // Shows what masterschemas a student has created.
  @Field((type) => [MasterSchema])
  masterSchemas?: MasterSchema[];
}
