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

  // Gets a course by its course ID.
  @Query((returns) => Course)
  async getCourseById(courseId: string): Promise<Course> {
    return this.courseService.findById(courseId);
  }
}
