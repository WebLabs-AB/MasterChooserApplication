import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files.
import { Education } from 'src/entities/NormalTypes/Education.entity';
import { CreateEducationInput } from 'src/inputTypes/create-education.input';
import { UniversityService } from 'src/routers/university/university.service';
import { University } from 'src/entities/NormalTypes/University.entity';
import { Student } from 'src/entities/NormalTypes/Student.entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
    private universityService: UniversityService,
  ) {}

  // Creates a new education and saves it in the database.
  async createEducation(
    createEducationInput: CreateEducationInput,
  ): Promise<Education> {
    const newEducation = this.educationRepository.create(createEducationInput);

    const university = await this.getUniversity(
      createEducationInput.universityName,
    ); // Check if university already exists.
    university.universityName = createEducationInput.universityName;

    if (!university.Educations) {
      university.Educations = [newEducation];
    } else {
      university.Educations.push(newEducation); // Add the new education to the university.
    }

    newEducation.university = university; // Set foreign key.
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
    const university = await this.universityService.findOne(universityName);
    return university.Educations;
  }

  // Finds a specific education or fails.
  async findOne(educationName: string): Promise<Education> {
    return this.educationRepository.findOneByOrFail({ educationName });
  }

  // Gets a specific university.
  async getUniversity(universityName: string): Promise<University> {
    return this.universityService.findOne(universityName);
  }

  // Retrieves all students that studies a specific education.
  async getAllStudents(educationName: string): Promise<Student[]> {
    const education = await this.findOne(educationName);
    return education.Students;
  }
}
