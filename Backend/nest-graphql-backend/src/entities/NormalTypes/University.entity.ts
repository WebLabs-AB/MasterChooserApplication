import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from './Student.entity';
import { Education } from './Education.entity';
import { MasterProfile } from './MasterProfile.entity';

@Entity('University')
@ObjectType()
export class University extends BaseEntity {
  @PrimaryColumn()
  @Field()
  universityName: string;

  @OneToMany(() => Student, (student) => student.university, {
    eager: true,
  }) // Shows which students goes to the university.
  @Field((type) => [Student])
  Students?: Student[];

  @OneToMany(() => Education, (education) => education.university, {
    eager: true,
  }) // Shows what educations belongs to an university..
  @Field((type) => [Education])
  Educations?: Education[];

  @OneToMany(() => MasterProfile, (masterprofile) => masterprofile.university, {
    eager: true,
  }) // Shows what masterprofiles belongs to an university..
  @Field((type) => [MasterProfile])
  MasterProfiles?: MasterProfile[];
}
