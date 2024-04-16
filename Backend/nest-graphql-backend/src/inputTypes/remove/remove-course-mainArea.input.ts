import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class removeCourseMainAreaInput {
  @Field(() => String, { description: 'course Id of the course' })
  courseId: string;

  @Field(() => String, { description: 'name of main area' })
  mainAreaName: string;
}
