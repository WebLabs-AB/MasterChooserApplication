import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseMainArea } from 'src/entities/NormalTypes/CourseMainArea.entity';
import { CourseMainAreaService } from './course-main-area.service';
import { CreateCourseMainAreaInput } from 'src/inputTypes/create/create-course-mainArea.input';
import { RemoveCourseMainAreaInput } from 'src/inputTypes/remove/remove-course-mainArea.input';

@Resolver()
export class CourseMainAreaResolver {
  constructor(private courseMainareaService: CourseMainAreaService) {}

  // Returns all CourseMainArea obejcts from the database in a list.
  @Query((returns) => [CourseMainArea])
  async courseMainArea(): Promise<CourseMainArea[]> {
    return this.courseMainareaService.findAll();
  }

  // Creates a new CourseMainArea object for the database.
  @Mutation((returns) => CourseMainArea)
  async createCourseMainArea(
    @Args('createCourseMainAreaInput')
    createCourseMainAreaInput: CreateCourseMainAreaInput,
  ): Promise<CourseMainArea> {
    return this.courseMainareaService.createCourseMainArea(
      createCourseMainAreaInput,
    );
  }

  // Removes a CourseMainArea object from the database.
  @Mutation((returns) => CourseMainArea)
  async removeCourseMainArea(
    @Args('removeCourseMainAreaInput')
    removeCourseMainAreaInput: RemoveCourseMainAreaInput,
  ): Promise<CourseMainArea> {
    return this.courseMainareaService.removeCourseMainArea(
      removeCourseMainAreaInput,
    );
  }

  // Return all main areas that belong to a specific course.
  @Query((returns) => [CourseMainArea])
  async courseFromMainArea(
    @Args('mainAreaName') mainAreaName: string,
  ): Promise<CourseMainArea[]> {
    return this.courseMainareaService.courseFromMainArea(mainAreaName);
  }

  // Return all courses that belong to a specific main area.
  @Query((returns) => [CourseMainArea])
  async mainAreaFromCourse(
    @Args('courseId') courseId: string,
  ): Promise<CourseMainArea[]> {
    return this.courseMainareaService.mainAreaFromCourse(courseId);
  }
}
