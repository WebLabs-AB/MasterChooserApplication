import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class createStartingYearInput {
  @IsNumber()
  @Field((type) => Int)
  startingYear: number;
}
