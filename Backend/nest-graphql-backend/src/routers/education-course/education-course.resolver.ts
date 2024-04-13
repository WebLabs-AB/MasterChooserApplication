import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class EducationCourseResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
