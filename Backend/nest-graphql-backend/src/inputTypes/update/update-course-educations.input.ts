import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateCourseEducationsInput {
  @Field(() => String, { description: 'course Id of the course' })
  courseId: string;

  @Field(() => String, { description: 'education id of the education' })
  educationId: string;
}
