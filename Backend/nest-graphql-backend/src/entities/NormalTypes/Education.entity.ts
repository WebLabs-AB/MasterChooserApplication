import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { University } from './University.entity';
import { Student } from './Student.entity';

@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
  @PrimaryColumn()
  @Field()
  educationName: string;

  @Column()
  @Field()
  symbol: string;

  @ManyToOne(() => University, (university) => university.Educations, {
    cascade: true,
  }) // Shows which university an education belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @OneToMany(() => Student, (student) => student.education, {
    eager: true,
  }) // Shows which students studies that education.
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];
}
