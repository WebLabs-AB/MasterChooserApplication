import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class MasterSchemaResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
