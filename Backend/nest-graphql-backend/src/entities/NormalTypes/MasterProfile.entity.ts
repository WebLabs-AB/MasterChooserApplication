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

  @OneToMany(() => MasterSchema, (masterschema) => masterschema.masterProfile, {
    eager: true,
  }) // Shows what masterschemas belongs to an master profile..
  @Field((type) => [MasterSchema])
  masterSchemas?: MasterSchema[];

  @ManyToMany(() => Course, {
    cascade: true,
  })
  @JoinTable()
  availableCourses: Course[];

  @ManyToMany(() => Course, {
    cascade: true,
  })
  @JoinTable()
  optionalCourses: Course[];

  @ManyToMany(() => Course, {
    cascade: true,
  })
  @JoinTable()
  requiredCourses: Course[];

  @ManyToMany(() => Course, {
    cascade: true,
  })
  @JoinTable()
  recommendedCourses: Course[];
}
