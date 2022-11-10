import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseMainAreas } from 'src/entities/NormalTypes/CourseMainAreas.entity';
import { CreateCourseMainAreasInput } from 'src/inputTypes/create-course-mainArea.input';
import { CourseMainareasService } from './course-mainareas.service';

@Resolver((of) => CourseMainAreas)
export class CourseMainareasResolver {
  constructor(private courseMainareasService: CourseMainareasService) {}

  @Query((returns) => [CourseMainAreas])
  async courseMainAreas(): Promise<CourseMainAreas[]> {
    return this.courseMainareasService.findAll();
  }

  @Query((returns) => [CourseMainAreas])
  async coursesFromMainArea(
    @Args('type') educationId: string,
  ): Promise<CourseMainAreas[]> {
    return this.courseMainareasService.findAllCoursesConnectedToMainArea(
      educationId,
    );
  }

  @Query((returns) => [CourseMainAreas])
  async mainAreasFromCourse(
    @Args('courseId') courseId: string,
  ): Promise<CourseMainAreas[]> {
    return this.courseMainareasService.findAllMainAreasConnectedToCourse(
      courseId,
    );
  }

  @Mutation((returns) => CourseMainAreas)
  async createNewCourseEducations(
    @Args('createCourseMainAreasInput')
    createCourseMainAreasInput: CreateCourseMainAreasInput,
  ): Promise<CourseMainAreas> {
    return this.courseMainareasService.createCourseMainAreas(
      createCourseMainAreasInput,
    );
  }
}
