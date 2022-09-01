import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

@Entity('MainArea')
@ObjectType()
export class MainArea extends BaseEntity {
  @PrimaryColumn()
  @Field()
  type: string;
}
