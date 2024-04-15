import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CourseMainArea } from 'src/entities/NormalTypes/CourseMainArea.entity';
import { CourseMainAreaService } from './course-main-area.service';
import { CreateCourseMainAreaInput } from 'src/inputTypes/create-course-mainArea.input';

@Resolver()
export class CourseMainAreaResolver {
  constructor(private courseMainareaService: CourseMainAreaService) {}

  // Returns all CourseMainArea obejcts from database in a list.
  @Query((returns) => [CourseMainArea])
  async courseMainArea(): Promise<CourseMainArea[]> {
    return this.courseMainareaService.findAll();
  }

  @Mutation((returns) => CourseMainArea)
  async createCourseMainArea(
    @Args('createCourseMainAreaInput')
    createCourseMainAreaInput: CreateCourseMainAreaInput,
  ): Promise<CourseMainArea> {
    return this.courseMainareaService.createCourseMainArea(
      createCourseMainAreaInput,
    );
  }
}
