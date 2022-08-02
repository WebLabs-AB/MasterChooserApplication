import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files.
import { University } from 'src/entities/University.entity';
import { createUniversityInput } from 'src/inputTypes/create-university.input';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private universityRepository: Repository<University>,
  ) {}

  // Creates a new university and saves it in the database.
  async createUniversity(
    createUniversityInput: createUniversityInput,
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
}
