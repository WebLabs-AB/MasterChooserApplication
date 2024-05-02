import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseStartingYearService } from './course-starting-year.service';
import { CourseStartingYear } from 'src/entities';
import { CreateCourseStartingYearsInput } from 'src/inputTypes/create/create-course-startingYears.input';
import { RemoveCourseStartingYearsInput } from 'src/inputTypes/remove/remove-course-startingYears.input';

@Resolver()
export class CourseStartingYearResolver {
  constructor(private courseStartingYearService: CourseStartingYearService) {}

  // Returns all CourseStartingYear obejcts from the database in a list.
  @Query((returns) => [CourseStartingYear])
  async courseStartingYear(): Promise<CourseStartingYear[]> {
    return this.courseStartingYearService.findAll();
  }

  // Creates a new CourseStartingYear object for the database.
  @Mutation((returns) => CourseStartingYear)
  async createCourseStartingYear(
    @Args('createCourseStartingYearInput')
    createCourseStartingYearsInput: CreateCourseStartingYearsInput,
  ): Promise<CourseStartingYear> {
    return this.courseStartingYearService.createCourseStartingYear(
      createCourseStartingYearsInput,
    );
  }

  // Removes a CourseStartingYear object from the database.
  @Mutation((returns) => CourseStartingYear)
  async removeCourseStartingYear(
    @Args('removeCourseStartingYearsInput')
    removeCourseStartingYearsInput: RemoveCourseStartingYearsInput,
  ): Promise<CourseStartingYear> {
    return this.courseStartingYearService.removeCourseStartingYear(
      removeCourseStartingYearsInput,
    );
  }

  // Return all courses that belong to a specific main area.
  @Query((returns) => [CourseStartingYear])
  async courseFromMainArea(
    @Args('startYear') startYear: number,
  ): Promise<CourseStartingYear[]> {
    return this.courseStartingYearService.courseFromStartYear(startYear);
  }
}
