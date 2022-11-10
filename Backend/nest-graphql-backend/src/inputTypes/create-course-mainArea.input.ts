import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCourseMainAreasInput {
  @Field(() => String, { description: 'course Id of the course' })
  courseId: string;

  @Field(() => String, { description: 'type of main area' })
  type: string;
}
