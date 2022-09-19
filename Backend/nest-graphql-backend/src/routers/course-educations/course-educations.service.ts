import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CourseEducations } from 'src/entities/NormalTypes/CourseEducations.entity';
import { CreateCourseEducationsInput } from 'src/inputTypes/create-course-educations.input';
import { Repository } from 'typeorm';

@Injectable()
export class CourseEducationsService {
  constructor(
    @InjectRepository(CourseEducations)
    private courseEducationsRepository: Repository<CourseEducations>,
  ) {}

  // Creates a ManyToMany connection between Course and Education.
  async createCourseEducations(
    createCourseEducationsInput: CreateCourseEducationsInput,
  ): Promise<CourseEducations> {
    if (
      await this.doesCourseEducationsExists(
        createCourseEducationsInput.courseId,
        createCourseEducationsInput.educationId,
      )
    ) {
      throw new UserInputError('Course educations already exists');
    }

    const newCourseEducations = this.courseEducationsRepository.create(
      createCourseEducationsInput,
    );
    return this.courseEducationsRepository.save(newCourseEducations);
  }

  async findAll(): Promise<CourseEducations[]> {
    return this.courseEducationsRepository.find(); // SELECT * FROM courseeducations;
  }

  async findAllCoursesConnectedToEducation(
    educationId: string,
  ): Promise<CourseEducations[]> {
    return await this.courseEducationsRepository.find({
      where: { educationId: educationId },
    });
  }

  async findAllEducationsConnectedToCourse(
    courseId: string,
  ): Promise<CourseEducations[]> {
    return await this.courseEducationsRepository.find({
      where: { courseId: courseId },
    });
  }

  async doesCourseEducationsExists(
    courseId: string,
    educationId: string,
  ): Promise<boolean> {
    const courseEducations = await this.courseEducationsRepository.findOne({
      where: { courseId: courseId, educationId: educationId },
    });

    if (!courseEducations) {
      return false;
    } else {
      return true;
    }
  }
}
