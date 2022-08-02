import {
  Mutation,
  Args,
  Resolver,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

// Own files.
import { Education } from 'src/entities/Education.entity';
import { EducationService } from './education.service';
import { createEducationInput } from 'src/inputTypes/create-education.input';
import { University } from 'src/entities/University.entity';

@Resolver((of) => Education)
export class EducationResolver {
  constructor(private educationService: EducationService) {}

  // Query that returns all educations from the database.
  @Query((returns) => [Education]) // Returns an array of educations.
  async educations(): Promise<Education[]> {
    return this.educationService.findAll();
  }

  // Query that returns all educations that belongs to a specific university..
  @Query((returns) => [Education]) // Returns an array of educations.
  async educationFromUniversity(
    @Args('universityName') universityName: string,
  ): Promise<Education[]> {
    return this.educationService.findEducationFromUniversity(universityName);
  }

  @ResolveField((returns) => University) // Used to find what university the education belongs to.
  async university(@Parent() education: Education): Promise<University> {
    return this.educationService.getUniversity(education.universityName);
  }

  @Mutation((returns) => Education)
  async createNewEducation(
    @Args('createEducationInput') createEducationInput: createEducationInput,
  ): Promise<Education> {
    return this.educationService.createEducation(createEducationInput);
  }
}
