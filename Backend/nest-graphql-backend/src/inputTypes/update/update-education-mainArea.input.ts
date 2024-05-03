import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateEducationMainAreaInput {
  @Field(() => String, { description: 'name of main area' })
  mainAreaName: string;

  @Field(() => String, { description: 'education id of the education' })
  educationId: string[];
}
