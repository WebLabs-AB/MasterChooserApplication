import { Entity, BaseEntity, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity('StartingYear')
@ObjectType()
export class StartingYear extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => Int)
  startingYear: number;
}
