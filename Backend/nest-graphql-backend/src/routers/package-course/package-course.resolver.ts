import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PackageCourseResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
