import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Course } from 'src/entities/NormalTypes/Course.entity';
import { CreateCourseEducationsInput } from 'src/inputTypes/create-course-educations.input';
import { CreateCourseMainAreasInput } from 'src/inputTypes/create-course-mainArea.input';
import { CreateCoursePeriodsInput } from 'src/inputTypes/create-course-periods.input';
import { CreateCourseStartingYearsInput } from 'src/inputTypes/create-course-startingYears.input';
import { CreateCourseInput } from 'src/inputTypes/create-course.input';
import { Repository } from 'typeorm';
import { CourseEducationsService } from '../course-educations/course-educations.service';
import { CourseMainareasService } from '../course-mainareas/course-mainareas.service';
import { CoursePeriodsService } from '../course-periods/course-periods.service';
import { CourseStartingYearsService } from '../course-starting-years/course-starting-years.service';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private courseEducationsService: CourseEducationsService,
    private coursePeriodsService: CoursePeriodsService,
    private courseMainAreasService: CourseMainareasService,
    private courseStartingYears: CourseStartingYearsService,
  ) {}

  // Creates a new course and saves it in the database.
  async createCourse(
    createCourseInput: CreateCourseInput,
    educationsList: CreateCourseEducationsInput[],
    periodsList: CreateCoursePeriodsInput[],
    mainAreasList: CreateCourseMainAreasInput[],
    yearTaughtList: CreateCourseStartingYearsInput[],
  ): Promise<Course> {
    if (await this.doesCourseExists(createCourseInput.courseId)) {
      throw new UserInputError('That course already exists');
    }
    const newCourse = this.courseRepository.create(createCourseInput);

    const university = await this.studentService.getUniversity(
      createCourseInput.universityName,
    );

    const teacher = await this.teacherService.findOne(
      createCourseInput.teacherEmail,
    );

    newCourse.teacher = teacher;
    newCourse.university = university;
    await this.courseRepository.save(newCourse); // So that courseId can be used as foreign key.

    educationsList.forEach((educationInput) => {
      this.courseEducationsService.createCourseEducations(educationInput);
    });

    periodsList.forEach((periodInput) => {
      this.coursePeriodsService.createCoursePeriods(periodInput);
    });

    mainAreasList.forEach((mainAreaInput) => {
      this.courseMainAreasService.createCourseMainAreas(mainAreaInput);
    });

    yearTaughtList.forEach((yearTaughtInput) => {
      this.courseStartingYears.createCourseStartingYears(yearTaughtInput);
    });

    return await this.courseRepository.save(newCourse); // Updates the course and returns it.
  }

  // Find all courses from the courses table.
  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find(); // SELECT * FROM courses;
  }

  // Finds a specific course or returns null.
  async findOne(courseId: string): Promise<Course> {
    return await this.courseRepository.findOne({
      where: { courseId: courseId },
    });
  }

  // Checks if a course exists from courseId.
  async doesCourseExists(courseId: string): Promise<boolean> {
    const course = await this.courseRepository.findOne({
      where: { courseId: courseId },
    });

    if (!course) {
      return false;
    } else {
      return true;
    }
  }
}
