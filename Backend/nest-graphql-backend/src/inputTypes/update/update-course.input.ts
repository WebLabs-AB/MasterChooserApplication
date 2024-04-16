import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateCourseInput {
  @Field(() => String, { description: 'courseId of the course' })
  courseId: string;

  @Field(() => String, { description: 'courseName of the uscourseer' })
  courseName: string;

  @Field(() => String, { description: 'courseLink of the course' })
  courseLink: string;

  @Field(() => String, { description: 'teacher of the course' })
  teacherEmail: string; // Foreign key to teacher table.

  @Field(() => String, { description: 'university of the course' })
  universityName: string; // Foreign key to university table.
}
