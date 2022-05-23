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

  @Field()
  universityName: string; // Foreign key to university table.

  @Field()
  educationName: string; // Foreign key to education table.
}
