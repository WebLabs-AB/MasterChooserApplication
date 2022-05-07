import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files
import { RegularUser } from 'src/entities/RegularUser';
import { createRegularuserInput } from 'src/inputTypes/create-regularuser.input';
import { UniversityService } from 'src/university/university.service';
import { University } from 'src/entities/University';

@Injectable()
export class RegularuserService {
  constructor(
    @InjectRepository(RegularUser)
    private regularusersRepository: Repository<RegularUser>,
    private universityService: UniversityService,
  ) {}

  // Creates a new regularuser and saves it in the datanbase.
  createRegularuser(
    createRegularuserInput: createRegularuserInput,
  ): Promise<RegularUser> {
    const newRegularuser = this.regularusersRepository.create(
      createRegularuserInput,
    );

    const university = new University();
    university.universityName = createRegularuserInput.universityName;
    newRegularuser.university = university;

    return this.regularusersRepository.save(newRegularuser);
  }

  // Find all users from the regularuser table.
  async findAll(): Promise<RegularUser[]> {
    return this.regularusersRepository.find(); // SELECT * FROM regularuser;
  }

  getUniversity(universityName: string): Promise<University> {
    return this.universityService.findOne(universityName);
  }
}
