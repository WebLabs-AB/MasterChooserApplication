import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { RegularUser } from './RegularUser';

@Entity('University')
@ObjectType()
export class University extends BaseEntity {
  @PrimaryColumn()
  @Field()
  universityName: string;

  @OneToMany(() => RegularUser, (regularuser) => regularuser.university) // Shows which students goes to the university.
  @Field((type) => [RegularUser], { nullable: true })
  Students?: RegularUser[];
}
