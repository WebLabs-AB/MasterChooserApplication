import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('GeneralRequirements')
@ObjectType()
export class GeneralRequirements extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  A1XHp: number;

  @Field((type) => Int)
  MainAreaHp: number;
}
