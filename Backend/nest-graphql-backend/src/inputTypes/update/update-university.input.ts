import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateUniversityInput {
  @Field()
  universityName: string;
}
