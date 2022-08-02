import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// Own files
import { RegularUser } from 'src/entities/RegularUser';
import { createRegularuserInput } from 'src/inputTypes/create-regularuser.input';
import { UniversityService } from 'src/university/university.service';
import { University } from 'src/entities/University';
import { Education } from 'src/entities/Education';
import { EducationService } from 'src/education/education.service';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class RegularuserService {
  constructor(
    @InjectRepository(RegularUser)
    private regularusersRepository: Repository<RegularUser>,
    private universityService: UniversityService,
    private educationService: EducationService,
  ) {}

  // Creates a new regularuser and saves it in the database.
  async createRegularuser(
    createRegularuserInput: createRegularuserInput,
  ): Promise<RegularUser> {
    if (await this.doesUserExists(createRegularuserInput.email)) {
      throw new UserInputError('User already exists');
    }

    const saltOrRounds = 10;
    const password = createRegularuserInput.password;
    const email = createRegularuserInput.email;

    createRegularuserInput.password = await bcrypt.hash(password, saltOrRounds);
    createRegularuserInput.email = await bcrypt.hash(email, saltOrRounds);

    const newRegularuser = this.regularusersRepository.create(
      createRegularuserInput,
    );

    const university = new University();
    university.universityName = createRegularuserInput.universityName;
    newRegularuser.university = university; // Set foreign key.

    const education = new Education();
    education.educationName = createRegularuserInput.educationName;
    newRegularuser.education = education; // Set forign key.

    return this.regularusersRepository.save(newRegularuser);
  }

  // Find all users from the regularuser table.
  async findAll(): Promise<RegularUser[]> {
    return this.regularusersRepository.find(); // SELECT * FROM regularuser;
  }

  // Finds a specific regularuser or fails.
  async findOne(email: string): Promise<RegularUser> {
    return this.regularusersRepository.findOneByOrFail({ email });
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
