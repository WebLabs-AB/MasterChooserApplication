import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseMainArea } from 'src/entities';
import { CreateCourseMainAreaInput } from 'src/inputTypes/create/create-course-mainArea.input';
import { RemoveCourseMainAreaInput } from 'src/inputTypes/remove/remove-course-mainArea.input';
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
   * @param removeCourseMainAreaInput An object containing the courseId and
   * mainAreaName of the CourseMainArea to be deleted.
   * @returns A Promise that resolves to the deleted CourseMainArea entity.
   */
  async removeCourseMainArea(
    removeCourseMainAreaInput: RemoveCourseMainAreaInput,
  ): Promise<CourseMainArea> {
    // Check if CourseMainArea exists in the database
    const existingCourseMainArea = await this.courseMainAreaRepository.findOne({
      where: {
        courseId: removeCourseMainAreaInput.courseId,
        mainAreaName: removeCourseMainAreaInput.mainAreaName,
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
   * Description: Retrieves CourseMainArea entities from the database based
   * on the provided main area name.
   * @param mainAreaName The name of the main area to retrieve CourseMainArea
   * entities for.
   * @returns A Promise that resolves to an array of CourseMainArea entities
   * matching the provided main area name.
   */
  async courseFromMainArea(mainAreaName: string): Promise<CourseMainArea[]> {
    return await this.courseMainAreaRepository.find({
      where: { mainAreaName: mainAreaName },
    });
  }

  /**
   * Description: Retrieves CourseMainArea entities from the database based
   * on the provided course ID.
   * @param courseId The ID of the course to retrieve CourseMainArea
   * entities for.
   * @returns A Promise that resolves to an array of CourseMainArea entities
   * associated with the provided course ID.
   */
  async mainAreaFromCourse(courseId: string): Promise<CourseMainArea[]> {
    return await this.courseMainAreaRepository.find({
      where: { courseId: courseId },
    });
  }

  /**
   * Description: Check if a specific CourseMainArea exists in the database.
   * @param courseId The ID of the course associated with the CourseMainArea.
   * @param mainAreaName The name of the main area associated with the CourseMainArea.
   * @returns A Promise that resolves to a boolean indicating whether the CourseMainArea exists.
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
