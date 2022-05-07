import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files
import { RegularUser } from 'src/entities/RegularUser';
import { createRegularuserInput } from 'src/inputTypes/create-regularuser.input';

@Injectable()
export class RegularuserService {
  constructor(
    @InjectRepository(RegularUser)
    private regularusersRepository: Repository<RegularUser>,
  ) {}

  // Creates a new regularuser and saves it in the datanbase.
  createRegularuser(
    createRegularuserInput: createRegularuserInput,
  ): Promise<RegularUser> {
    const newRegularuser = this.regularusersRepository.create(
      createRegularuserInput,
    );
    return this.regularusersRepository.save(newRegularuser);
  }

  // Find all users from the regularuser table.
  async findAll(): Promise<RegularUser[]> {
    return this.regularusersRepository.find(); // SELECT * FROM regularuser;
  }
}
