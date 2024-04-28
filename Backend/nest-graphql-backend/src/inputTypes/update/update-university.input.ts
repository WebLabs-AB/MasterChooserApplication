import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUniversityInput {
  @Field()
  name: string;
}
