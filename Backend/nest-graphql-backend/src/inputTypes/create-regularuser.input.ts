import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber } from 'class-validator';

@InputType()
export class createRegularuserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @IsNumber()
  @Field((type) => Int)
  startingYear: number;
}
