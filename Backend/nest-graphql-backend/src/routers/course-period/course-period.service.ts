import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, CoursePeriod, Period } from 'src/entities';
import { CreateCoursePeriodsInput } from 'src/inputTypes/create/create-course-periods.input';
import { RemoveCoursePeriodsInput } from 'src/inputTypes/remove/remove-course-periods.input';
import { UpdateCoursePeriodsInput } from 'src/inputTypes/update/update-course-periods.input';
import { Repository } from 'typeorm';

@Injectable()
export class CoursePeriodService {
  constructor(
    @InjectRepository(CoursePeriod)
    private coursePeriodRepository: Repository<CoursePeriod>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Period)
    private periodRepository: Repository<Period>,
  ) {}

  /**
   * Description: Finds all CoursePeriod objects in the database
   * Input: Null
   * @returns All CoursePeriod objects
   */
  async findAll(): Promise<CoursePeriod[]> {
    return this.coursePeriodRepository.find();
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: courseID & periodValue
   * @param createCoursePeriodInput Information needed to create new CoursePeriod
   * @returns The saved new CoursePeriod
   */
  async createCoursePeriod(
    createCoursePeriodsInput: CreateCoursePeriodsInput,
  ): Promise<CoursePeriod> {
    if (
      await this.doesCoursePeriodExists(
        createCoursePeriodsInput.courseId,
        createCoursePeriodsInput.periodValue,
      )
    ) {
      throw new HttpException(
        'Course main area already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newCoursePeriod = this.coursePeriodRepository.create(
      createCoursePeriodsInput,
    );
    return this.coursePeriodRepository.save(newCoursePeriod);
  }

  /**
   * Description: Creates a ManyToMany connection between Course and Period.
   * Input: courseID & list with Period primary keys.
   * @param updateCoursePeriodsInput An object containing the courseId and
   * a list of periodValues..
   * @returns The new updated CoursePeriod.
   */
  async updateCoursePeriod(
    updateCoursePeriodsInput: UpdateCoursePeriodsInput,
  ): Promise<CoursePeriod[]> {
    const courseId = updateCoursePeriodsInput.courseId;
    const periodValue = updateCoursePeriodsInput.periodValue;

    // Find the course we want to update its relationship.
    const course = await this.courseRepository.findOneBy({ courseId });
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    // Remove existing CoursePeriod connections for this course.
    await this.coursePeriodRepository.delete({ course });

    // Create a new CoursePeriod entity for each periodValue.
    const updatedCoursePeriods = periodValue.map(async (periodValue) => {
      const period = await this.periodRepository.findOneBy({
        value: periodValue,
      });

      if (!period) {
        throw new Error(`Period with name ${periodValue} not found`);
      }

      // Create a new CoursePeriod connection.
      const coursePeriod = this.coursePeriodRepository.create({
        course,
        period,
        courseId: course.courseId,
        periodValue: period.value,
      });

      // Save the new CoursePeriod connection.
      return this.coursePeriodRepository.save(coursePeriod);
    });

    return Promise.all(updatedCoursePeriods);
  }

  /**
   * Description: Deletes a CoursePeriod entity
   * from the database based on the provided criteria.
   * @param removeCoursePeriodInput An object containing the courseId and
   * periodValue of the CoursePeriod to be deleted.
   * @returns A Promise that resolves to the deleted CoursePeriod entity.
   */
  async removeCoursePeriod(
    removeCoursePeriodsInput: RemoveCoursePeriodsInput,
  ): Promise<CoursePeriod> {
    // Check if CoursePeriod exists in the database.
    const existingCoursePeriod = await this.coursePeriodRepository.findOne({
      where: {
        courseId: removeCoursePeriodsInput.courseId,
        periodValue: removeCoursePeriodsInput.periodValue,
      },
    });

    if (!existingCoursePeriod) {
      throw new HttpException(
        'Course main area do not exists',
        HttpStatus.NOT_FOUND,
      );
    }

    // If CoursePeriod exists, delete it.
    return this.coursePeriodRepository.remove(existingCoursePeriod);
  }

  /**
   * Description: Retrieves CoursePeriod entities from the database based
   * on the provided main area name.
   * @param courseId The name of the main area to retrieve CoursePeriod
   * entities for.
   * @returns A Promise that resolves to an array of CoursePeriod entities
   * matching the provided main area name.
   */
  async periodFromCourse(courseId: string): Promise<CoursePeriod[]> {
    return await this.coursePeriodRepository.find({
      where: { courseId: courseId },
    });
  }

  /**
   * Description: Retrieves CoursePeriod entities from the database based
   * on the provided course ID.
   * @param courseId The ID of the course to retrieve CoursePeriod
   * entities for.
   * @returns A Promise that resolves to an array of CoursePeriod entities
   * associated with the provided course ID.
   */
  async courseFromPeriod(periodValue: number): Promise<CoursePeriod[]> {
    return await this.coursePeriodRepository.find({
      where: { periodValue: periodValue },
    });
  }

  /**
   * Description: Check if a specific CoursePeriod exists in the database.
   * @param courseId The ID of the course associated with the CoursePeriod.
   * @param periodValue The name of the main area associated with the CoursePeriod.
   * @returns A Promise that resolves to a boolean indicating whether the CoursePeriod exists.
   */
  async doesCoursePeriodExists(
    courseId: string,
    periodValue: number,
  ): Promise<boolean> {
    const coursePeriod = await this.coursePeriodRepository.findOne({
      where: { courseId: courseId, periodValue: periodValue },
    });

    if (!coursePeriod) {
      return false;
    } else {
      return true;
    }
  }
}
