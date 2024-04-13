import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
   * UUID of the university, which is auto-generated, which uniquely identifies the university.
   */
  @PrimaryGeneratedColumn('uuid', { name: 'university_id' })
  @Field()
  universityId: string;

  /**
   * Name of the university.
   */
  @Column()
  @Field()
  name: string;

  /**
   * This is an one-to-many relationship where multiple admins are associated to one university.
   * The 'cascade: true' option ensures that operations like updates and deletions on the University entity are also
   * applied to the its related Admins.
   */
  @OneToMany(() => Admin, (admin) => admin.university, { cascade: true })
  @Field((type) => [Admin], { nullable: true })
  public Admins?: Admin[];

  /**
   * This is an one-to-many relationship where multiple educations are associated to one university.
   * The 'eager: true' option ensures the Education entity is loaded automatically when the Student is University.
   * The 'cascade: true' option ensures that operations like updates and deletions on the University entity are also
   * applied to the its related Education.
   */
  @OneToMany(() => Education, (education) => education.university, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [Education], { nullable: true })
  Educations?: Education[];

  /**
   * This is an one-to-many relationship where multiple students are associated to one university.
   * The one-to-many relationship comes with cascade options, implying that persisting or removing a University entity will affect its Students.
   * The 'cascade: true' option ensures that operations like updates and deletions on the University entity are also
   * applied to the its related Education
   */
  @OneToMany(() => Student, (student) => student.university, {
    cascade: true,
  })
  @Field((type) => [Student], { nullable: true })
  Students?: Student[];
}
