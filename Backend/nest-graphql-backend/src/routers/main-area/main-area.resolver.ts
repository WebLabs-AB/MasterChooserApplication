import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainArea } from 'src/entities/NormalTypes/MainArea.entity';
import { CreateMainAreaInput } from 'src/inputTypes/create-mainArea.input';

// Own files.
import { MainAreaService } from './main-area.service';

@Resolver((of) => MainArea)
export class MainAreaResolver {
  constructor(private mainAreaService: MainAreaService) {}

  // Query that returns all educations from the database.
  @Query((returns) => [MainArea]) // Returns an array of educations.
  async mainareas(): Promise<MainArea[]> {
    return this.mainAreaService.findAll();
  }

  @Mutation((returns) => MainArea)
  async createNewMainArea(
    @Args('createMainAreaInput') createMainAreaInput: CreateMainAreaInput,
  ): Promise<MainArea> {
    return this.mainAreaService.createMainArea(createMainAreaInput);
  }
}
