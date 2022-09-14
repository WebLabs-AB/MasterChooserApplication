import { Entity, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CourseToStartingYear } from './CourseToStartingYear.entity';

@Entity('StartingYear')
@ObjectType()
export class StartingYear extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => Int)
  startingYear: number;

  @OneToMany(
    () => CourseToStartingYear,
    (courseToStartingYear) => courseToStartingYear.startingYear,
    {
      cascade: true,
    },
  )
  public courseToStartingYear!: CourseToStartingYear[];
}
