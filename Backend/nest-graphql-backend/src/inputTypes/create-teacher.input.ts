import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateTeacherInput {
  @IsEmail()
  @Field(() => String, { description: 'email of the teacher' })
  email: string;

  @Field(() => String, { description: 'password of the teacher' })
  password: string;

  @Field(() => String, { description: 'firstname of the teacher' })
  firstName: string;

  @Field(() => String, { description: 'lastname of the teacher' })
  lastName: string;
}
