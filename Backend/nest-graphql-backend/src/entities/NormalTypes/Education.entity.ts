import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { University } from './University.entity';
import { Student } from './Student.entity';
import { Course } from './Course.entity';

@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
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

  @ManyToMany(() => Course, (course) => course.educations)
  courses: Course[];
}
