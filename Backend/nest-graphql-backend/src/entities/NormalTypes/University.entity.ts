import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Student } from './Student.entity';
import { Education } from './Education.entity';

@Entity('University')
@ObjectType()
export class University extends BaseEntity {
  @PrimaryColumn()
  @Field()
  universityName: string;

  @OneToMany(() => Student, (student) => student.university, {
    cascade: ['insert', 'update'],
  }) // Shows which students goes to the university.
  @Field((type) => [Student])
  Students?: Student[];

  @OneToMany(() => Education, (education) => education.university, {
    cascade: ['insert', 'update'],
  }) // Shows what educations belongs to an university..
  @Field((type) => [Education])
  Educations?: Education[];
}
