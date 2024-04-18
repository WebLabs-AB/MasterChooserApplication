import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MainArea } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateMainAreaInput } from 'src/inputTypes/create/create-mainArea.input';
import { RemoveMainAreaInput } from 'src/inputTypes/remove/remove-mainArea.input';
import { UpdateMainAreaInput } from 'src/inputTypes/update/update-mainArea.input';

@Injectable()
export class MainAreaService {
  constructor(
    @InjectRepository(MainArea)
    private mainAreaRepository: Repository<MainArea>,
  ) {}

  /**
   * Description: Finds all MainArea objects in the database
   * Input: Null
   * @returns All MainArea objects
   */
  async findAll(): Promise<MainArea[]> {
    return this.mainAreaRepository.find(); // SELECT * FROM coursemainareas;
  }

  /**
   * Description: Creates a new mainArea entity in the database.
   * Input: value
   * @param createMainAreaInput An object containing the information needed to
   * create a new mainArea.
   * @returns A Promise that resolves to the created mainArea entity.
   */
  async createMainArea(
    createMainAreaInput: CreateMainAreaInput,
  ): Promise<MainArea> {
    if (await this.doesMainAreaExists(createMainAreaInput.name)) {
      throw new HttpException('Main area already exists', HttpStatus.CONFLICT);
    }

    const newMainArea = this.mainAreaRepository.create(createMainAreaInput);
    return this.mainAreaRepository.save(newMainArea);
  }

  /**
   * Description: Finds a mainArea entity in the database based on the provided input.
   * @param updateMainAreaInput An object containing the value of the mainArea to find.
   * @returns A Promise that resolves to the found mainArea entity, if it exists.
   */
  async findOneMainArea(
    updateMainAreaInput: UpdateMainAreaInput,
  ): Promise<MainArea> {
    // Check if MainArea exists in the database
    return this.mainAreaRepository.findOne({
      where: { name: updateMainAreaInput.name },
    });
  }

  /**
   * Description: Removes a mainArea entity from the database.
   * @param removeMainAreaInput An object containing the value of the mainArea to be removed.
   * @returns A Promise that resolves to the removed mainArea entity.
   * @throws HttpException if the mainArea does not exist in the database.
   */
  async removeMainArea(
    removeMainAreaInput: RemoveMainAreaInput,
  ): Promise<MainArea> {
    // Check if MainArea exists in the database
    const existingMainArea = await this.mainAreaRepository.findOne({
      where: {
        name: removeMainAreaInput.name,
      },
    });

    if (!existingMainArea) {
      throw new HttpException('Main area do not exists', HttpStatus.NOT_FOUND);
    }

    // If MainArea exists, delete it
    return this.mainAreaRepository.remove(existingMainArea);
  }

  /**
   * Description: Checks if a mainArea with the specified value exists in the database.
   * @param name The name of the mainArea to check for existence.
   * @returns A Promise that resolves to a boolean indicating whether the mainArea exists.
   */
  async doesMainAreaExists(name: string): Promise<boolean> {
    const mainArea = await this.mainAreaRepository.findOne({
      where: { name: name },
    });

    if (!mainArea) {
      return false;
    } else {
      return true;
    }
  }
}
