import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Teacher } from './Teacher.entity';
import { University } from './University.entity';

// Own files.

@Entity('MasterProfile')
@ObjectType()
export class MasterProfile extends BaseEntity {
  @PrimaryColumn()
  @Field()
  masterName: string;

  @ManyToOne(() => University, (university) => university.MasterProfiles, {
    cascade: true,
  }) // Shows which university a masterprofile belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @ManyToOne(() => Teacher, (teacher) => teacher.MasterProfiles, {
    cascade: true,
  }) // Shows which teacher a masterprofile belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;
}
