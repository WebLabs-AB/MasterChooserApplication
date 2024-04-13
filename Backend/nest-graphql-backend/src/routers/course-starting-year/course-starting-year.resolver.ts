import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CourseStartingYearResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
