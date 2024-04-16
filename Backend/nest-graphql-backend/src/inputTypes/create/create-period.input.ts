import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreatePeriodInput {
  @Field((type) => Int)
  value: number;
}
