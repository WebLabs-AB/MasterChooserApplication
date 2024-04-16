import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseMainArea } from 'src/entities';
import { CreateCourseMainAreaInput } from 'src/inputTypes/create-course-mainArea.input';
import { Repository } from 'typeorm';

@Injectable()
export class CourseMainAreaService {
  constructor(
    @InjectRepository(CourseMainArea)
    private courseMainAreaRepository: Repository<CourseMainArea>,
  ) {}

  /**
   * Description: Finds all CourseMainArea objects in the database
   * Input: Null
   * @returns All CourseMainArea objects
   */
  async findAll(): Promise<CourseMainArea[]> {
    return this.courseMainAreaRepository.find(); // SELECT * FROM coursemainareas;
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: courseID & mainAreaName
   * @param createCourseMainAreaInput Information needed to create new CourseMainArea
   * @returns The saved new CourseMainArea
   */
  async createCourseMainArea(
    createCourseMainAreaInput: CreateCourseMainAreaInput,
  ): Promise<CourseMainArea> {
    if (
      await this.doesCourseMainAreaExists(
        createCourseMainAreaInput.courseId,
        createCourseMainAreaInput.mainAreaName,
      )
    ) {
      throw new HttpException(
        'Course main area already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newCourseMainArea = this.courseMainAreaRepository.create(
      createCourseMainAreaInput,
    );
    return this.courseMainAreaRepository.save(newCourseMainArea);
  }

  /**
   * Description: Deletes a CourseMainArea entity
   * from the database based on the provided criteria.
   * @param createCourseMainAreaInput An object containing the courseId and
   * mainAreaName of the CourseMainArea to be deleted.
   * @returns A Promise that resolves to the deleted CourseMainArea entity.
   */
  async removeCourseMainArea(
    createCourseMainAreaInput: CreateCourseMainAreaInput,
  ): Promise<CourseMainArea> {
    // Check if CourseMainArea exists in the database
    const existingCourseMainArea = await this.courseMainAreaRepository.findOne({
      where: {
        courseId: createCourseMainAreaInput.courseId,
        mainAreaName: createCourseMainAreaInput.mainAreaName,
      },
    });

    if (!existingCourseMainArea) {
      throw new HttpException(
        'Course main area do not exists',
        HttpStatus.NOT_FOUND,
      );
    }

    // If CourseMainArea exists, delete it
    return this.courseMainAreaRepository.remove(existingCourseMainArea);
  }

  /**
   * Description: Check if a specific CourseMainArea exists
   * input:
   * @param courseId
   * @param mainAreaName
   * @returns
   */
  async doesCourseMainAreaExists(
    courseId: string,
    mainAreaName: string,
  ): Promise<boolean> {
    const courseMainArea = await this.courseMainAreaRepository.findOne({
      where: { courseId: courseId, mainAreaName: mainAreaName },
    });

    if (!courseMainArea) {
      return false;
    } else {
      return true;
    }
  }
}
