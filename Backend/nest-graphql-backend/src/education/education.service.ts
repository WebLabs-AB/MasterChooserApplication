import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files.
import { Education } from 'src/entities/Education.entity';
import { createEducationInput } from 'src/inputTypes/create-education.input';
import { UniversityService } from 'src/university/university.service';
import { University } from 'src/entities/University.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    private universityService: UniversityService,
  ) {}

  // Creates a new education and saves it in the database.
  async createEducation(
    createEducationInput: createEducationInput,
  ): Promise<Education> {
    const newEducation = this.educationRepository.create(createEducationInput);

    const university = new University();
    university.universityName = createEducationInput.universityName;
    newEducation.university = university; // Set foreign key

    return this.educationRepository.save(newEducation);
  }

  // Find all programs from the education table.
  async findAll(): Promise<Education[]> {
    return this.educationRepository.find(); // SELECT * FROM education;
  }

  // Find all programs from the education table that matches string.
  async findEducationFromUniversity(
    universityName: string,
  ): Promise<Education[]> {
    return this.educationRepository.find({
      where: { universityName: universityName },
    }); // SELECT * FROM education WHERE universitName = universityName;
  }

  // Finds a specific education or fails.
  async findOne(educationName: string): Promise<Education> {
    return this.educationRepository.findOneByOrFail({ educationName });
  }

  // Gets a specific university.
  async getUniversity(universityName: string): Promise<University> {
    return this.universityService.findOne(universityName);
  }
}
