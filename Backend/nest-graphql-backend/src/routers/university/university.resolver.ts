import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';

// Own files.
import { University } from 'src/entities/University.entity';
import { CreateUniversityInput } from 'src/inputTypes/create-university.input';
import { UniversityService } from './university.service';

@Resolver((of) => University)
export class UniversityResolver {
  constructor(private universityService: UniversityService) {}

  // Query that returns all universities from the database.
  @Query((returns) => [University]) // Returns an array of universities.
  async universities(): Promise<University[]> {
    return this.universityService.findAll();
  }

  // Query that finds on university from the database.
  @Query(() => University, {})
  async findOne(@Args('universityName') universityName: string) {
    return this.universityService.findOne(universityName);
  }

  @Mutation((returns) => University)
  async createNewUniversity(
    @Args('createUniversityInput') createUniversityInput: CreateUniversityInput,
  ): Promise<University> {
    return this.universityService.createUniversity(createUniversityInput);
  }
}
