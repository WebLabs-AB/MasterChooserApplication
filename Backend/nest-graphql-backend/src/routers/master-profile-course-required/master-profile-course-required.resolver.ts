import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MasterProfileCourseRequiredResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
