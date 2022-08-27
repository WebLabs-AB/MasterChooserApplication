import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Education } from 'src/entities/NormalTypes/Education.entity';

// Own files.
import { RegularUser } from 'src/entities/NormalTypes/RegularUser.entity';
import { University } from 'src/entities/NormalTypes/University.entity';
import { CreateRegularuserInput } from 'src/inputTypes/create-regularuser.input';
import { RegularuserService } from './regularuser.service';

@Resolver((of) => RegularUser)
export class RegularuserResolver {
  constructor(private regularuserService: RegularuserService) {}

  // Query that returns all regularusers from the database.
  @Query((returns) => [RegularUser]) // Returns an array of regularusers.
  async regularusers(): Promise<RegularUser[]> {
    return this.regularuserService.findAll();
  }

  // Query that returns if an regularuser exists in the database.
  @Query((returns) => RegularUser)
  async getRegularuser(@Args('email') email: string): Promise<RegularUser> {
    return this.regularuserService.findOne(email);
  }

  @ResolveField((returns) => University) // Used to find what university a student goes to.
  async university(@Parent() regularuser: RegularUser): Promise<University> {
    return this.regularuserService.getUniversity(regularuser.universityName);
  }

  @ResolveField((returns) => Education) // Used to find what education a student studies.
  async education(@Parent() regularuser: RegularUser): Promise<Education> {
    return this.regularuserService.getEducation(regularuser.educationName);
  }

  @Mutation((returns) => RegularUser)
  async createNewRegularuser(
    @Args('createRegularuserInput')
    createRegularuserInput: CreateRegularuserInput,
  ): Promise<RegularUser> {
    return this.regularuserService.createRegularuser(createRegularuserInput);
  }
}
