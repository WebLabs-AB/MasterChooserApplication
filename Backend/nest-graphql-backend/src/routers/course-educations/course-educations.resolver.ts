import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseEducations } from 'src/entities/NormalTypes/deprecated/CourseEducations.entity';
import { CreateCourseEducationsInput } from 'src/inputTypes/create-course-educations.input';
import { CourseEducationsService } from './course-educations.service';

@Resolver((of) => CourseEducations)
export class CourseEducationsResolver {
  constructor(private courseEducationsService: CourseEducationsService) {}

  @Query((returns) => [CourseEducations])
  async courseEducations(): Promise<CourseEducations[]> {
    return this.courseEducationsService.findAll();
  }

  @Query((returns) => [CourseEducations])
  async coursesFromEducation(
    @Args('educationId') educationId: string,
  ): Promise<CourseEducations[]> {
    return this.courseEducationsService.findAllCoursesConnectedToEducation(
      educationId,
    );
  }

  @Query((returns) => [CourseEducations])
  async educationsFromCourse(
    @Args('courseId') courseId: string,
  ): Promise<CourseEducations[]> {
    return this.courseEducationsService.findAllEducationsConnectedToCourse(
      courseId,
    );
  }

  @Mutation((returns) => CourseEducations)
  async createNewCourseEducations(
    @Args('createCourseEducationsInput')
    createCourseEducationsInput: CreateCourseEducationsInput,
  ): Promise<CourseEducations> {
    return this.courseEducationsService.createCourseEducations(
      createCourseEducationsInput,
    );
  }
}
