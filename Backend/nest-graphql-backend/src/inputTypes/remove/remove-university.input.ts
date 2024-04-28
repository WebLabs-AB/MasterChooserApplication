import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveUniversityInput {
  @Field()
  name: string;
}
