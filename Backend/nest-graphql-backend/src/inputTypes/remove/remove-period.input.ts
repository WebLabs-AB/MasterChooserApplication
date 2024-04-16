import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class removePeriodInput {
  @Field((type) => Int)
  value: number;
}
