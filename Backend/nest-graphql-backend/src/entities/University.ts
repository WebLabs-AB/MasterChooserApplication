import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { RegularUser } from './RegularUser';
import { Education } from './Education';

@Entity('University')
@ObjectType()
export class University extends BaseEntity {
  @PrimaryColumn()
  @Field()
  universityName: string;

  @OneToMany(() => RegularUser, (regularuser) => regularuser.university, {
    cascade: ['insert'],
  }) // Shows which students goes to the university.
  @Field((type) => [RegularUser], { nullable: true })
  Students?: RegularUser[];

  @OneToMany(() => Education, (education) => education.university, {
    cascade: ['insert'],
  }) // Shows what educations belongs to an university..
  @Field((type) => [Education], { nullable: true })
  Educations?: Education[];
}
