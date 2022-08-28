import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Own files
import { Teacher } from 'src/entities/NormalTypes/Teacher.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  // Finds a specific regularuser or null.
  async findOne(email: string): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { email: email },
    });
  }

  // Checks if an user exists from email.
  async doesUserExists(email: string): Promise<boolean> {
    const user = await this.teacherRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return false;
    } else {
      return true;
    }
  }
}
