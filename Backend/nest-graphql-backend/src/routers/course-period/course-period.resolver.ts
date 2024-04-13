import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class CoursePeriodResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
