import { Mutation, Args, Resolver, Query } from '@nestjs/graphql';

// Own files.
import { Education } from 'src/entities/Education';
import { EducationService } from './education.service';
import { createEducationInput } from 'src/inputTypes/create-education.input';

@Resolver((of) => Education)
export class EducationResolver {
  constructor(private educationService: EducationService) {}

  // Query that returns all educations from the database.
  @Query((returns) => [Education]) // Returns an array of educations.
  educations(): Promise<Education[]> {
    return this.educationService.findAll();
  }

  @Mutation((returns) => Education)
  createNewEducation(
    @Args('createEducationInput') createEducationInput: createEducationInput,
  ): Promise<Education> {
    return this.educationService.createEducation(createEducationInput);
  }
}
