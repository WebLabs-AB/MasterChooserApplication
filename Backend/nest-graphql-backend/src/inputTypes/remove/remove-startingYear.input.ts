import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class removeStartingYearInput {
  @IsNumber()
  @Field((type) => Int)
  startingYear: number;
}
