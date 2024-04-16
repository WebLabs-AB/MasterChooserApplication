import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveMainAreaInput {
  @Field()
  type: string;
}
