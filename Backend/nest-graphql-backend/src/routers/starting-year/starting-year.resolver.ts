import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StartingYearService } from './starting-year.service';
import { StartingYear } from 'src/entities';
import { CreateStartingYearInput } from 'src/inputTypes/create/create-startingYear.input';
import { RemoveStartingYearInput } from 'src/inputTypes/remove/remove-startingYear.input';

@Resolver()
export class StartingYearResolver {
  constructor(private startingYearService: StartingYearService) {}

  // Returns all CourseMainArea obejcts from database in a list.
  @Query((returns) => [StartingYear])
  async startingYear(): Promise<StartingYear[]> {
    return this.startingYearService.findAll();
  }

  // Finds a startingYear from the database.
  @Query((returns) => StartingYear)
  async findOneStartingYear(
    @Args('findOneStartingYear')
    createStartingYearInput: CreateStartingYearInput,
  ): Promise<StartingYear> {
    return this.startingYearService.findOneStartingYear(
      createStartingYearInput,
    );
  }

  // Creates a new CourseMainArea object for the database
  @Mutation((returns) => StartingYear)
  async createStartingYear(
    @Args('createStartingYearInput')
    createStartingYearInput: CreateStartingYearInput,
  ): Promise<StartingYear> {
    return this.startingYearService.createStartingYear(createStartingYearInput);
  }

  // Removes a CourseMainArea object for the database
  @Mutation((returns) => StartingYear)
  async removeStartingYear(
    @Args('removeStartingYearInput')
    removeStartingYearInput: RemoveStartingYearInput,
  ): Promise<StartingYear> {
    return this.startingYearService.removeStartingYear(removeStartingYearInput);
  }
}
