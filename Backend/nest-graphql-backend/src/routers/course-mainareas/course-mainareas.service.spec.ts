import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import {
  Course,
  CourseMainAreas,
  CoursePeriods,
  MainArea,
  Period,
} from 'src/entities';
import { Repository } from 'typeorm';
import { CourseMainareasService } from './course-mainareas.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let courseMainAreasService: CourseMainareasService;

const courseMainAreasRepository: MockType<Repository<CourseMainAreas>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CourseMainareasService,
      {
        provide: getRepositoryToken(CourseMainAreas),
        useValue: courseMainAreasRepository,
      },
    ],
  }).compile();

  courseMainAreasService = module.get(CourseMainareasService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('CourseMainareasService', () => {
  test('should be defined', () => {
    expect(courseMainAreasService).toBeDefined();
  });
});

describe('Test createCourseMainAreas func', () => {
  test('should create a new course main area', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const mainArea = new MainArea();
    mainArea.type = 'Datateknik';

    const courseMainArea = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainArea = mainArea;
    courseMainArea.type = mainArea.type;

    courseMainAreasRepository.save.mockReturnValue(courseMainArea);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea);

    const newCoursePeriod = await courseMainAreasService.createCourseMainAreas(
      courseMainArea,
    );
    expect(courseMainAreasRepository.create).toHaveBeenCalledTimes(1);
    expect(newCoursePeriod).toEqual(courseMainArea);
  });

  test('should throw an error when creating a duplicate course period', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const mainArea = new MainArea();
    mainArea.type = 'Datateknik';

    const courseMainArea = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainArea = mainArea;
    courseMainArea.type = mainArea.type;

    courseMainAreasRepository.save.mockReturnValue(courseMainArea);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea);

    const newCoursePeriod = await courseMainAreasService.createCourseMainAreas(
      courseMainArea,
    );
    expect(courseMainAreasRepository.create).toHaveBeenCalledTimes(1);
    expect(newCoursePeriod).toEqual(courseMainArea);

    courseMainAreasRepository.findOne.mockReturnValue(courseMainArea);
    await expect(
      courseMainAreasService.createCourseMainAreas(courseMainArea),
    ).rejects.toThrowError(UserInputError);
  });
});

describe('Test findAllCoursesConnectedToMainArea func', () => {
  test('should return all courses connected to a main area', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const course2 = new Course();
    course2.courseId = 'TDDD20';
    course2.courseName = 'Avancerad Webbprogrammering';
    course2.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const mainArea = new MainArea();
    mainArea.type = 'Datateknik';

    const courseMainArea = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainArea = mainArea;
    courseMainArea.type = mainArea.type;

    const courseMainArea2 = new CourseMainAreas();
    courseMainArea.course = course2;
    courseMainArea.courseId = course2.courseId;
    courseMainArea.mainArea = mainArea;
    courseMainArea.type = mainArea.type;

    course.mainAreaConnection = [courseMainArea];
    course2.mainAreaConnection = [courseMainArea2];
    mainArea.courseConnection = [courseMainArea, courseMainArea2];

    courseMainAreasRepository.save.mockReturnValue(courseMainArea);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea);
    await courseMainAreasService.createCourseMainAreas(courseMainArea);

    courseMainAreasRepository.save.mockReturnValue(courseMainArea2);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea2);
    await courseMainAreasService.createCourseMainAreas(courseMainArea2);

    courseMainAreasRepository.find.mockReturnValue([course, course2]);

    const allCourseMainAreas =
      await courseMainAreasService.findAllCoursesConnectedToMainArea(
        mainArea.type,
      );

    expect(allCourseMainAreas).toEqual([course, course2]);
  });
});

describe('Test findAllMainAreasConnectedToCourse func', () => {
  test('should return all main areas connected to a course', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const mainArea = new MainArea();
    mainArea.type = 'Datateknik';

    const mainArea2 = new MainArea();
    mainArea2.type = 'Systemvetenskap';

    const courseMainArea = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainArea = mainArea;
    courseMainArea.type = mainArea.type;

    const courseMainArea2 = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainArea = mainArea2;
    courseMainArea.type = mainArea2.type;

    course.mainAreaConnection = [courseMainArea, courseMainArea2];
    mainArea.courseConnection = [courseMainArea];
    mainArea2.courseConnection = [courseMainArea2];

    courseMainAreasRepository.save.mockReturnValue(courseMainArea);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea);
    await courseMainAreasService.createCourseMainAreas(courseMainArea);

    courseMainAreasRepository.save.mockReturnValue(courseMainArea2);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea2);
    await courseMainAreasService.createCourseMainAreas(courseMainArea2);

    courseMainAreasRepository.find.mockReturnValue([mainArea, mainArea2]);

    const allCourseMainAreas =
      await courseMainAreasService.findAllMainAreasConnectedToCourse(
        course.courseId,
      );

    expect(allCourseMainAreas).toEqual([mainArea, mainArea2]);
  });
});

describe('Test findall func', () => {
  test('should retrieve all course-mainareas', async () => {
    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';

    const mainArea = new MainArea();
    mainArea.type = 'Datateknik';

    const mainArea2 = new MainArea();
    mainArea2.type = 'Systemvetenskap';

    const courseMainArea = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainArea = mainArea;
    courseMainArea.type = mainArea.type;

    const courseMainArea2 = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainArea = mainArea2;
    courseMainArea.type = mainArea2.type;

    course.mainAreaConnection = [courseMainArea, courseMainArea2];
    mainArea.courseConnection = [courseMainArea];
    mainArea2.courseConnection = [courseMainArea2];

    courseMainAreasRepository.save.mockReturnValue(courseMainArea);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea);
    await courseMainAreasService.createCourseMainAreas(courseMainArea);

    courseMainAreasRepository.save.mockReturnValue(courseMainArea2);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea2);
    await courseMainAreasService.createCourseMainAreas(courseMainArea2);

    courseMainAreasRepository.find.mockReturnValue([mainArea, mainArea2]);

    courseMainAreasRepository.find.mockReturnValue([
      courseMainArea,
      courseMainArea2,
    ]);

    const allCourseMainAreas = await courseMainAreasService.findAll();

    expect(allCourseMainAreas).toEqual([courseMainArea, courseMainArea2]);
  });
});
