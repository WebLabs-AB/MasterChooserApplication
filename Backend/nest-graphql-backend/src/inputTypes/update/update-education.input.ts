import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateEducationInput {
  @Field()
  educationName: string;

  @Field()
  symbol: string;

  @Field()
  universityName: string; // Foreign key to university table.
}
