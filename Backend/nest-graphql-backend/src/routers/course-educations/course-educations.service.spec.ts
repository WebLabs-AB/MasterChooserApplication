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
  courseEducationsRepository.findOne.mockReturnValue(null);
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
    course.courseId = 'TDDD20';
    course.courseName = 'Avancerad Webbprogrammering';
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

    course.educationConnection = [courseEducation];
    course2.educationConnection = [courseEducation];
    education.courseConnection = [courseEducation];

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
