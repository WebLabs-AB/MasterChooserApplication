import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  /**
   * Returns all courses in the database.
   * @returns A list of all Course objects.
   */
  async findAll(): Promise<Course[]> {
    return await this.courseRepo.find();
  }

  /**
   * Returns the course matching the given course ID.
   * @param courseId The course ID, which uniquely identifies the course.
   * @returns The Course object, or null if no course exists with the given course ID.
   */
  async findById(courseId: string) {
    return await this.courseRepo.findOne({
        where: { courseId: courseId }
    });
  }

  /**
   * Deletes a course by its ID.
   * @param courseId The ID of the course.
   */
  async deleteByid(courseId: string): Promise<void> {
    if (!await this.doesCourseExists(courseId)) {
      // TODO: throw some kind of error
    }

    await this.courseRepo.delete({
      courseId: courseId
    });
  }

  /**
   * Checks if a course exists, given its course ID.
   * @param coruseId The course ID to check.
   * @returns A boolean representing whether the object exists or not.
   */
  async doesCourseExists(coruseId: string) : Promise<boolean> {
    const course = this.findById(coruseId);

    return course !== null;
  }
}
