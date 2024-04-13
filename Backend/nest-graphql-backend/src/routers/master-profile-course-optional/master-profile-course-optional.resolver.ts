import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MasterProfileCourseOptionalResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
