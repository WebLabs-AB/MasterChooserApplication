import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CoursePeriods } from 'src/entities/NormalTypes/deprecated/CoursePeriods.entity';
import { CreateCoursePeriodsInput } from 'src/inputTypes/create-course-periods.input';
import { CoursePeriodsService } from './course-periods.service';

@Resolver()
export class CoursePeriodsResolver {
  constructor(private coursePeriodsService: CoursePeriodsService) {}

  @Query((returns) => [CoursePeriods])
  async coursePeriods(): Promise<CoursePeriods[]> {
    return this.coursePeriodsService.findAll();
  }

  @Query((returns) => [CoursePeriods])
  async coursesFromPeriod(
    @Args('periodValue') periodValue: number,
  ): Promise<CoursePeriods[]> {
    return this.coursePeriodsService.findAllCoursesConnectedToPeriod(
      periodValue,
    );
  }

  @Query((returns) => [CoursePeriods])
  async periodsFromCourse(
    @Args('courseId') courseId: string,
  ): Promise<CoursePeriods[]> {
    return this.coursePeriodsService.findAllPeriodsConnectedToCourse(courseId);
  }

  @Mutation((returns) => CoursePeriods)
  async createNewCoursePeriods(
    @Args('createCoursePeriodsInput')
    createCoursePeriodsInput: CreateCoursePeriodsInput,
  ): Promise<CoursePeriods> {
    return this.coursePeriodsService.createCoursePeriods(
      createCoursePeriodsInput,
    );
  }
}
