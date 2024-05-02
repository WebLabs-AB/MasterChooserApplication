import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EducationCourseService } from './education-course.service';
import { EducationCourse } from 'src/entities';
import { CreateCourseEducationsInput } from 'src/inputTypes/create/create-course-educations.input';
import { RemoveCourseEducationsInput } from 'src/inputTypes/remove/remove-course-educations.input';

@Resolver()
export class EducationCourseResolver {
  constructor(private educationCourseService: EducationCourseService) {}

  // Returns all EducationCourse obejcts from the database in a list.
  @Query((returns) => [EducationCourse])
  async educationCourse(): Promise<EducationCourse[]> {
    return this.educationCourseService.findAll();
  }

  // Creates a new EducationCourse object for the database.
  @Mutation((returns) => EducationCourse)
  async createEducationCourse(
    @Args('createEducationCourseInput')
    createEducationCourseInput: CreateCourseEducationsInput,
  ): Promise<EducationCourse> {
    return this.educationCourseService.createEducationCourse(
      createEducationCourseInput,
    );
  }

  // Removes a EducationCourse object from the database.
  @Mutation((returns) => EducationCourse)
  async removeEducationCourse(
    @Args('removeEducationCourseInput')
    removeEducationCourseInput: RemoveCourseEducationsInput,
  ): Promise<EducationCourse> {
    return this.educationCourseService.removeEducationCourse(
      removeEducationCourseInput,
    );
  }

  // Return all main areas that belong to a specific course.
  @Query((returns) => [EducationCourse])
  async courseFromMainArea(
    @Args('mainAreaName') mainAreaName: string,
  ): Promise<EducationCourse[]> {
    return this.educationCourseService.courseFromEducation(mainAreaName);
  }
}
