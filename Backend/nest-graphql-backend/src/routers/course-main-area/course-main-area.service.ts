import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseMainArea } from 'src/entities';
import { CreateCourseMainAreaInput } from 'src/inputTypes/create-course-mainArea.input';
import { Repository } from 'typeorm';

@Injectable()
export class CourseMainAreaService {
  constructor(
    @InjectRepository(CourseMainArea)
    private courseMainAreasRepository: Repository<CourseMainArea>,
  ) {}

  /**
   * Function: Finds all CourseMainArea objects in the database
   * input: Null
   * @returns All CourseMainArea objects
   */
  async findAll(): Promise<CourseMainArea[]> {
    return this.courseMainAreasRepository.find(); // SELECT * FROM coursemainareas;
  }

  // Creates a ManyToMany connection between Course and MainArea.
  async createCourseMainArea(
    createCourseMainAreasInput: CreateCourseMainAreaInput,
  ): Promise<CourseMainArea> {
    if (
      await this.doesCourseMainAreaExists(
        createCourseMainAreasInput.courseId,
        createCourseMainAreasInput.mainAreaName,
      )
    ) {
      throw new HttpException(
        'Course main area already exists',
        HttpStatus.CONFLICT,
      );
    }

    const newCourseEducations = this.courseMainAreasRepository.create(
      createCourseMainAreasInput,
    );
    return this.courseMainAreasRepository.save(newCourseEducations);
  }

  async doesCourseMainAreaExists(
    courseId: string,
    mainAreaName: string,
  ): Promise<boolean> {
    const courseMainAreas = await this.courseMainAreasRepository.findOne({
      where: { courseId: courseId, mainAreaName: mainAreaName },
    });

    if (!courseMainAreas) {
      return false;
    } else {
      return true;
    }
  }
}
