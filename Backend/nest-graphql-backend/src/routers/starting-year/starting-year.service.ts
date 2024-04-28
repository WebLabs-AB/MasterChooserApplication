import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StartingYear } from 'src/entities';
import { CreateStartingYearInput } from 'src/inputTypes/create/create-startingYear.input';
import { RemoveStartingYearInput } from 'src/inputTypes/remove/remove-startingYear.input';
import { UpdateStartingYearInput } from 'src/inputTypes/update/update-startingYear.input';
import { Repository } from 'typeorm';

@Injectable()
export class StartingYearService {
  constructor(
    @InjectRepository(StartingYear)
    private startingYearRepository: Repository<StartingYear>,
  ) {}

  /**
   * Description: Finds all StartingYear objects in the database
   * Input: Null
   * @returns All StartingYear objects
   */
  async findAll(): Promise<StartingYear[]> {
    return this.startingYearRepository.find(); // SELECT * FROM coursemainareas;
  }

  /**
   * Description: Creates a new startingYear entity in the database.
   * Input: startingYear
   * @param createStartingYearInput An object containing the information needed to
   * create a new startingYear.
   * @returns A Promise that resolves to the created startingYear entity.
   */
  async createStartingYear(
    createStartingYearInput: CreateStartingYearInput,
  ): Promise<StartingYear> {
    if (await this.doesStartingYearExists(createStartingYearInput.year)) {
      throw new HttpException(
        'Starting year already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newStartingYear = this.startingYearRepository.create(
      createStartingYearInput,
    );
    return this.startingYearRepository.save(newStartingYear);
  }

  /**
   * Description: Finds a startingYear entity in the database based on the provided input.
   * @param updateStartingYearInput An object containing the value of the startingYear to find.
   * @returns A Promise that resolves to the found startingYear entity, if it exists.
   */
  async findOneStartingYear(
    updateStartingYearInput: UpdateStartingYearInput,
  ): Promise<StartingYear> {
    // Check if StartingYear exists in the database
    return this.startingYearRepository.findOne({
      where: { year: updateStartingYearInput.year },
    });
  }

  /**
   * Description: Removes a startingYear entity from the database.
   * @param removeStartingYearInput An object containing the value of the startingYear to be removed.
   * @returns A Promise that resolves to the removed startingYear entity.
   * @throws HttpException if the startingYear does not exist in the database.
   */
  async removeStartingYear(
    removeStartingYearInput: RemoveStartingYearInput,
  ): Promise<StartingYear> {
    // Check if StartingYear exists in the database
    const existingStartingYear = await this.startingYearRepository.findOne({
      where: {
        year: removeStartingYearInput.year,
      },
    });

    if (!existingStartingYear) {
      throw new HttpException(
        'Starting year do not exists',
        HttpStatus.NOT_FOUND,
      );
    }

    // If StartingYear exists, delete it
    return this.startingYearRepository.remove(existingStartingYear);
  }

  /**
   * Description: Checks if a startingYear with the specified value exists in the database.
   * @param year The value of the startingYear to check for existence.
   * @returns A Promise that resolves to a boolean indicating whether the startingYear exists.
   */
  async doesStartingYearExists(year: number): Promise<boolean> {
    const startYear = await this.startingYearRepository.findOne({
      where: { year: year },
    });

    if (!startYear) {
      return false;
    } else {
      return true;
    }
  }
}
