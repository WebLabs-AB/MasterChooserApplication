import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class PeriodResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
