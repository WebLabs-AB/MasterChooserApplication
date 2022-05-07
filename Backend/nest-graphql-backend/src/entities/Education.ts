import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
  @PrimaryColumn()
  @Field()
  educationName: string;

  @Column()
  @Field()
  symbol: string;
}
