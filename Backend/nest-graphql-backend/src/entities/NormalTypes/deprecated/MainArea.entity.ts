import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CourseMainAreas } from './CourseMainAreas.entity';

@Entity('MainArea')
@ObjectType()
export class MainArea extends BaseEntity {
  @PrimaryColumn()
  @Field()
  type: string;

  @OneToMany(() => CourseMainAreas, (courseMainArea) => courseMainArea.type)
  public courseConnection: CourseMainAreas[];
}
