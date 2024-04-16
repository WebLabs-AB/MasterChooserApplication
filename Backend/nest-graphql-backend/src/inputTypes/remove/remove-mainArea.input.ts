import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class removeMainAreaInput {
  @Field()
  type: string;
}
