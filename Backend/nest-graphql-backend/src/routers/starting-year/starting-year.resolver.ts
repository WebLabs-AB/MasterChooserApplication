import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class StartingYearResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
