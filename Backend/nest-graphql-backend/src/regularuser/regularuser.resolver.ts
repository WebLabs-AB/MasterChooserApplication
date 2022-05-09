import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

// Own files.
import { RegularUser } from 'src/entities/RegularUser';
import { University } from 'src/entities/University';
import { createRegularuserInput } from 'src/inputTypes/create-regularuser.input';
import { RegularuserService } from './regularuser.service';

@Resolver((of) => RegularUser)
export class RegularuserResolver {
  constructor(private regularuserService: RegularuserService) {}

  // Query that returns all regularusers from the database.
  @Query((returns) => [RegularUser]) // Returns an array of regularusers.
  async regularusers(): Promise<RegularUser[]> {
    return this.regularuserService.findAll();
  }

  @ResolveField((returns) => University) // Used to find what university a student goes to.
  async university(@Parent() regularuser: RegularUser): Promise<University> {
    return this.regularuserService.getUniversity(regularuser.universityName);
  }

  @Mutation((returns) => RegularUser)
  async createNewRegularuser(
    @Args('createRegularuserInput')
    createRegularuserInput: createRegularuserInput,
  ): Promise<RegularUser> {
    return this.regularuserService.createRegularuser(createRegularuserInput);
  }
}
