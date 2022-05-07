import { Entity, BaseEntity, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('University')
@ObjectType()
export class University extends BaseEntity {
  @PrimaryColumn()
  @Field()
  universityName: string;
}
