import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePeriodInput {
  @Field((type) => Int)
  value: number;
}
