import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainAreaService } from './main-area.service';
import { MainArea } from 'src/entities';
import { CreateMainAreaInput } from 'src/inputTypes/create/create-mainArea.input';
import { RemoveMainAreaInput } from 'src/inputTypes/remove/remove-mainArea.input';

@Resolver()
export class MainAreaResolver {
  constructor(private mainAreaService: MainAreaService) {}

  // Returns all CourseMainArea obejcts from database in a list.
  @Query((returns) => [MainArea])
  async mainArea(): Promise<MainArea[]> {
    return this.mainAreaService.findAll();
  }

  // Finds a mainArea from the database.
  @Query((returns) => MainArea)
  async findOneMainArea(
    @Args('findOneMainArea')
    createMainAreaInput: CreateMainAreaInput,
  ): Promise<MainArea> {
    return this.mainAreaService.findOneMainArea(createMainAreaInput);
  }

  // Creates a new CourseMainArea object for the database
  @Mutation((returns) => MainArea)
  async createMainArea(
    @Args('createMainAreaInput')
    createMainAreaInput: CreateMainAreaInput,
  ): Promise<MainArea> {
    return this.mainAreaService.createMainArea(createMainAreaInput);
  }

  // Removes a CourseMainArea object for the database
  @Mutation((returns) => MainArea)
  async removeMainArea(
    @Args('removeMainAreaInput')
    removeMainAreaInput: RemoveMainAreaInput,
  ): Promise<MainArea> {
    return this.mainAreaService.removeMainArea(removeMainAreaInput);
  }
}
