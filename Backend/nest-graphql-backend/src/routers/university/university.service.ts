import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from 'src/entities';
import { CreateUniversityInput } from 'src/inputTypes/create/create-university.input';
import { RemoveUniversityInput } from 'src/inputTypes/remove/remove-university.input';
import { UpdateUniversityInput } from 'src/inputTypes/update/update-university.input';
import { Repository } from 'typeorm';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  /**
   * Description: Finds all University objects in the database
   * Input: Null
   * @returns All University objects
   */
  async findAll(): Promise<University[]> {
    return this.universityRepository.find(); // SELECT * FROM coursemainareas;
  }

  /**
   * Description: Creates a new university entity in the database.
   * Input: value
   * @param createUniversityInput An object containing the information needed to
   * create a new university.
   * @returns A Promise that resolves to the created university entity.
   */
  async createUniversity(
    createUniversityInput: CreateUniversityInput,
  ): Promise<University> {
    if (await this.doesUniversityExists(createUniversityInput.name)) {
      throw new HttpException('University already exists', HttpStatus.CONFLICT);
    }

    const newUniversity = this.universityRepository.create(
      createUniversityInput,
    );
    return this.universityRepository.save(newUniversity);
  }

  /**
   * Description: Finds a university entity in the database based on the provided input.
   * @param updateUniversityInput An object containing the value of the university to find.
   * @returns A Promise that resolves to the found university entity, if it exists.
   */
  async findOneUniversity(
    updateUniversityInput: UpdateUniversityInput,
  ): Promise<University> {
    // Check if University exists in the database
    return this.universityRepository.findOne({
      where: { name: updateUniversityInput.name },
    });
  }

  /**
   * Description: Removes a university entity from the database.
   * @param removeUniversityInput An object containing the value of the university to be removed.
   * @returns A Promise that resolves to the removed university entity.
   * @throws HttpException if the university does not exist in the database.
   */
  async removeUniversity(
    removeUniversityInput: RemoveUniversityInput,
  ): Promise<University> {
    // Check if University exists in the database
    const existingUniversity = await this.universityRepository.findOne({
      where: {
        name: removeUniversityInput.name,
      },
    });

    if (!existingUniversity) {
      throw new HttpException('University do not exists', HttpStatus.NOT_FOUND);
    }

    // If University exists, delete it
    return this.universityRepository.remove(existingUniversity);
  }

  /**
   * Description: Checks if a university with the specified name exists in the database.
   * @param name The name of the university to check for existence.
   * @returns A Promise that resolves to a boolean indicating whether the university exists.
   */
  async doesUniversityExists(name: string): Promise<boolean> {
    const university = await this.universityRepository.findOne({
      where: { name: name },
    });

    if (!university) {
      return false;
    } else {
      return true;
    }
  }
}
