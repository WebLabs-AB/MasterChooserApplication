import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createUniversityInput {
  @Field()
  universityName: string;
}
