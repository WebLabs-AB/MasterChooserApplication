import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegularUser } from 'src/entities/RegularUser';
import { Repository } from 'typeorm';

@Injectable()
export class RegularuserService {
  constructor(
    @InjectRepository(RegularUser)
    private regularusersRepository: Repository<RegularUser>,
  ) {}

  async findAll(): Promise<RegularUser[]> {
    const regularuser = new RegularUser();
    regularuser.email = 'test@com';
    regularuser.password = 'ddd';
    return [regularuser];
  }
}
