import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, CourseStartingYear, StartingYear } from 'src/entities';
import { CreateCourseStartingYearsInput } from 'src/inputTypes/create/create-course-startingYears.input';
import { RemoveCourseStartingYearsInput } from 'src/inputTypes/remove/remove-course-startingYears.input';
import { UpdateCourseStartingYearsInput } from 'src/inputTypes/update/update-course-startingYears.input';
import { Repository } from 'typeorm';

@Injectable()
export class CourseStartingYearService {
  constructor(
    @InjectRepository(CourseStartingYear)
    private courseStartingYearRepository: Repository<CourseStartingYear>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(StartingYear)
    private startingYearRepository: Repository<StartingYear>,
  ) {}

  /**
   * Description: Finds all CourseStartingYear objects in the database
   * Input: Null
   * @returns All CourseStartingYear objects
   */
  async findAll(): Promise<CourseStartingYear[]> {
    return this.courseStartingYearRepository.find();
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: courseID & mainAreaName
   * @param createCourseStartingYearsInput Information needed to create new CourseStartingYear
   * @returns The saved new CourseStartingYear
   */
  async createCourseStartingYear(
    createCourseStartingYearsInput: CreateCourseStartingYearsInput,
  ): Promise<CourseStartingYear> {
    if (
      await this.doesCourseStartingYearExists(
        createCourseStartingYearsInput.courseId,
        createCourseStartingYearsInput.startYear,
        createCourseStartingYearsInput.level,
        createCourseStartingYearsInput.schemaBlock,
      )
    ) {
      throw new HttpException(
        'Course main area already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newCourseStartingYear = this.courseStartingYearRepository.create(
      createCourseStartingYearsInput,
    );
    return this.courseStartingYearRepository.save(newCourseStartingYear);
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: courseID & list with MainArea primary keys.
   * @param updateCourseStartingYearsInput An object containing the courseId and
   * a list of mainAreaNames..
   * @returns The new updated CourseStartingYears.
   */
  async updateCourseStartingYear(
    updateCourseStartingYearsInput: UpdateCourseStartingYearsInput,
  ): Promise<CourseStartingYear[]> {
    const courseId = updateCourseStartingYearsInput.courseId;
    const startYears = updateCourseStartingYearsInput.startYear;

    // Find the course we want to update its relationship.
    const course = await this.courseRepository.findOneBy({ courseId });
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    // Remove existing CourseStartingYear connections for this course.
    await this.courseStartingYearRepository.delete({ course });

    // Create a new CourseStartingYear entity for each mainAreaName.
    const updatedCourseStartingYears = startYears.map(async (startYear) => {
      const mainArea = await this.startingYearRepository.findOneBy({
        value: startYear,
      });

      if (!mainArea) {
        throw new Error(`MainArea with name ${startYear} not found`);
      }

      // Create a new CourseStartingYear connection.
      const courseStartingYear = this.courseStartingYearRepository.create({
        course,
        startingYear,
        courseId: course.courseId,
        startYear: mainArea.value,
      });

      // Save the new CourseStartingYear connection.
      return this.courseStartingYearRepository.save(courseStartingYear);
    });

    return Promise.all(updatedCourseStartingYears);
  }

  /**
   * Description: Deletes a CourseStartingYear entity
   * from the database based on the provided criteria.
   * @param removeCourseStartingYearInput An object containing the courseId and
   * startYear of the CourseStartingYear to be deleted.
   * @returns A Promise that resolves to the deleted CourseStartingYear entity.
   */
  async removeCourseStartingYear(
    removeCourseStartingYearsInput: RemoveCourseStartingYearsInput,
  ): Promise<CourseStartingYear> {
    // Check if CourseStartingYear exists in the database.
    const existingCourseStartingYear =
      await this.courseStartingYearRepository.findOne({
        where: {
          courseId: removeCourseStartingYearsInput.courseId,
          startYear: removeCourseStartingYearsInput.startYear,
        },
      });

    if (!existingCourseStartingYear) {
      throw new HttpException(
        'Course main area do not exists',
        HttpStatus.NOT_FOUND,
      );
    }

    // If CourseStartingYear exists, delete it.
    return this.courseStartingYearRepository.remove(existingCourseStartingYear);
  }

  /**
   * Description: Retrieves CourseStartingYear entities from the database based
   * on the provided main area name.
   * @param startYear The name of the main area to retrieve CourseStartingYear
   * entities for.
   * @returns A Promise that resolves to an array of CourseStartingYear entities
   * matching the provided main area name.
   */
  async courseFromStartYear(startYear: number): Promise<CourseStartingYear[]> {
    return await this.courseStartingYearRepository.find({
      where: { startYear: startYear },
    });
  }

  /**
   * Description: Check if a specific CourseStartingYear exists in the database.
   * @param courseId The ID of the course associated with the CourseStartingYear.
   * @param startYear The name of the main area associated with the CourseStartingYear.
   * @returns A Promise that resolves to a boolean indicating whether the CourseStartingYear exists.
   */
  async doesCourseStartingYearExists(
    courseId: string,
    startYear: number,
    level: number,
    schemaBlock: number,
  ): Promise<boolean> {
    const courseStartingYear = await this.courseStartingYearRepository.findOne({
      where: {
        courseId: courseId,
        startYear: startYear,
        level: level,
        schemaBlock: schemaBlock,
      },
    });

    if (!courseStartingYear) {
      return false;
    } else {
      return true;
    }
  }
}
