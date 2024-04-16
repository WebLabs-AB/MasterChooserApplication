import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateMainAreaInput {
  @Field()
  type: string;
}
