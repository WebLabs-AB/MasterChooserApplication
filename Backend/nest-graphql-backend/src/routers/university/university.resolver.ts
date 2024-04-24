import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UniversityService } from './university.service';
import { University } from 'src/entities';
import { CreateUniversityInput } from 'src/inputTypes/create/create-university.input';
import { RemoveUniversityInput } from 'src/inputTypes/remove/remove-university.input';

@Resolver()
export class UniversityResolver {
  constructor(private universityService: UniversityService) {}

  // Returns all university obejcts from database in a list.
  @Query((returns) => [University])
  async university(): Promise<University[]> {
    return this.universityService.findAll();
  }

  // Finds a university from the database.
  @Query((returns) => University)
  async findOneUniversity(
    @Args('findOneUniversity')
    createUniversityInput: CreateUniversityInput,
  ): Promise<University> {
    return this.universityService.findOneUniversity(createUniversityInput);
  }

  // Creates a new university object for the database
  @Mutation((returns) => University)
  async createUniversity(
    @Args('createUniversityInput')
    createUniversityInput: CreateUniversityInput,
  ): Promise<University> {
    return this.universityService.createUniversity(createUniversityInput);
  }

  // Removes a university object for the database
  @Mutation((returns) => University)
  async removeUniversity(
    @Args('removeUniversityInput')
    removeUniversityInput: RemoveUniversityInput,
  ): Promise<University> {
    return this.universityService.removeUniversity(removeUniversityInput);
  }
}
