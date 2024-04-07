import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from './Student.entity';
import { Education } from './Education.entity';
import { MasterProfile } from './MasterProfile.entity';
import { Course } from './Course.entity';

@Entity('University')
@ObjectType()
export class University extends BaseEntity {
  @PrimaryColumn()
  @Field()
  universityName: string;

  @OneToMany(() => Student, (student) => student.university, {
    cascade: true,
  }) // Shows which students goes to the university.
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];

  @OneToMany(() => Education, (education) => education.university, {
    eager: true, // Dont remove this.
    cascade: true,
  }) // Shows what educations belongs to an university..
  @Field((type) => [Education], { nullable: true })
  Educations?: Education[];

  @OneToMany(() => MasterProfile, (masterprofile) => masterprofile.university, {
    cascade: true,
  }) // Shows what masterprofiles belongs to an university..
  @Field((type) => [MasterProfile], { nullable: true })
  MasterProfiles?: MasterProfile[];

  @OneToMany(() => Course, (course) => course.university, {
    cascade: true,
  }) // Shows what courses belongs to an university..
  @Field((type) => [Course], { nullable: true })
  courses?: Course[];
}
