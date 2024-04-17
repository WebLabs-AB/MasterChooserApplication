import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMainAreaInput {
  @Field()
  type: string;
}
