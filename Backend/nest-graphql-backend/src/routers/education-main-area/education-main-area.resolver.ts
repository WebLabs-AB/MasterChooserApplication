import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class EducationMainAreaResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
