import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files.
import { Education } from 'src/entities/Education';
import { createEducationInput } from 'src/inputTypes/create-education.input';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  // Creates a new education and saves it in the database.
  createEducation(
    createEducationInput: createEducationInput,
  ): Promise<Education> {
    const newEducation = this.educationRepository.create(createEducationInput);
    return this.educationRepository.save(newEducation);
  }

  // Find all programs from the education table.
  async findAll(): Promise<Education[]> {
    return this.educationRepository.find(); // SELECT * FROM education;
  }
}
