import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Admin } from './Admin.entity';
import { Education } from './Education.entity';
import { Student } from './Student.entity';

/**
 * Represents an university, which offers courses for students.
 */
@Entity('University')
@ObjectType()
export class University extends BaseEntity {
  /**
   * ID of the university, which is used to uniquely
   * identify a university.
   */
  @PrimaryColumn({ name: 'university_id' })
  @Field((type) => Int)
  universityId: number;

  /**
   * Name of the university.
   */
  @Column()
  @Field()
  name: string;

  /**
   * Optional collection of Admin entities associated with the university.
   * Defines a one-to-many relationship between an admin and an university, with cascading operations enabled
   * which indicates that changes to the university will cascade to its Admins.
   */
  @OneToMany(() => Admin, (admin) => admin.university, { cascade: true })
  @Field((type) => [Admin], { nullable: true })
  public Admins?: Admin[];

  /**
   * A list of Education entities linked to this university.
   * This is a one-to-many relationship set to load eagerly and cascade persist and remove operations.
   * It can be null if no Education entities are associated with the university.
   */
  @OneToMany(() => Education, (education) => education.university, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [Education], { nullable: true })
  Educations?: Education[];

  @OneToMany(() => Student, (student) => student.university, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];
}
