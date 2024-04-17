import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PeriodService } from './period.service';
import { Period } from 'src/entities';
import { CreatePeriodInput } from 'src/inputTypes/create-period.input';
import { RemovePeriodInput } from 'src/inputTypes/create-period.input';

@Resolver()
export class PeriodResolver {
  constructor(private periodService: PeriodService) {}

  // Returns all CourseMainArea obejcts from database in a list.
  @Query((returns) => [Period])
  async period(): Promise<Period[]> {
    return this.periodService.findAll();
  }

  // Finds a period from the database.
  @Query((returns) => Period)
  async findOnePeriod(
    @Args('findOnePeriod')
    createPeriodInput: CreatePeriodInput,
  ): Promise<Period> {
    return this.periodService.findOnePeriod(createPeriodInput);
  }

  // Creates a new CourseMainArea object for the database
  @Mutation((returns) => Period)
  async createPeriod(
    @Args('createPeriodInput')
    createPeriodInput: CreatePeriodInput,
  ): Promise<Period> {
    return this.periodService.createPeriod(createPeriodInput);
  }

  // Removes a CourseMainArea object for the database
  @Mutation((returns) => Period)
  async removePeriod(
    @Args('removePeriodInput')
    removePeriodInput: RemovePeriodInput,
  ): Promise<Period> {
    return this.periodService.removePeriod(removePeriodInput);
  }
}
