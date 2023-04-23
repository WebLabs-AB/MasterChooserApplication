import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Course, CourseEducations, Education, University } from 'src/entities';
import { Repository } from 'typeorm';
import { CourseEducationsService } from './course-educations.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let courseEducationsService: CourseEducationsService;

const courseEducationsRepository: MockType<Repository<CourseEducations>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CourseEducationsService,
      {
        provide: getRepositoryToken(CourseEducations),
        useValue: courseEducationsRepository,
      },
    ],
  }).compile();

  courseEducationsService = module.get(CourseEducationsService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('CourseEducationsService', () => {
  test('should be defined', () => {
    expect(courseEducationsService).toBeDefined();
  });
});

describe('Test createCourseEducations func', () => {
  test('should create a new course-education', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const university = new University();
    university.universityName = 'LIU';

    const education = new Education();
    education.id = 'edd22';
    education.symbol = 'U';
    education.university = university;

    const courseEducation = new CourseEducations();
    courseEducation.course = course;
    courseEducation.education = education;
    courseEducation.courseId = course.courseId;
    courseEducation.educationId = education.id;

    courseEducationsRepository.save.mockReturnValue(courseEducation);
    courseEducationsRepository.create.mockReturnValue(courseEducation);

    const newCourseEducation =
      await courseEducationsService.createCourseEducations(courseEducation);

    expect(courseEducationsRepository.create).toHaveBeenCalledTimes(1);
    expect(newCourseEducation).toEqual(courseEducation);
  });

  test('should throw an error when creating a duplicate course-education', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const university = new University();
    university.universityName = 'LIU';

    const education = new Education();
    education.id = 'edd22';
    education.symbol = 'U';
    education.university = university;

    const courseEducation = new CourseEducations();
    courseEducation.course = course;
    courseEducation.education = education;
    courseEducation.courseId = course.courseId;
    courseEducation.educationId = education.id;

    courseEducationsRepository.save.mockReturnValue(courseEducation);
    courseEducationsRepository.create.mockReturnValue(courseEducation);

    await courseEducationsService.createCourseEducations(courseEducation);

    courseEducationsRepository.findOne.mockReturnValue(courseEducation);

    await expect(
      courseEducationsService.createCourseEducations(courseEducation),
    ).rejects.toThrowError(UserInputError);
  });
});

describe('Test findAllCoursesConnectedToEducation func', () => {
  test('should return all courses connected to a specific education', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const course2 = new Course();
    course2.courseId = 'TDDD20';
    course2.courseName = 'Avancerad Webbprogrammering';
    course2.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const university = new University();
    university.universityName = 'LIU';

    const education = new Education();
    education.id = 'edd22';
    education.symbol = 'U';
    education.university = university;

    const courseEducation = new CourseEducations();
    courseEducation.course = course;
    courseEducation.education = education;
    courseEducation.courseId = course.courseId;
    courseEducation.educationId = education.id;

    const courseEducation2 = new CourseEducations();
    courseEducation2.course = course2;
    courseEducation2.education = education;
    courseEducation2.courseId = course2.courseId;
    courseEducation2.educationId = education.id;

    course.educationConnection = [courseEducation];
    course2.educationConnection = [courseEducation2];
    education.courseConnection = [courseEducation, courseEducation2];

    courseEducationsRepository.save.mockReturnValue(courseEducation);
    courseEducationsRepository.create.mockReturnValue(courseEducation);

    await courseEducationsService.createCourseEducations(courseEducation);

    courseEducationsRepository.find.mockReturnValue([course, course2]);

    const allCourseEducations =
      await courseEducationsService.findAllCoursesConnectedToEducation(
        education.id,
      );

    expect(allCourseEducations).toEqual([course, course2]);
  });
});

describe('Test findAllEducationsConnectedToCourse func', () => {
  test('should return all educations connected to a specific course', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const university = new University();
    university.universityName = 'LIU';

    const education = new Education();
    education.id = 'edd22';
    education.symbol = 'U';
    education.university = university;

    const education2 = new Education();
    education2.id = 'edd23';
    education2.symbol = 'D';
    education2.university = university;

    const courseEducation = new CourseEducations();
    courseEducation.course = course;
    courseEducation.education = education;
    courseEducation.courseId = course.courseId;
    courseEducation.educationId = education.id;

    const courseEducation2 = new CourseEducations();
    courseEducation2.course = course;
    courseEducation2.education = education2;
    courseEducation2.courseId = course.courseId;
    courseEducation2.educationId = education2.id;

    course.educationConnection = [courseEducation, courseEducation2];
    education.courseConnection = [courseEducation];
    education2.courseConnection = [courseEducation2];

    courseEducationsRepository.save.mockReturnValue(courseEducation);
    courseEducationsRepository.create.mockReturnValue(courseEducation);

    expect(
      await courseEducationsService.createCourseEducations(courseEducation),
    ).toEqual(courseEducation);
    expect(courseEducationsRepository.create).toHaveBeenCalledTimes(1);

    courseEducationsRepository.save.mockReturnValue(courseEducation2);
    courseEducationsRepository.create.mockReturnValue(courseEducation2);

    expect(
      await courseEducationsService.createCourseEducations(courseEducation2),
    ).toEqual(courseEducation2);
    expect(courseEducationsRepository.create).toHaveBeenCalledTimes(2);

    courseEducationsRepository.find.mockReturnValue([education, education2]);

    const allCourseEducations =
      await courseEducationsService.findAllEducationsConnectedToCourse(
        course.courseId,
      );

    expect(allCourseEducations).toEqual([education, education2]);
  });
});

describe('Test findall func', () => {
  test('should retrieve all course-educations', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const university = new University();
    university.universityName = 'LIU';

    const education = new Education();
    education.id = 'edd22';
    education.symbol = 'U';
    education.university = university;

    const education2 = new Education();
    education2.id = 'edd23';
    education2.symbol = 'D';
    education2.university = university;

    const courseEducation = new CourseEducations();
    courseEducation.course = course;
    courseEducation.education = education;
    courseEducation.courseId = course.courseId;
    courseEducation.educationId = education.id;

    const courseEducation2 = new CourseEducations();
    courseEducation2.course = course;
    courseEducation2.education = education2;
    courseEducation2.courseId = course.courseId;
    courseEducation2.educationId = education2.id;

    course.educationConnection = [courseEducation, courseEducation2];
    education.courseConnection = [courseEducation];
    education2.courseConnection = [courseEducation2];

    courseEducationsRepository.save.mockReturnValue(courseEducation);
    courseEducationsRepository.create.mockReturnValue(courseEducation);

    await courseEducationsService.createCourseEducations(courseEducation);

    courseEducationsRepository.save.mockReturnValue(courseEducation2);
    courseEducationsRepository.create.mockReturnValue(courseEducation2);

    await courseEducationsService.createCourseEducations(courseEducation2);

    courseEducationsRepository.find.mockReturnValue([
      courseEducation,
      courseEducation2,
    ]);

    const allCourseEducations = await courseEducationsService.findAll();

    expect(allCourseEducations).toEqual([courseEducation, courseEducation2]);
  });
});
