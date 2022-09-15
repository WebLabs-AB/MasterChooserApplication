import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

//
import { Course } from './Course.entity';
import { MasterSchema } from './MasterSchema.entity';
import { Teacher } from './Teacher.entity';
import { University } from './University.entity';

@Entity('MasterProfile')
@ObjectType()
export class MasterProfile extends BaseEntity {
  @PrimaryColumn()
  @Field()
  masterName: string;

  @ManyToOne(() => University, (university) => university.MasterProfiles, {
    eager: true,
    onDelete: 'CASCADE',
  }) // Shows which university a masterprofile belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'universityName' })
  university: University;

  @ManyToOne(() => Teacher, (teacher) => teacher.MasterProfiles, {
    eager: true,
    onDelete: 'CASCADE',
  }) // Shows which teacher a masterprofile belongs to.
  @Field((type) => University)
  @JoinColumn({ name: 'teacher' })
  teacher: Teacher;

  @OneToMany(() => MasterSchema, (masterschema) => masterschema.masterProfile, {
    cascade: true,
  }) // Shows what masterschemas belongs to an master profile..
  @Field((type) => [MasterSchema])
  masterSchemas?: MasterSchema[];

  @ManyToMany(() => Course, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  availableCourses: Course[];

  @ManyToMany(() => Course, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  optionalCourses: Course[];

  @ManyToMany(() => Course, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  requiredCourses: Course[];

  @ManyToMany(() => Course, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  recommendedCourses: Course[];
}
