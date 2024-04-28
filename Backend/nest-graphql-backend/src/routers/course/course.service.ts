import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  /**
   * Description: Returns all courses in the database.
   * @returns A list of all Course objects.
   */
  async findAll(): Promise<Course[]> {
    return await this.courseRepo.find();
  }
}
