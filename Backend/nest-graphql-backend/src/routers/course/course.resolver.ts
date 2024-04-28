import { Query, Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';
import { Course } from 'src/entities/NormalTypes/Course.entity';

@Resolver()
export class CourseResolver {
  constructor(private courseService: CourseService) {}

  // Gets all courses.
  @Query((returns) => [Course])
  async getCourses(): Promise<Course[]> {
    return this.courseService.findAll();
  }
}
