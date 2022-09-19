import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { CoursePeriods } from 'src/entities/NormalTypes/CoursePeriods.entity';
import { CreateCoursePeriodsInput } from 'src/inputTypes/create-course-periods.input';
import { Repository } from 'typeorm';

@Injectable()
export class CoursePeriodsService {
  constructor(
    @InjectRepository(CoursePeriods)
    private coursePeriodsRepository: Repository<CoursePeriods>,
  ) {}

  // Creates a new ManyToMany entiity of Course and Period.
  async createCoursePeriods(
    createCoursePeriodsInput: CreateCoursePeriodsInput,
  ): Promise<CoursePeriods> {
    if (
      await this.doesCoursePeriodsExists(
        createCoursePeriodsInput.courseId,
        createCoursePeriodsInput.periodValue,
      )
    ) {
      throw new UserInputError(
        'That course is already being taught in that period already exists',
      );
    }

    const newCoursePeriods = this.coursePeriodsRepository.create(
      createCoursePeriodsInput,
    );
    return this.coursePeriodsRepository.save(newCoursePeriods);
  }

  async findAll(): Promise<CoursePeriods[]> {
    return this.coursePeriodsRepository.find(); // SELECT * FROM courseperiods;
  }

  async findAllCoursesConnectedToPeriod(
    periodValue: number,
  ): Promise<CoursePeriods[]> {
    return await this.coursePeriodsRepository.find({
      where: { periodValue: periodValue },
    });
  }

  async findAllPeriodsConnectedToCourse(
    courseId: string,
  ): Promise<CoursePeriods[]> {
    return await this.coursePeriodsRepository.find({
      where: { courseId: courseId },
    });
  }

  async doesCoursePeriodsExists(
    courseId: string,
    periodValue: number,
  ): Promise<boolean> {
    const coursePeriods = await this.coursePeriodsRepository.findOne({
      where: { courseId: courseId, periodValue: periodValue },
    });

    if (!coursePeriods) {
      return false;
    } else {
      return true;
    }
  }
}
