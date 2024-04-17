import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEducationInput {
  @Field()
  educationName: string;

  @Field()
  symbol: string;

  @Field()
  universityName: string; // Foreign key to university table.
}
