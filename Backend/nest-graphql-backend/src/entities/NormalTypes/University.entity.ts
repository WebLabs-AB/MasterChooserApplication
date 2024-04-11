import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Admin } from './Admin.entity';

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
}
