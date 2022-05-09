import {
  Entity,
  BaseEntity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { University } from './University';

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
}
