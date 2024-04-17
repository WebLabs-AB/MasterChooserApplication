import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCourseMainAreaInput {
  @Field(() => String, { description: 'course Id of the course' })
  courseId: string;

  @Field(() => String, { description: 'list with main area names' })
  mainAreaNames: string[];
}
