import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EducationMainAreaService } from './education-main-area.service';
import { EducationMainArea } from 'src/entities';
import { CreateEducationMainAreaInput } from 'src/inputTypes/create/create-education-mainArea.input';
import { RemoveEducationMainAreaInput } from 'src/inputTypes/remove/remove-education-mainArea.input';
import { UpdateEducationMainAreaInput } from 'src/inputTypes/update/update-education-mainArea.input';

@Resolver()
export class EducationMainAreaResolver {
  constructor(private educationMainAreaService: EducationMainAreaService) {}

  // Returns all EducationMainArea obejcts from the database in a list.
  @Query((returns) => [EducationMainArea])
  async educationMainArea(): Promise<EducationMainArea[]> {
    return this.educationMainAreaService.findAll();
  }

  // Creates a new EducationMainArea object for the database.
  @Mutation((returns) => EducationMainArea)
  async createEducationMainArea(
    @Args('createEducationMainAreaInput')
    createEducationMainAreaInput: CreateEducationMainAreaInput,
  ): Promise<EducationMainArea> {
    return this.educationMainAreaService.createEducationMainArea(
      createEducationMainAreaInput,
    );
  }

  // Removes a EducationMainArea object from the database.
  @Mutation((returns) => EducationMainArea)
  async removeEducationMainArea(
    @Args('removeEducationMainAreaInput')
    removeEducationMainAreaInput: RemoveEducationMainAreaInput,
  ): Promise<EducationMainArea> {
    return this.educationMainAreaService.removeEducationMainArea(
      removeEducationMainAreaInput,
    );
  }

  // Updates a EducationMainArea object from the database.
  @Mutation((returns) => EducationMainArea)
  async updateEducationMainArea(
    @Args('updateEducationMainAreaInput')
    updateEducationMainAreaInput: UpdateEducationMainAreaInput,
  ): Promise<EducationMainArea[]> {
    return this.educationMainAreaService.updateEducationMainArea(
      updateEducationMainAreaInput,
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
