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
    private regularusersRepository: Repository<Student>,
    private universityService: UniversityService,
    private educationService: EducationService,
  ) {}

  // Creates a new regularuser and saves it in the database.
  async createRegularuser(
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

    const newRegularuser = this.regularusersRepository.create(
      createRegularuserInput,
    );

    const university = await this.getUniversity(
      createRegularuserInput.universityName,
    ); // Check if university already exists.

    if (!university.Students) {
      university.Students = [newRegularuser];
    } else {
      university.Students.push(newRegularuser); // Add the student to the studentslist.
    }

    newRegularuser.university = university; // Set foreign key.

    const education = await this.getEducation(
      createRegularuserInput.educationName,
    ); // Check if education already exists.

    if (!education.Students) {
      education.Students = [newRegularuser];
    } else {
      education.Students.push(newRegularuser); // Add the student to the studentslist.
    }
    newRegularuser.education = education; // Set foreign key.

    return this.regularusersRepository.save(newRegularuser);
  }

  // Find all users from the regularuser table.
  async findAll(): Promise<Student[]> {
    return this.regularusersRepository.find(); // SELECT * FROM regularuser;
  }

  // Finds a specific regularuser or returns null.
  async findOne(email: string): Promise<Student> {
    return await this.regularusersRepository.findOne({
      where: { email: email },
    });
  }

  // Gets a specific university.
  async getUniversity(universityName: string): Promise<University> {
    return this.universityService.findOne(universityName);
  }

  // Gets a specific education.
  async getEducation(educationName: string): Promise<Education> {
    return this.educationService.findOne(educationName);
  }

  // Checks if an user exists from email.
  async doesUserExists(email: string): Promise<boolean> {
    const user = await this.regularusersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return false;
    } else {
      return true;
    }
  }
}
