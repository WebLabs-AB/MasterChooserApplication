import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Course } from 'src/entities/NormalTypes/deprecated/Course.entity';
import { CreateCourseEducationsInput } from 'src/inputTypes/create-course-educations.input';
import { CreateCourseMainAreasInput } from 'src/inputTypes/create-course-mainArea.input';
import { CreateCoursePeriodsInput } from 'src/inputTypes/create-course-periods.input';
import { CreateCourseStartingYearsInput } from 'src/inputTypes/create-course-startingYears.input';
import { CreateCourseInput } from 'src/inputTypes/create-course.input';
import { CourseService } from './course.service';

@Resolver((of) => Course)
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  // Query that returns all courses from the database.
  @Query((returns) => [Course])
  async courses(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Mutation((returns) => Course)
  async createNewCourse(
    @Args('createCourseInput')
    createCourseInput: CreateCourseInput,
    @Args({
      name: 'createCourseEducationsInput',
      type: () => [CreateCourseEducationsInput],
    })
    createCourseEducationsInput: CreateCourseEducationsInput[],
    @Args({
      name: 'createCoursePeriodsInput',
      type: () => [CreateCoursePeriodsInput],
    })
    createCoursePeriodsInput: CreateCoursePeriodsInput[],
    @Args({
      name: 'createCourseMainAreasInput',
      type: () => [CreateCourseMainAreasInput],
    })
    createCourseMainAreasInput: CreateCourseMainAreasInput[],
    @Args({
      name: 'createCourseStartingYearsInput',
      type: () => [CreateCourseStartingYearsInput],
    })
    createCourseStartingYearsInput: CreateCourseStartingYearsInput[],
  ): Promise<Course> {
    return this.courseService.createCourse(
      createCourseInput,
      createCourseEducationsInput,
      createCoursePeriodsInput,
      createCourseMainAreasInput,
      createCourseStartingYearsInput,
    );
  }
}
