import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Period } from 'src/entities/NormalTypes/Period.entity';
import { CreatePeriodInput } from 'src/inputTypes/create-period.input';
import { PeriodService } from './period.service';

@Resolver((of) => Period)
export class PeriodResolver {
  constructor(private periodService: PeriodService) {}

  // Query that returns all educations from the database.
  @Query((returns) => [Period]) // Returns an array of periods.
  async periods(): Promise<Period[]> {
    return this.periodService.findAll();
  }

  @Mutation((returns) => Period)
  async createNewPeriod(
    @Args('createPeriodInput') createPeriodInput: CreatePeriodInput,
  ): Promise<Period> {
    return this.periodService.createPeriod(createPeriodInput);
  }
}
