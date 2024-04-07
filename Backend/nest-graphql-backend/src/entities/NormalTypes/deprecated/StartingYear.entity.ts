import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseStartingYears } from './CourseStartingYears.entity';

@Entity('StartingYear')
@ObjectType()
export class StartingYear extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => Int)
  startingYear: number;

  @OneToMany(
    () => CourseStartingYears,
    (courseToStartingYear) => courseToStartingYear.year,
    {
      cascade: true,
    },
  )
  public courseToStartingYear!: CourseStartingYears[];
}
