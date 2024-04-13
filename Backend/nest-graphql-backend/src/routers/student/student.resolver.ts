import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class StudentResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
