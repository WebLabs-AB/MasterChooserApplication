import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createEducationInput {
  @Field()
  educationName: string;

  @Field()
  symbol: string;
}
