import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MasterProfileResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
