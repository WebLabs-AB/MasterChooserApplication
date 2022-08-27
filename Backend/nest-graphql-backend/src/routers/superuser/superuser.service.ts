import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files
import { SuperUser } from 'src/entities/NormalTypes/SuperUser.entity';

@Injectable()
export class SuperuserService {
  constructor(
    @InjectRepository(SuperUser)
    private superusersRepository: Repository<SuperUser>,
  ) {}

  // Finds a specific regularuser or null.
  async findOne(email: string): Promise<SuperUser> {
    return this.superusersRepository.findOne({
      where: { email: email },
    });
  }

  // Checks if an user exists from email.
  async doesUserExists(email: string): Promise<boolean> {
    const user = await this.superusersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return false;
    } else {
      return true;
    }
  }
}
