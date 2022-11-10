import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';

// Own files
import { Teacher } from 'src/entities/NormalTypes/Teacher.entity';
import { CreateTeacherInput } from 'src/inputTypes/create-teacher.input';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  // Creates a new student and saves it in the database.
  async createTeacher(
    createTeacherInput: CreateTeacherInput,
  ): Promise<Teacher> {
    if (await this.doesTeacherExists(createTeacherInput.email)) {
      throw new UserInputError('Teacher already exists');
    }

    const password = createTeacherInput.password;
    const email = createTeacherInput.email;

    const SALT = await bcrypt.genSalt(10);

    createTeacherInput.password = await bcrypt.hash(password, SALT);
    createTeacherInput.email = email;

    const newTeacher = this.teacherRepository.create(createTeacherInput);
    return this.teacherRepository.save(newTeacher);
  }

  // Finds a specific teacher or null.
  async findOne(email: string): Promise<Teacher> {
    return this.teacherRepository.findOne({
      where: { email: email },
    });
  }

  // Checks if an teacher exists from email.
  async doesTeacherExists(email: string): Promise<boolean> {
    const teacher = await this.teacherRepository.findOne({
      where: { email: email },
    });

    if (!teacher) {
      return false;
    } else {
      return true;
    }
  }
}
