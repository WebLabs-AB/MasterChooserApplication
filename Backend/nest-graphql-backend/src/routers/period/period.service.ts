import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Period } from 'src/entities';
import { Repository } from 'typeorm';
import { CreatePeriodInput } from 'src/inputTypes/create/create-period.input';
import { RemovePeriodInput } from 'src/inputTypes/remove/remove-period.input';
import { UpdatePeriodInput } from 'src/inputTypes/update/update-period.input';

@Injectable()
export class PeriodService {
  constructor(
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  /**
   * Description: Finds all Period objects in the database
   * Input: Null
   * @returns All Period objects
   */
  async findAll(): Promise<Period[]> {
    return this.periodRepository.find(); // SELECT * FROM coursemainareas;
  }

  /**
   * Description: Creates a new period entity in the database.
   * Input: value
   * @param createPeriodInput An object containing the information needed to
   * create a new period.
   * @returns A Promise that resolves to the created period entity.
   */
  async createPeriod(createPeriodInput: CreatePeriodInput): Promise<Period> {
    if (await this.doesPeriodExists(createPeriodInput.value)) {
      throw new HttpException('Period already exists', HttpStatus.CONFLICT);
    }

    const newPeriod = this.periodRepository.create(createPeriodInput);
    return this.periodRepository.save(newPeriod);
  }

  /**
   * Description: Finds a period entity in the database based on the provided input.
   * @param updatePeriodInput An object containing the value of the period to find.
   * @returns A Promise that resolves to the found period entity, if it exists.
   */
  async findOnePeriod(updatePeriodInput: UpdatePeriodInput): Promise<Period> {
    // Check if Period exists in the database
    return this.periodRepository.findOne({
      where: { value: updatePeriodInput.value },
    });
  }

  /**
   * Description: Removes a period entity from the database.
   * @param removePeriodInput An object containing the value of the period to be removed.
   * @returns A Promise that resolves to the removed period entity.
   * @throws HttpException if the period does not exist in the database.
   */
  async removePeriod(removePeriodInput: RemovePeriodInput): Promise<Period> {
    // Check if Period exists in the database
    const existingPeriod = await this.periodRepository.findOne({
      where: {
        value: removePeriodInput.value,
      },
    });

    if (!existingPeriod) {
      throw new HttpException('Period do not exists', HttpStatus.NOT_FOUND);
    }

    // If Period exists, delete it
    return this.periodRepository.remove(existingPeriod);
  }

  /**
   * Description: Checks if a period with the specified value exists in the database.
   * @param value The value of the period to check for existence.
   * @returns A Promise that resolves to a boolean indicating whether the period exists.
   */
  async doesPeriodExists(value: number): Promise<boolean> {
    const period = await this.periodRepository.findOne({
      where: { value: value },
    });

    if (!period) {
      return false;
    } else {
      return true;
    }
  }
}
