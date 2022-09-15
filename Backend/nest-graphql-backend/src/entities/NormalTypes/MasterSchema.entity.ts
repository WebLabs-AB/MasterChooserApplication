import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './Course.entity';
import { MasterProfile } from './MasterProfile.entity';
import { Student } from './Student.entity';

@Entity('MasterSchema')
@ObjectType()
export class MasterSchema extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field()
  finished: boolean;

  @Field(() => String, { description: 'Time when masterschema was created ' })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Student, (student) => student.masterSchemas, {
    eager: true,
    onDelete: 'CASCADE',
  }) // Shows which masterschemas belong to a student.
  @Field((type) => Student)
  @JoinColumn({ name: 'student' })
  student: Student;

  @ManyToOne(
    () => MasterProfile,
    (masterprofile) => masterprofile.masterSchemas,
    {
      eager: true,
      onDelete: 'CASCADE',
    },
  ) // Shows which masterschemas belong to a student.
  @Field((type) => MasterProfile)
  @JoinColumn({ name: 'masterprofile' })
  masterProfile: MasterProfile;

  @ManyToMany(() => Course, {
    eager: true,
  })
  @JoinTable() // Shows what courses have been chosen.
  courses: Course[];
}
