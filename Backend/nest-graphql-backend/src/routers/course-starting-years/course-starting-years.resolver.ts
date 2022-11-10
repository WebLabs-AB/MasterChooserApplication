import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseStartingYears } from 'src/entities/NormalTypes/CourseStartingYears.entity';
import { CreateCourseStartingYearsInput } from 'src/inputTypes/create-course-startingYears.input';
import { CourseStartingYearsService } from './course-starting-years.service';

@Resolver()
export class CourseStartingYearsResolver {
  constructor(private courseStartingYearsService: CourseStartingYearsService) {}

  @Query((returns) => [CourseStartingYears])
  async courseStartingYears(): Promise<CourseStartingYears[]> {
    return this.courseStartingYearsService.findAll();
  }

  @Query((returns) => [CourseStartingYears])
  async coursesFromStartingYears(
    @Args('yearTaught') yearTaught: number,
  ): Promise<CourseStartingYears[]> {
    return this.courseStartingYearsService.findAllCoursesConnectedToStartingYear(
      yearTaught,
    );
  }

  @Query((returns) => [CourseStartingYears])
  async startingYearsFromCourse(
    @Args('courseId') courseId: string,
  ): Promise<CourseStartingYears[]> {
    return this.courseStartingYearsService.findAllStartingYearsConnectedToCourse(
      courseId,
    );
  }

  @Mutation((returns) => CourseStartingYears)
  async createNewCourseEducations(
    @Args('createCourseStartingYearsInput')
    createCourseStartingYearsInput: CreateCourseStartingYearsInput,
  ): Promise<CourseStartingYears> {
    return this.courseStartingYearsService.createCourseStartingYears(
      createCourseStartingYearsInput,
    );
  }
}
