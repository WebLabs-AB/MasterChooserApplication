import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMainAreaInput {
  @Field()
  type: string;
}
