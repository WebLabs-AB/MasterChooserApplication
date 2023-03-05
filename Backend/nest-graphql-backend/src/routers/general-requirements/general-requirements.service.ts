import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { GeneralRequirements } from 'src/entities';
import { CreateGeneralRequirementsInput } from 'src/inputTypes/create-general-requirements.input';
import { Repository } from 'typeorm';
import { UniversityService } from '../university/university.service';

@Injectable()
export class GeneralRequirementsService {
  constructor(
    @InjectRepository(GeneralRequirements)
    private generalRequirementsRepository: Repository<GeneralRequirements>,
    private universityService: UniversityService,
  ) {}

  // Creates a new general requirement for an university and saves it in the database.
  async createGeneralRequirement(
    createGeneralRequirementsInput: CreateGeneralRequirementsInput,
  ): Promise<GeneralRequirements> {
    if (
      await this.doesGeneralRequirementsExists(
        createGeneralRequirementsInput.universityName,
      )
    ) {
      throw new UserInputError(
        'General requirement already exists for' +
          createGeneralRequirementsInput.universityName,
      );
    }

    const newGeneralRequirements = this.generalRequirementsRepository.create(
      createGeneralRequirementsInput,
    );

    const university = await this.universityService.findOne(
      createGeneralRequirementsInput.universityName,
    );

    newGeneralRequirements.university = university; // Set foreign key.
    return this.generalRequirementsRepository.save(newGeneralRequirements);
  }

  // Finds a specific general requirement or null.
  async findOne(universityName: string): Promise<GeneralRequirements> {
    return this.generalRequirementsRepository.findOne({
      where: { universityName: universityName },
    });
  }

  // Find all general requirements for all universities.
  async findAll(): Promise<GeneralRequirements[]> {
    return this.generalRequirementsRepository.find();
  }

  // Finds a specific general requirement and deletes it.
  async deleteGeneralRequirements(
    universityName: string,
  ): Promise<GeneralRequirements> {
    const generalRequirements =
      await this.generalRequirementsRepository.findOne({
        where: { universityName: universityName },
      });

    if (generalRequirements) {
      await this.generalRequirementsRepository.delete(universityName);
      return generalRequirements;
    } else {
      throw new UserInputError(
        'No general requirement found for that university',
      );
    }
  }

  // Checks if a general requirement exists from university name.
  async doesGeneralRequirementsExists(
    universityName: string,
  ): Promise<boolean> {
    const generalRequirement = await this.generalRequirementsRepository.findOne(
      {
        where: { universityName: universityName },
      },
    );

    if (!generalRequirement) {
      return false;
    } else {
      return true;
    }
  }
}
