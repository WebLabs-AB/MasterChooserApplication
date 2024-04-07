import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files.
import { University } from 'src/entities/NormalTypes/deprecated/University.entity';
import { CreateUniversityInput } from 'src/inputTypes/create-university.input';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  // Creates a new university and saves it in the database.
  async createUniversity(
    createUniversityInput: CreateUniversityInput,
  ): Promise<University> {
    const newUniversity = this.universityRepository.create(
      createUniversityInput,
    );
    return this.universityRepository.save(newUniversity);
  }

  // Find all universities from the university table.
  async findAll(): Promise<University[]> {
    return this.universityRepository.find(); // SELECT * FROM university;
  }

  // Finds a specific university or fails.
  async findOne(universityName: string): Promise<University> {
    return this.universityRepository.findOneByOrFail({ universityName });
  }

  // Finds a specific university and deletes it.
  async deleteUniversity(universityName: string): Promise<University> {
    const university = await this.universityRepository.findOne({
      where: { universityName: universityName },
    });
    if (university) {
      await this.universityRepository.delete(universityName);
      return university;
    } else {
      throw new HttpException(
        'No university with that name was found',
        HttpStatus.CONFLICT,
      );
    }
  }
}
