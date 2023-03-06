import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Course, CoursePeriods, Period } from 'src/entities';
import { Repository } from 'typeorm';
import { CoursePeriodsService } from './course-periods.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let coursePeriodsService: CoursePeriodsService;

const coursePeriodsRepository: MockType<Repository<CoursePeriods>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CoursePeriodsService,
      {
        provide: getRepositoryToken(CoursePeriods),
        useValue: coursePeriodsRepository,
      },
    ],
  }).compile();

  coursePeriodsService = module.get(CoursePeriodsService);
});

afterEach(() => {
  coursePeriodsRepository.findOne.mockClear();
});

describe('CoursePeriodsService', () => {
  test('should be defined', () => {
    expect(coursePeriodsService).toBeDefined();
  });
});

describe('Test createCoursePeriods func', () => {
  test('should create a new course period', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const period = new Period();
    period.value = 1;

    const coursePeriod = new CoursePeriods();
    coursePeriod.course = course;
    coursePeriod.period = period;
    coursePeriod.courseId = course.courseId;
    coursePeriod.periodValue = period.value;

    coursePeriodsRepository.save.mockReturnValue(coursePeriod);
    coursePeriodsRepository.create.mockReturnValue(coursePeriod);

    const newCoursePeriod = await coursePeriodsService.createCoursePeriods(
      coursePeriod,
    );
    expect(coursePeriodsRepository.create).toHaveBeenCalledTimes(1);
    expect(newCoursePeriod).toEqual(coursePeriod);
  });

  test('should throw an error when creating a duplicate course period', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const period = new Period();
    period.value = 1;

    const coursePeriod = new CoursePeriods();
    coursePeriod.course = course;
    coursePeriod.period = period;
    coursePeriod.courseId = course.courseId;
    coursePeriod.periodValue = period.value;

    coursePeriodsRepository.save.mockReturnValue(coursePeriod);
    coursePeriodsRepository.create.mockReturnValue(coursePeriod);

    await coursePeriodsService.createCoursePeriods(coursePeriod);

    coursePeriodsRepository.findOne.mockReturnValue(coursePeriod);

    await expect(
      coursePeriodsService.createCoursePeriods(coursePeriod),
    ).rejects.toThrowError(UserInputError);
  });
});
