import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Own files
import { Student } from 'src/entities/NormalTypes/Student.entity';
import { CreateStudentInput } from 'src/inputTypes/create-regularuser.input';
import { UniversityService } from 'src/routers/university/university.service';
import { University } from 'src/entities/NormalTypes/University.entity';
import { Education } from 'src/entities/NormalTypes/Education.entity';
import { EducationService } from 'src/routers/education/education.service';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private universityService: UniversityService,
    private educationService: EducationService,
  ) {}

  // Creates a new student and saves it in the database.
  async createStudent(
    createRegularuserInput: CreateStudentInput,
  ): Promise<Student> {
    if (await this.doesUserExists(createRegularuserInput.email)) {
      throw new UserInputError('User already exists');
    }

    const password = createRegularuserInput.password;
    const email = createRegularuserInput.email;

    const SALT = await bcrypt.genSalt(10);

    createRegularuserInput.password = await bcrypt.hash(password, SALT);
    createRegularuserInput.email = email;

    const newStudent = this.studentRepository.create(createRegularuserInput);

    const university = await this.getUniversity(
      createRegularuserInput.universityName,
    ); // Check if university already exists.

    const education = await this.getEducation(
      createRegularuserInput.educationName,
      createRegularuserInput.universityName,
    ); // Check if education already exists.

    newStudent.education = education; // Set foreign key.
    newStudent.university = university; // Set foreign key.
    return this.studentRepository.save(newStudent);
  }

  // Find all users from the regularuser table.
  async findAll(): Promise<Student[]> {
    return this.studentRepository.find(); // SELECT * FROM regularuser;
  }

  // Finds a specific regularuser or returns null.
  async findOne(email: string): Promise<Student> {
    return await this.studentRepository.findOne({
      where: { email: email },
    });
  }

  // Gets a specific university.
  async getUniversity(universityName: string): Promise<University> {
    return this.universityService.findOne(universityName);
  }

  // Gets a specific education.
  async getEducation(
    educationName: string,
    universityName: string,
  ): Promise<Education> {
    return this.educationService.findOne(educationName, universityName);
  }

  // Checks if an user exists from email.
  async doesUserExists(email: string): Promise<boolean> {
    const user = await this.studentRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return false;
    } else {
      return true;
    }
  }
}
