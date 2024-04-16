import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemovePeriodInput {
  @Field((type) => Int)
  value: number;
}
