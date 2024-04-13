import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class EducationResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
