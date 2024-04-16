import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class removeCoursePeriodsInput {
  @Field(() => String, { description: 'course Id of the course' })
  courseId: string;

  @Field((type) => Int, { description: 'value of the period' })
  periodValue: number;
}
