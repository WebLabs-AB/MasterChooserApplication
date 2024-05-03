import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EducationMainAreaService } from './education-main-area.service';
import { EducationMainArea } from 'src/entities';
import { CreateEducationMainAreaInput } from 'src/inputTypes/create/create-education-mainArea.input';
import { RemoveEducationMainAreaInput } from 'src/inputTypes/remove/remove-education-mainArea.input';

@Resolver()
export class EducationMainAreaResolver {
  constructor(private educationMainAreaService: EducationMainAreaService) {}

  // Returns all CourseMainArea obejcts from the database in a list.
  @Query((returns) => [EducationMainArea])
  async courseMainArea(): Promise<EducationMainArea[]> {
    return this.educationMainAreaService.findAll();
  }

  // Creates a new CourseMainArea object for the database.
  @Mutation((returns) => EducationMainArea)
  async createEducationMainArea(
    @Args('createEducationMainAreaInput')
    createEducationMainAreaInput: CreateEducationMainAreaInput,
  ): Promise<EducationMainArea> {
    return this.educationMainAreaService.createEducationMainArea(
      createEducationMainAreaInput,
    );
  }

  // Removes a CourseMainArea object from the database.
  @Mutation((returns) => EducationMainArea)
  async removeEducationMainArea(
    @Args('removeEducationMainAreaInput')
    removeEducationMainAreaInput: RemoveEducationMainAreaInput,
  ): Promise<EducationMainArea> {
    return this.educationMainAreaService.removeEducationMainArea(
      removeEducationMainAreaInput,
    );
  }

  // Return all main areas that belong to a specific education.
  @Query((returns) => [EducationMainArea])
  async educationFromMainArea(
    @Args('mainAreaName') mainAreaName: string,
  ): Promise<EducationMainArea[]> {
    return this.educationMainAreaService.educationFromMainArea(mainAreaName);
  }
}
