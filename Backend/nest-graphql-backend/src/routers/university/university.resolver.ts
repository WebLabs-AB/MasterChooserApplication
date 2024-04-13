import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class UniversityResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
