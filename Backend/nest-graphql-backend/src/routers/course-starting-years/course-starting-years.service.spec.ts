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
  courseStartingYearsRepository.findOne.mockReturnValue(null);
  courseStartingYearsRepository.create.mockClear();
});

describe('CourseStartingYearsService', () => {
  test('should be defined', () => {
    expect(courseStartingYearsService).toBeDefined();
  });
});

describe('Test createCourseEducations func', () => {
  test('should create a new course-education', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const courseStartingYears = new CourseStartingYears();
    courseStartingYears.course = course;
    courseStartingYears.year = startingYear;
    courseStartingYears.hp = 6;
    courseStartingYears.level = 'A1X';
    courseStartingYears.schemaBlock = 'A';
    courseStartingYears.courseId = course.courseId;
    courseStartingYears.yearTaught = startingYear.startingYear;

    startingYear.courseToStartingYear = [courseStartingYears];
    course.courseToStartingYear = [courseStartingYears];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears);

    const newCourseEducation =
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYears,
      );

    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(1);
    expect(newCourseEducation).toEqual(courseStartingYears);
  });

  test('should throw an error when creating a duplicate course-education', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const courseStartingYears = new CourseStartingYears();
    courseStartingYears.course = course;
    courseStartingYears.year = startingYear;
    courseStartingYears.hp = 6;
    courseStartingYears.level = 'A1X';
    courseStartingYears.schemaBlock = 'A';
    courseStartingYears.courseId = course.courseId;
    courseStartingYears.yearTaught = startingYear.startingYear;

    startingYear.courseToStartingYear = [courseStartingYears];
    course.courseToStartingYear = [courseStartingYears];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears);

    await courseStartingYearsService.createCourseStartingYears(
      courseStartingYears,
    );

    courseStartingYearsRepository.findOne.mockReturnValue(courseStartingYears);

    await expect(
      courseStartingYearsService.createCourseStartingYears(courseStartingYears),
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
    course.courseId = 'TDDD20';
    course.courseName = 'Avancerad Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const courseStartingYears = new CourseStartingYears();
    courseStartingYears.course = course;
    courseStartingYears.year = startingYear;
    courseStartingYears.hp = 6;
    courseStartingYears.level = 'A1X';
    courseStartingYears.schemaBlock = 'A';
    courseStartingYears.courseId = course.courseId;
    courseStartingYears.yearTaught = startingYear.startingYear;

    const courseStartingYears2 = new CourseStartingYears();
    courseStartingYears2.course = course2;
    courseStartingYears2.year = startingYear;
    courseStartingYears2.hp = 8;
    courseStartingYears2.level = 'A1X';
    courseStartingYears2.schemaBlock = 'B';
    courseStartingYears2.courseId = course2.courseId;
    courseStartingYears2.yearTaught = startingYear.startingYear;

    course.courseToStartingYear = [courseStartingYears];
    course2.courseToStartingYear = [courseStartingYears2];
    startingYear.courseToStartingYear = [
      courseStartingYears,
      courseStartingYears2,
    ];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYears,
      ),
    ).toEqual(courseStartingYears);
    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(1);

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears2);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears2);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYears2,
      ),
    ).toEqual(courseStartingYears2);
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

    const courseStartingYears = new CourseStartingYears();
    courseStartingYears.course = course;
    courseStartingYears.year = startingYear;
    courseStartingYears.hp = 6;
    courseStartingYears.level = 'A1X';
    courseStartingYears.schemaBlock = 'A';
    courseStartingYears.courseId = course.courseId;
    courseStartingYears.yearTaught = startingYear.startingYear;

    const courseStartingYears2 = new CourseStartingYears();
    courseStartingYears2.course = course;
    courseStartingYears2.year = startingYear2;
    courseStartingYears2.hp = 6;
    courseStartingYears2.level = 'A1X';
    courseStartingYears2.schemaBlock = 'B';
    courseStartingYears2.courseId = course.courseId;
    courseStartingYears2.yearTaught = startingYear2.startingYear;

    course.courseToStartingYear = [courseStartingYears, courseStartingYears2];
    startingYear.courseToStartingYear = [courseStartingYears];
    startingYear2.courseToStartingYear = [courseStartingYears2];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYears,
      ),
    ).toEqual(courseStartingYears);
    expect(courseStartingYearsRepository.create).toHaveBeenCalledTimes(1);

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears2);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears2);

    expect(
      await courseStartingYearsService.createCourseStartingYears(
        courseStartingYears2,
      ),
    ).toEqual(courseStartingYears2);
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

    const courseStartingYears = new CourseStartingYears();
    courseStartingYears.course = course;
    courseStartingYears.year = startingYear;
    courseStartingYears.hp = 6;
    courseStartingYears.level = 'A1X';
    courseStartingYears.schemaBlock = 'A';
    courseStartingYears.courseId = course.courseId;
    courseStartingYears.yearTaught = startingYear.startingYear;

    const courseStartingYears2 = new CourseStartingYears();
    courseStartingYears2.course = course;
    courseStartingYears2.year = startingYear2;
    courseStartingYears2.hp = 6;
    courseStartingYears2.level = 'A1X';
    courseStartingYears2.schemaBlock = 'B';
    courseStartingYears2.courseId = course.courseId;
    courseStartingYears2.yearTaught = startingYear2.startingYear;

    course.courseToStartingYear = [courseStartingYears, courseStartingYears2];
    startingYear.courseToStartingYear = [courseStartingYears];
    startingYear2.courseToStartingYear = [courseStartingYears2];

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears);

    await courseStartingYearsService.createCourseStartingYears(
      courseStartingYears,
    );

    courseStartingYearsRepository.save.mockReturnValue(courseStartingYears2);
    courseStartingYearsRepository.create.mockReturnValue(courseStartingYears2);

    await courseStartingYearsService.createCourseStartingYears(
      courseStartingYears2,
    );

    courseStartingYearsRepository.find.mockReturnValue([
      courseStartingYears,
      courseStartingYears2,
    ]);

    const allCourseStartingYears = await courseStartingYearsService.findAll();

    expect(allCourseStartingYears).toEqual([
      courseStartingYears,
      courseStartingYears2,
    ]);
  });
});
