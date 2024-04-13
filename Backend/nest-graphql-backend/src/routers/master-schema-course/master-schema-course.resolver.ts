import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MasterSchemaCourseResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
