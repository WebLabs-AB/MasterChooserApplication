import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TeacherResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
