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

  // Creates a ManyToMany connection between Course and Education.
  async createCourseMainAreas(
    createCourseEducationsInput: CreateCourseMainAreasInput,
  ): Promise<CourseMainAreas> {
    if (
      await this.doesCourseMainAreasExists(
        createCourseEducationsInput.courseId,
        createCourseEducationsInput.type,
      )
    ) {
      throw new UserInputError('Course educations already exists');
    }

    const newCourseEducations = this.courseMainAreasRepository.create(
      createCourseEducationsInput,
    );
    return this.courseMainAreasRepository.save(newCourseEducations);
  }

  async findAll(): Promise<CourseMainAreas[]> {
    return this.courseMainAreasRepository.find(); // SELECT * FROM courseeducations;
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
