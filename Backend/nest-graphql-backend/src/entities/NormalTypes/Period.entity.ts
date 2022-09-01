import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('Period')
@ObjectType()
export class Period extends BaseEntity {
  @PrimaryColumn()
  @Field()
  value: string;
}
