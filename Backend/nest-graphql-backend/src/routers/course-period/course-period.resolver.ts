import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursePeriodService } from './course-period.service';
import { CoursePeriod } from 'src/entities';
import { CreateCoursePeriodsInput } from 'src/inputTypes/create/create-course-periods.input';
import { RemoveCoursePeriodsInput } from 'src/inputTypes/remove/remove-course-periods.input';

@Resolver()
export class CoursePeriodResolver {
  constructor(private coursePeriodService: CoursePeriodService) {}

  // Returns all CoursePeriod obejcts from the database in a list.
  @Query((returns) => [CoursePeriod])
  async coursePeriod(): Promise<CoursePeriod[]> {
    return this.coursePeriodService.findAll();
  }

  // Creates a new CoursePeriod object for the database.
  @Mutation((returns) => CoursePeriod)
  async createCoursePeriod(
    @Args('createCoursePeriodInput')
    createCoursePeriodsInput: CreateCoursePeriodsInput,
  ): Promise<CoursePeriod> {
    return this.coursePeriodService.createCoursePeriod(
      createCoursePeriodsInput,
    );
  }

  // Removes a CoursePeriod object from the database.
  @Mutation((returns) => CoursePeriod)
  async removeCoursePeriod(
    @Args('removeCoursePeriodInput')
    removeCoursePeriodsInput: RemoveCoursePeriodsInput,
  ): Promise<CoursePeriod> {
    return this.coursePeriodService.removeCoursePeriod(
      removeCoursePeriodsInput,
    );
  }

  // Return all courses that belong to a specific period.
  @Query((returns) => [CoursePeriod])
  async periodFromCourse(
    @Args('courseId') courseId: string,
  ): Promise<CoursePeriod[]> {
    return this.coursePeriodService.periodFromCourse(courseId);
  }

  // Return all periods that belong to a specific course.
  @Query((returns) => [CoursePeriod])
  async courseFromPeriod(
    @Args('periodValue') periodValue: number,
  ): Promise<CoursePeriod[]> {
    return this.coursePeriodService.courseFromPeriod(periodValue);
  }
}
