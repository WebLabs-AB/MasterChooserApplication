import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GeneralRequirements } from 'src/entities';
import { CreateGeneralRequirementsInput } from 'src/inputTypes/create-general-requirements.input';
import { GeneralRequirementsService } from './general-requirements.service';

@Resolver()
export class GeneralRequirementsResolver {
  constructor(private generalRequirementsService: GeneralRequirementsService) {}

  // Query that returns all general requirements from the database.
  @Query((returns) => [GeneralRequirements])
  async generalRequirements(): Promise<GeneralRequirements[]> {
    return this.generalRequirementsService.findAll();
  }

  // Query that finds a general requirement from the database.
  @Query(() => GeneralRequirements, {})
  async findOne(@Args('universityName') universityName: string) {
    return this.generalRequirementsService.findOne(universityName);
  }

  // Query that finds an university from the database and deletes it.
  @Mutation((returns) => GeneralRequirements)
  async deleteGeneralRequirements(
    @Args('universityName') universityName: string,
  ) {
    return this.generalRequirementsService.deleteGeneralRequirements(
      universityName,
    );
  }

  @Mutation((returns) => GeneralRequirements)
  async createNewGeneralRequirement(
    @Args('createGeneralRequirementsInput')
    createGeneralRequirementsInput: CreateGeneralRequirementsInput,
  ): Promise<GeneralRequirements> {
    return this.generalRequirementsService.createGeneralRequirement(
      createGeneralRequirementsInput,
    );
  }
}
