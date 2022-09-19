import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CourseStartingYears } from 'src/entities/NormalTypes/CourseStartingYears.entity';
import { CreateCourseStartingYearsInput } from 'src/inputTypes/create-course-startingYears.input';
import { Repository } from 'typeorm';

@Injectable()
export class CourseStartingYearsService {
  constructor(
    @InjectRepository(CourseStartingYears)
    private courseStartingYearsRepository: Repository<CourseStartingYears>,
  ) {}

  async createCourseStartingYears(
    createCourseEducationsInput: CreateCourseStartingYearsInput,
  ): Promise<CourseStartingYears> {
    if (
      await this.doesCourseStartingYearsExists(
        createCourseEducationsInput.courseId,
        createCourseEducationsInput.yearTaught,
      )
    ) {
      throw new UserInputError(
        'That year already belongs already to that course',
      );
    }

    const newCourseEducations = this.courseStartingYearsRepository.create(
      createCourseEducationsInput,
    );
    return this.courseStartingYearsRepository.save(newCourseEducations);
  }

  async findAll(): Promise<CourseStartingYears[]> {
    return this.courseStartingYearsRepository.find(); // SELECT * FROM course-startingyears;
  }

  async findAllCoursesConnectedToStartingYear(
    yearTaught: number,
  ): Promise<CourseStartingYears[]> {
    return await this.courseStartingYearsRepository.find({
      where: { yearTaught: yearTaught },
    });
  }

  async findAllStartingYearsConnectedToCourse(
    courseId: string,
  ): Promise<CourseStartingYears[]> {
    return await this.courseStartingYearsRepository.find({
      where: { courseId: courseId },
    });
  }

  async doesCourseStartingYearsExists(
    courseId: string,
    yearTaught: number,
  ): Promise<boolean> {
    const courseStartingYears =
      await this.courseStartingYearsRepository.findOne({
        where: { courseId: courseId, yearTaught: yearTaught },
      });

    if (!courseStartingYears) {
      return false;
    } else {
      return true;
    }
  }
}
