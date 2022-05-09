import {
  Mutation,
  Args,
  Resolver,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

// Own files.
import { Education } from 'src/entities/Education';
import { EducationService } from './education.service';
import { createEducationInput } from 'src/inputTypes/create-education.input';
import { University } from 'src/entities/University';

@Resolver((of) => Education)
export class EducationResolver {
  constructor(private educationService: EducationService) {}

  // Query that returns all educations from the database.
  @Query((returns) => [Education]) // Returns an array of educations.
  educations(): Promise<Education[]> {
    return this.educationService.findAll();
  }

  @ResolveField((returns) => University) // Used to find what university the education belongs to.
  university(@Parent() education: Education): Promise<University> {
    return this.educationService.getUniversity(education.universityName);
  }

  @Mutation((returns) => Education)
  createNewEducation(
    @Args('createEducationInput') createEducationInput: createEducationInput,
  ): Promise<Education> {
    return this.educationService.createEducation(createEducationInput);
  }
}
