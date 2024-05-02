import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Course,
  CourseMainArea,
  Education,
  EducationCourse,
} from 'src/entities';
import { CreateCourseEducationsInput } from 'src/inputTypes/create/create-course-educations.input';
import { RemoveCourseEducationsInput } from 'src/inputTypes/remove/remove-course-educations.input';
import { UpdateCourseEducationsInput } from 'src/inputTypes/update/update-course-educations.input';
import { Repository } from 'typeorm';

@Injectable()
export class EducationCourseService {
  constructor(
    @InjectRepository(EducationCourse)
    private educationCourseRepository: Repository<EducationCourse>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  /**
   * Description: Finds all EducationCourse objects in the database
   * Input: Null
   * @returns All EducationCourse objects
   */
  async findAll(): Promise<EducationCourse[]> {
    return this.educationCourseRepository.find();
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: courseID & mainAreaName
   * @param createEducationCourseInput Information needed to create new EducationCourse
   * @returns The saved new EducationCourse
   */
  async createEducationCourse(
    createEducationCourseInput: CreateCourseEducationsInput,
  ): Promise<EducationCourse> {
    if (
      await this.doesEducationCourseExists(
        createEducationCourseInput.courseId,
        createEducationCourseInput.educationId,
      )
    ) {
      throw new HttpException(
        'Course main area already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newEducationCourse = this.educationCourseRepository.create(
      createEducationCourseInput,
    );
    return this.educationCourseRepository.save(newEducationCourse);
  }

  /**
   * Description: Deletes a EducationCourse entity
   * from the database based on the provided criteria.
   * @param removeEducationCourseInput An object containing the courseId and
   * mainAreaName of the EducationCourse to be deleted.
   * @returns A Promise that resolves to the deleted EducationCourse entity.
   */
  async removeEducationCourse(
    removeEducationCourseInput: RemoveCourseEducationsInput,
  ): Promise<EducationCourse> {
    // Check if EducationCourse exists in the database.
    const existingEducationCourse =
      await this.educationCourseRepository.findOne({
        where: {
          courseId: removeEducationCourseInput.courseId,
          educationId: removeEducationCourseInput.educationId,
        },
      });

    if (!existingEducationCourse) {
      throw new HttpException(
        'Course main area do not exists',
        HttpStatus.NOT_FOUND,
      );
    }

    // If EducationCourse exists, delete it.
    return this.educationCourseRepository.remove(existingEducationCourse);
  }

  /**
   * Description: Creates a ManyToMany connection between Course and MainArea.
   * Input: courseID & list with MainArea primary keys.
   * @param updateEducationCourseInput An object containing the courseId and
   * a list of mainAreaNames..
   * @returns The new updated EducationCourses.
   */
  async updateEducationCourse(
    updateEducationCourseInput: UpdateCourseEducationsInput,
  ): Promise<EducationCourse[]> {
    const courseId = updateEducationCourseInput.courseId;
    const educationId = updateEducationCourseInput.educationId;

    // Find the course we want to update its relationship.
    const course = await this.courseRepository.findOneBy({ courseId });
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    // Remove existing EducationCourse connections for this course.
    await this.educationCourseRepository.delete({ course });

    // Create a new EducationCourse entity for each educationId.
    const updatedEducationCourses = educationId.map(async (educationId) => {
      const education = await this.educationRepository.findOneBy({
        name: educationId,
      });

      if (!education) {
        throw new Error(`Education with name ${educationId} not found`);
      }

      // Create a new EducationCourse connection.
      const educationCourse = this.educationCourseRepository.create({
        course,
        education,
        courseId: course.courseId,
        educationId: education.name,
      });

      // Save the new EducationCourse connection.
      return this.educationCourseRepository.save(educationCourse);
    });

    return Promise.all(updatedEducationCourses);
  }

  /**
   * Description: Retrieves EducationCourse entities from the database based
   * on the provided main area name.
   * @param educationId The name of the main area to retrieve EducationCourse
   * entities for.
   * @returns A Promise that resolves to an array of EducationCourse entities
   * matching the provided main area name.
   */
  async courseFromEducation(educationId: string): Promise<EducationCourse[]> {
    return await this.educationCourseRepository.find({
      where: { educationId: educationId },
    });
  }

  /**
   * Description: Check if a specific EducationCourse exists in the database.
   * @param courseId The ID of the course associated with the EducationCourse.
   * @param educationId The name of the main area associated with the EducationCourse.
   * @returns A Promise that resolves to a boolean indicating whether the EducationCourse exists.
   */
  async doesEducationCourseExists(
    courseId: string,
    educationId: string,
  ): Promise<boolean> {
    const educationCourse = await this.educationCourseRepository.findOne({
      where: { courseId: courseId, educationId: educationId },
    });

    if (!educationCourse) {
      return false;
    } else {
      return true;
    }
  }
}
