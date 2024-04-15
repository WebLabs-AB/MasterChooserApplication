import { Test, TestingModule } from '@nestjs/testing';
import { CourseMainAreaService } from './course-main-area.service';
import { Repository } from 'typeorm';
import { CourseMainArea, MainArea } from 'src/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from 'src/entities/NormalTypes/Course.entity';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let courseMainAreasService: CourseMainAreaService;

const courseMainAreasRepository: MockType<Repository<CourseMainArea>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CourseMainAreaService,
      {
        provide: getRepositoryToken(CourseMainArea),
        useValue: courseMainAreasRepository,
      },
    ],
  }).compile();

  courseMainAreasService = module.get(CourseMainAreaService);
});

afterEach(() => {
  jest.resetAllMocks();
});

let courseMainArea;
let courseMainArea2;

beforeEach(() => {
  const course = new Course();
  course.courseId = 'TDDD97';
  course.name = 'Webbprogrammering';

  const mainArea = new MainArea();
  mainArea.name = 'Datateknik';

  const mainArea2 = new MainArea();
  mainArea2.name = 'Systemvetenskap';

  courseMainArea = new CourseMainArea();
  courseMainArea.course = course;
  courseMainArea.courseId = course.courseId;
  courseMainArea.mainArea = mainArea;
  courseMainArea.mainAreaName = mainArea.name;

  courseMainArea2 = new CourseMainArea();
  courseMainArea2.course = course;
  courseMainArea2.courseId = course.courseId;
  courseMainArea2.mainArea = mainArea2;
  courseMainArea2.mainAreaName = mainArea2.name;

  course.courseBelongsToMainArea = [courseMainArea, courseMainArea2];
  mainArea.courseBelongsToMainArea = [courseMainArea];
  mainArea2.courseBelongsToMainArea = [courseMainArea2];

  courseMainAreasRepository.find.mockReturnValue([
    courseMainArea,
    courseMainArea2,
  ]);
});

describe('CourseMainareasService', () => {
  test('should be defined', () => {
    expect(courseMainAreasService).toBeDefined();
  });
});

describe('Test findAll func', () => {
  test('should retrieve all course-mainareas', async () => {
    const expectedCourseMainAreas = [courseMainArea, courseMainArea2];

    const retrievedCourseMainAreas = await courseMainAreasService.findAll();

    expect(retrievedCourseMainAreas).toEqual(expectedCourseMainAreas);
  });
});

describe('Test createCourseMainAreas func', () => {
  test('should create a new course main area', async () => {
    courseMainAreasRepository.save.mockReturnValue(courseMainArea);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea);

    const newCoursePeriod = await courseMainAreasService.createCourseMainArea(
      courseMainArea,
    );
    expect(courseMainAreasRepository.create).toHaveBeenCalledTimes(1);
    expect(newCoursePeriod).toEqual(courseMainArea);
  });
});
