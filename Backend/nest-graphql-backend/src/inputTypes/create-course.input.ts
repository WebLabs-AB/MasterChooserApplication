import { Field, InputType } from '@nestjs/graphql';

// Own files.
import { MainArea } from 'src/entities/NormalTypes/MainArea.entity';
import { Period } from 'src/entities/NormalTypes/Period.entity';
import { Teacher } from 'src/entities/NormalTypes/Teacher.entity';
import { University } from 'src/entities/NormalTypes/University.entity';

@InputType()
export class CreateCourseInput {
  @Field()
  courseId: string;

  @Field()
  courseName: string;

  @Field()
  courseLink: string;

  @Field()
  teacher: Teacher; // Foreign key to teacher table.

  @Field()
  university: University; // Foreign key to university table.

  @Field()
  period: Period; // In ManyToMany relationship.

  @Field()
  mainArea: MainArea; // In ManyToMany relationship.
}
