import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RemoveCourseStartingYearsInput {
  @Field(() => String, { description: 'course Id of the course' })
  courseId: string;

  @Field((type) => Int, { description: 'year the course is being taught' })
  yearTaught: number;

  @Field((type) => Int, { description: 'hp of the course' })
  hp: number;

  @Field(() => String, { description: 'level of the course' })
  level: string;

  @Field(() => String, { description: 'schema block of the course' })
  schemaBlock: string;
}
