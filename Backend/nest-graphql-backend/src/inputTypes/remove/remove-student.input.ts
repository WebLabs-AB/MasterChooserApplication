import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber } from 'class-validator';

@InputType()
export class removeStudentInput {
  @IsEmail()
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @Field(() => String, { description: 'password of the user' })
  password: string;

  @IsNumber()
  @Field((type) => Int, { description: 'starting year of the user' })
  startingYear: number;

  @Field(() => String, { description: 'university of the user' })
  universityName: string; // Foreign key to university table.

  @Field(() => String, { description: 'education of the user' })
  educationName: string; // Foreign key to education table.
}
