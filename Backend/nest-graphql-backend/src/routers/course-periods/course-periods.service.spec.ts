import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
  jest.resetAllMocks();
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
    ).rejects.toThrowError(Error);
  });
});

describe('Test findAllCoursesConnectedToPeriod func', () => {
  test('should return all courses connected to a specific period', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const course2 = new Course();
    course2.courseId = 'TDDD20';
    course2.courseName = 'Avancerad Webbprogrammering';
    course2.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const period = new Period();
    period.value = 1;

    const coursePeriod = new CoursePeriods();
    coursePeriod.course = course;
    coursePeriod.period = period;
    coursePeriod.courseId = course.courseId;
    coursePeriod.periodValue = period.value;

    const coursePeriod2 = new CoursePeriods();
    coursePeriod2.course = course2;
    coursePeriod2.period = period;
    coursePeriod2.courseId = course2.courseId;
    coursePeriod2.periodValue = period.value;

    period.courseConnection = [coursePeriod, coursePeriod2];
    course.periodConnection = [coursePeriod];
    course2.periodConnection = [coursePeriod2];

    coursePeriodsRepository.find.mockReturnValue([course, course2]);

    const allCourses =
      await coursePeriodsService.findAllCoursesConnectedToPeriod(period.value);

    expect(allCourses).toEqual([course, course2]);
  });
});

describe('Test findAllPeriodsConnectedToCourse func', () => {
  test('should return all periods connected to a specific course', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const period = new Period();
    period.value = 1;

    const period2 = new Period();
    period2.value = 2;

    const coursePeriod = new CoursePeriods();
    coursePeriod.course = course;
    coursePeriod.period = period;
    coursePeriod.courseId = course.courseId;
    coursePeriod.periodValue = period.value;

    coursePeriodsRepository.find.mockReturnValue([period, period2]);

    const allCourses =
      await coursePeriodsService.findAllPeriodsConnectedToCourse(
        course.courseId,
      );

    expect(allCourses).toEqual([period, period2]);
  });
});

describe('Test findAll func', () => {
  test('should return all course-periods', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const course2 = new Course();
    course2.courseId = 'TDDD20';
    course2.courseName = 'Avancerad Webbprogrammering';
    course2.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const period = new Period();
    period.value = 1;

    const coursePeriod = new CoursePeriods();
    coursePeriod.course = course;
    coursePeriod.period = period;
    coursePeriod.courseId = course.courseId;
    coursePeriod.periodValue = period.value;

    const coursePeriod2 = new CoursePeriods();
    coursePeriod2.course = course2;
    coursePeriod2.period = period;
    coursePeriod2.courseId = course2.courseId;
    coursePeriod2.periodValue = period.value;

    coursePeriodsRepository.find.mockReturnValue([coursePeriod, coursePeriod2]);

    const allCourses = await coursePeriodsService.findAll();

    expect(allCourses).toEqual([coursePeriod, coursePeriod2]);
  });
});
