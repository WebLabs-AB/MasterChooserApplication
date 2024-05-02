import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemoveCourseStartingYearsInput {
  @Field(() => String, { description: 'course Id of the course' })
  courseId: string;

  @Field((type) => Int, { description: 'starting year for the course' })
  startYear: number;

  @Field((type) => Int, { description: 'level of the course' })
  level: number;

  @Field((type) => Int, { description: 'schema block of the course' })
  schemaBlock: number;
}
