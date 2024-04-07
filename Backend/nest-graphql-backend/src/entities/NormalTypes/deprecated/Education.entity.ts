import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { University } from './University.entity';
import { Student } from './Student.entity';
import { CourseEducations } from './CourseEducations.entity';

@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  educationName: string;

  @Column()
  @Field()
  symbol: string;

  @ManyToOne(() => University, (university) => university.Educations, {
    onDelete: 'CASCADE',
  }) // Shows which university an education belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @OneToMany(() => Student, (student) => student.education, {
    cascade: true,
  }) // Shows which students studies that education.
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];

  @OneToMany(
    () => CourseEducations,
    (courseEducations) => courseEducations.educationId,
  )
  public courseConnection: CourseEducations[];
}
