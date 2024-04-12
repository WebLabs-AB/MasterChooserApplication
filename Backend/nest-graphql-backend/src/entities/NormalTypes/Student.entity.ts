import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { User } from './User.entity';
import { MasterSchema } from './MasterSchema.entity';
import { University } from './University.entity';
import { Education } from './Education.entity';
import { StartingYear } from './StartingYear.entity';

/**
 * Represents a student, which is one type of extended user.
 * A student studies a specific education at a university, and
 * wants to plan what master courses to study.
 */
@Entity('Student')
@ObjectType()
export class Student extends User {
  /**
   * Represents the number of MasterSchemas a student has created.
   * This is a one-to-many relationship, indicating that a student can be associated with multiple MasterSchemas.
   * The 'eager: true' option automatically loads the MasterSchema entities when the student is queried.
   * The 'cascade: true' option indicates that operations like persist and remove will cascade to the related MasterSchema entities.
   * This relationship is exposed as a nullable GraphQL field, allowing it to be omitted in queries.
   */
  @OneToMany(() => MasterSchema, (masterSchema) => masterSchema.student, {
    eager: true,
    cascade: true,
  })
  @Field((type) => [MasterSchema], { nullable: true })
  MasterSchemas?: MasterSchema[];

  /**
   * Represents that a Student can only go to one University.
   * This is a many-to-one relationship where each Student references one University.
   * The 'eager: true' option automatically loads the University entity when the Student is queried.
   * The 'onDelete: "CASCADE"' option means that deleting the University will result in the deletion of related Students.
   * The 'JoinColumn' decorator specifies 'university_id' as the foreign key in the database.
   */
  @ManyToOne(() => University, (university) => university.Students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => University)
  @JoinColumn({ name: 'university_id' })
  university: University;

  /**
   * Represents that a Student can only study one Education.
   * This is a many-to-one relationship where each Student is linked to one Education.
   * The 'eager: true' option ensures the Education entity is loaded automatically when the Student is fetched.
   * The 'onDelete: "CASCADE"' option will delete the Student records when the associated Education is deleted.
   * The 'JoinColumn' decorator indicates 'education_id' as the foreign key column.
   */
  @ManyToOne(() => Education, (education) => education.Students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => Education)
  @JoinColumn({ name: 'education_id' })
  education: Education;

  /**
   * Represents that a Student can only start studying a specific year.
   * In this many-to-one relationship, each Student is linked to one StartingYear.
   * The 'eager: true' option causes the StartingYear entity to be fetched immediately when querying the Student.
   * The 'onDelete: "CASCADE"' option ensures that if the StartingYear is deleted, the linked Student will also be removed.
   * The 'JoinColumn' decorator specifies 'year' as the foreign key in the Student's table.
   */
  @ManyToOne(() => StartingYear, (startingYear) => startingYear.Students, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => StartingYear)
  @JoinColumn({ name: 'year' })
  year: StartingYear;
}
