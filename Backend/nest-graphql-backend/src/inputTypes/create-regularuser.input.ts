import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class createRegularuserInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;
}
