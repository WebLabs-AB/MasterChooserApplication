import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { StartingYear } from 'src/entities/StartingYear.entity';
import { createStartingYearInput } from 'src/inputTypes/create-startingYear.input';
import { StartingYearService } from './starting-year.service';

@Resolver((of) => StartingYear)
export class StartingYearResolver {
  constructor(private startingYearService: StartingYearService) {}

  @Query((returns) => [StartingYear])
  async startingYears(): Promise<StartingYear[]> {
    return this.startingYearService.findAll();
  }

  @Mutation((returns) => StartingYear)
  async createNewStartingYear(
    @Args('createStartingYearInput')
    createStartingYearInput: createStartingYearInput,
  ): Promise<StartingYear> {
    return this.startingYearService.createStartingYear(createStartingYearInput);
  }
}
