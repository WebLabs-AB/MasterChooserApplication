import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CourseMainAreas } from 'src/entities/NormalTypes/CourseMainAreas.entity';
import { CreateCourseMainAreasInput } from 'src/inputTypes/create-course-mainArea.input';
import { Repository } from 'typeorm';

@Injectable()
export class CourseMainareasService {
  constructor(
    @InjectRepository(CourseMainAreas)
    private courseMainAreasRepository: Repository<CourseMainAreas>,
  ) {}

  // Creates a ManyToMany connection between Course and MainArea.
  async createCourseMainAreas(
    createCourseMainAreasInput: CreateCourseMainAreasInput,
  ): Promise<CourseMainAreas> {
    if (
      await this.doesCourseMainAreasExists(
        createCourseMainAreasInput.courseId,
        createCourseMainAreasInput.type,
      )
    ) {
      throw new UserInputError('Course main area already exists');
    }

    const newCourseEducations = this.courseMainAreasRepository.create(
      createCourseMainAreasInput,
    );
    return this.courseMainAreasRepository.save(newCourseEducations);
  }

  async findAll(): Promise<CourseMainAreas[]> {
    return this.courseMainAreasRepository.find(); // SELECT * FROM coursemainareas;
  }

  async findAllCoursesConnectedToMainArea(
    type: string,
  ): Promise<CourseMainAreas[]> {
    return await this.courseMainAreasRepository.find({
      where: { type: type },
    });
  }

  async findAllMainAreasConnectedToCourse(
    courseId: string,
  ): Promise<CourseMainAreas[]> {
    return await this.courseMainAreasRepository.find({
      where: { courseId: courseId },
    });
  }

  async doesCourseMainAreasExists(
    courseId: string,
    type: string,
  ): Promise<boolean> {
    const courseMainAreas = await this.courseMainAreasRepository.findOne({
      where: { courseId: courseId, type: type },
    });

    if (!courseMainAreas) {
      return false;
    } else {
      return true;
    }
  }
}
