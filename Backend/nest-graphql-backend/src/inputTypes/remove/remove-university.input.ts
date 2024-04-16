import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class removeUniversityInput {
  @Field()
  universityName: string;
}
