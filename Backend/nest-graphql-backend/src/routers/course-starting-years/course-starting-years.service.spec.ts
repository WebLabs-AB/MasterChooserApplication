import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Course, CourseStartingYears, StartingYear } from 'src/entities';
import { Repository } from 'typeorm';
import { CourseStartingYearsService } from './course-starting-years.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let courseStartingYearsService: CourseStartingYearsService;

const courseStartingYearsRepository: MockType<Repository<CourseStartingYears>> =
  {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CourseStartingYearsService,
      {
        provide: getRepositoryToken(CourseStartingYears),
        useValue: courseStartingYearsRepository,
      },
    ],
  }).compile();

  courseStartingYearsService = module.get(CourseStartingYearsService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('CourseStartingYearsService', () => {
  test('should be defined', () => {
    expect(courseStartingYearsService).toBeDefined();
  });
});

describe('Test createCourseStartingYears func', () => {
  test('should create a new ', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const courseStartingYear = new CourseStartingYears();
    courseStartingYear.course = course;
    courseStartingYear.year = startingYear;
    courseStartingYear.hp = 6;
    courseStartingYear.level = 'A1X';
    courseStartingYear.schemaBlock = 'A';
    courseStartingYear.courseId = course.courseId;
    courseStartingYear.yearTaught = startingYear.startingYear;

    startingYear.courseToStartingYear = [courseStartingYear];
    course.courseToStartingYear = [courseStartingYear];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear);

    const newCourseStartingYear =
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYear,
      );

    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(1);
    expect(newCourseStartingYear).toEqual(courseStartingYear);
  });

  test('should throw an error when creating a duplicate course-starting-years', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const courseStartingYear = new CourseStartingYears();
    courseStartingYear.course = course;
    courseStartingYear.year = startingYear;
    courseStartingYear.hp = 6;
    courseStartingYear.level = 'A1X';
    courseStartingYear.schemaBlock = 'A';
    courseStartingYear.courseId = course.courseId;
    courseStartingYear.yearTaught = startingYear.startingYear;

    startingYear.courseToStartingYear = [courseStartingYear];
    course.courseToStartingYear = [courseStartingYear];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear);

    await courseStartingYearsService.createCourseStartingYears(
      courseStartingYear,
    );

    courseStartingYearsRepository.findOne.mockReturnValue(courseStartingYear);

    await expect(
      courseStartingYearsService.createCourseStartingYears(courseStartingYear),
    ).rejects.toThrowError(UserInputError);
  });
});

describe('Test findAllCoursesConnectedToStartingYear func', () => {
  test('should return all courses connected to a specific starting year', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const course2 = new Course();
    course2.courseId = 'TDDD20';
    course2.courseName = 'Avancerad Webbprogrammering';
    course2.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const courseStartingYear = new CourseStartingYears();
    courseStartingYear.course = course;
    courseStartingYear.year = startingYear;
    courseStartingYear.hp = 6;
    courseStartingYear.level = 'A1X';
    courseStartingYear.schemaBlock = 'A';
    courseStartingYear.courseId = course.courseId;
    courseStartingYear.yearTaught = startingYear.startingYear;

    const courseStartingYear2 = new CourseStartingYears();
    courseStartingYear2.course = course2;
    courseStartingYear2.year = startingYear;
    courseStartingYear2.hp = 8;
    courseStartingYear2.level = 'A1X';
    courseStartingYear2.schemaBlock = 'B';
    courseStartingYear2.courseId = course2.courseId;
    courseStartingYear2.yearTaught = startingYear.startingYear;

    course.courseToStartingYear = [courseStartingYear];
    course2.courseToStartingYear = [courseStartingYear2];
    startingYear.courseToStartingYear = [
      courseStartingYear,
      courseStartingYear2,
    ];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYear,
      ),
    ).toEqual(courseStartingYear);
    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(1);

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear2);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear2);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYear2,
      ),
    ).toEqual(courseStartingYear2);
    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(2);

    courseStartingYearsRepository.find.mockReturnValue([course, course2]);

    const allCourses =
      await courseStartingYearsService.findAllCoursesConnectedToStartingYear(
        startingYear.startingYear,
      );
    expect(allCourses).toEqual([course, course2]);
  });
});

describe('Test findAllStartingYearsConnectedToCourse func', () => {
  test('should return all starting years connected to a specific course', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const startingYear2 = new StartingYear();
    startingYear2.startingYear = 2020;

    const courseStartingYear = new CourseStartingYears();
    courseStartingYear.course = course;
    courseStartingYear.year = startingYear;
    courseStartingYear.hp = 6;
    courseStartingYear.level = 'A1X';
    courseStartingYear.schemaBlock = 'A';
    courseStartingYear.courseId = course.courseId;
    courseStartingYear.yearTaught = startingYear.startingYear;

    const courseStartingYear2 = new CourseStartingYears();
    courseStartingYear2.course = course;
    courseStartingYear2.year = startingYear2;
    courseStartingYear2.hp = 6;
    courseStartingYear2.level = 'A1X';
    courseStartingYear2.schemaBlock = 'B';
    courseStartingYear2.courseId = course.courseId;
    courseStartingYear2.yearTaught = startingYear2.startingYear;

    course.courseToStartingYear = [courseStartingYear, courseStartingYear2];
    startingYear.courseToStartingYear = [courseStartingYear];
    startingYear2.courseToStartingYear = [courseStartingYear2];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYear,
      ),
    ).toEqual(courseStartingYear);
    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(1);

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear2);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear2);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYear2,
      ),
    ).toEqual(courseStartingYear2);
    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(2);

    courseStartingYearsRepository.find.mockReturnValue([
      startingYear,
      startingYear2,
    ]);

    const allStartingYears =
      await courseStartingYearsService.findAllStartingYearsConnectedToCourse(
        course.courseId,
      );
    expect(allStartingYears).toEqual([startingYear, startingYear2]);
  });
});

describe('Test findall func', () => {
  test('should retrieve all course-startingyears', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const startingYear2 = new StartingYear();
    startingYear2.startingYear = 2020;

    const courseStartingYear = new CourseStartingYears();
    courseStartingYear.course = course;
    courseStartingYear.year = startingYear;
    courseStartingYear.hp = 6;
    courseStartingYear.level = 'A1X';
    courseStartingYear.schemaBlock = 'A';
    courseStartingYear.courseId = course.courseId;
    courseStartingYear.yearTaught = startingYear.startingYear;

    const courseStartingYear2 = new CourseStartingYears();
    courseStartingYear2.course = course;
    courseStartingYear2.year = startingYear2;
    courseStartingYear2.hp = 6;
    courseStartingYear2.level = 'A1X';
    courseStartingYear2.schemaBlock = 'B';
    courseStartingYear2.courseId = course.courseId;
    courseStartingYear2.yearTaught = startingYear2.startingYear;

    course.courseToStartingYear = [courseStartingYear, courseStartingYear2];
    startingYear.courseToStartingYear = [courseStartingYear];
    startingYear2.courseToStartingYear = [courseStartingYear2];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear);

    await courseStartingYearsService.createCourseStartingYears(
      courseStartingYear,
    );

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear2);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYear2);

    await courseStartingYearsService.createCourseStartingYears(
      courseStartingYear2,
    );

    courseStartingYearsRepository.find.mockReturnValue([
      courseStartingYear,
      courseStartingYear2,
    ]);

    const allCourseStartingYears = await courseStartingYearsService.findAll();

    expect(allCourseStartingYears).toEqual([
      courseStartingYear,
      courseStartingYear2,
    ]);
  });
});
