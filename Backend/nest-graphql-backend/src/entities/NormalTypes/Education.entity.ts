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
import { RegularUser } from './RegularUser.entity';

@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
  @PrimaryColumn()
  @Field()
  educationName: string;

  @Column()
  @Field()
  symbol: string;

  @Column()
  @Field()
  universityName: string; // Used to find out what university the education belongs to.

  @ManyToOne(() => University, (university) => university.Educations, {
    cascade: true,
  }) // Shows which university an education belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @OneToMany(() => RegularUser, (regularuser) => regularuser.education, {
    cascade: ['insert'],
  }) // Shows which students studies that education.
  @Field((type) => [RegularUser], { nullable: true })
  Students?: RegularUser[];
}
