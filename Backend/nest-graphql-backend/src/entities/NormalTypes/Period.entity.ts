import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('Period')
@ObjectType()
export class Period extends BaseEntity {
  @PrimaryColumn()
  @Field((type) => Int)
  value: number;
}
