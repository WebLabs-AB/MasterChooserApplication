import { Test, TestingModule } from '@nestjs/testing';
import { CourseMainAreaService } from './course-main-area.service';
import { Repository } from 'typeorm';
import { CourseMainArea, MainArea } from 'src/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from 'src/entities/NormalTypes/Course.entity';
import { UpdateCourseMainAreaInput } from 'src/inputTypes/update/update-course-mainArea.input';

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

// Mock repository for Course
const courseRepositoryMock: MockType<Repository<Course>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

// Mock repository for MainArea
const mainAreaRepositoryMock: MockType<Repository<MainArea>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
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
      {
        provide: getRepositoryToken(Course),
        useValue: courseRepositoryMock,
      },
      {
        provide: getRepositoryToken(MainArea),
        useValue: mainAreaRepositoryMock,
      },
    ],
  }).compile();

  courseMainAreasService = module.get<CourseMainAreaService>(
    CourseMainAreaService,
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

let courseMainArea: CourseMainArea;
let courseMainArea2: CourseMainArea;
let webCourse: Course;
let mainAreaDataTeknik: MainArea;
let mainAreaSystemVetenskap: MainArea;

beforeEach(() => {
  webCourse = new Course();
  webCourse.courseId = 'TDDD97';
  webCourse.name = 'Webbprogrammering';

  mainAreaDataTeknik = new MainArea();
  mainAreaDataTeknik.name = 'Datateknik';

  mainAreaSystemVetenskap = new MainArea();
  mainAreaSystemVetenskap.name = 'Systemvetenskap';

  courseMainArea = new CourseMainArea();
  courseMainArea.course = webCourse;
  courseMainArea.courseId = webCourse.courseId;
  courseMainArea.mainArea = mainAreaDataTeknik;
  courseMainArea.mainAreaName = mainAreaDataTeknik.name;

  courseMainArea2 = new CourseMainArea();
  courseMainArea2.course = webCourse;
  courseMainArea2.courseId = webCourse.courseId;
  courseMainArea2.mainArea = mainAreaSystemVetenskap;
  courseMainArea2.mainAreaName = mainAreaSystemVetenskap.name;

  webCourse.courseBelongsToMainArea = [courseMainArea, courseMainArea2];
  mainAreaDataTeknik.courseBelongsToMainArea = [courseMainArea];
  mainAreaSystemVetenskap.courseBelongsToMainArea = [courseMainArea2];
});

describe('CourseMainareasService', () => {
  test('should be defined', () => {
    expect(courseMainAreasService).toBeDefined();
  });
});

describe('Test findAll func', () => {
  test('should retrieve all course-mainareas', async () => {
    const expectedCourseMainAreas = [courseMainArea, courseMainArea2];
    courseMainAreasRepository.find.mockReturnValue([
      courseMainArea,
      courseMainArea2,
    ]);

    const retrievedCourseMainAreas = await courseMainAreasService.findAll();
    expect(retrievedCourseMainAreas).toEqual(expectedCourseMainAreas);
  });
});

describe('Test createCourseMainAreas func', () => {
  test('should create a new course main area', async () => {
    courseMainAreasRepository.save.mockReturnValue(courseMainArea);
    courseMainAreasRepository.create.mockReturnValue(courseMainArea);

    const newCourseMainArea = await courseMainAreasService.createCourseMainArea(
      courseMainArea,
    );
    expect(courseMainAreasRepository.create).toHaveBeenCalledTimes(1);
    expect(newCourseMainArea).toEqual(courseMainArea);
  });
});

describe('Test updateCourseMainArea func', () => {
  test('should successfully update the CourseMainArea relationship', async () => {
    courseMainAreasRepository.delete.mockReturnValue({ affected: 1 });
    courseMainAreasRepository.create.mockImplementation((entity) => entity);
    courseMainAreasRepository.save.mockReturnValue([
      courseMainArea,
      courseMainArea2,
    ]);

    const updateInput = new UpdateCourseMainAreaInput();
    const mainAreaNames = ['Datateknik', 'Systemvetenskap'];

    updateInput.courseId = 'TDDD97';
    updateInput.mainAreaNames = mainAreaNames;

    // First, ensure the course is found
    courseRepositoryMock.findOneBy.mockReturnValue(webCourse);

    // First, ensure the MainArea is found
    mainAreaRepositoryMock.findOneBy.mockReturnValue(mainAreaSystemVetenskap);

    const updatedRelations = await courseMainAreasService.updateCourseMainArea(
      updateInput,
    );

    expect(courseMainAreasRepository.delete).toHaveBeenCalledTimes(1);
    expect(courseMainAreasRepository.create).toHaveBeenCalledTimes(
      mainAreaNames.length,
    );
    expect(courseMainAreasRepository.save).toHaveBeenCalledTimes(
      mainAreaNames.length,
    );
    expect(updatedRelations).toHaveLength(mainAreaNames.length);

    const updatedCourseMainArea = updatedRelations[0][0];
    const updatedCourseMainArea2 = updatedRelations[0][1];
    expect(updatedCourseMainArea.mainAreaName).toEqual(mainAreaNames[0]);
    expect(updatedCourseMainArea2.mainAreaName).toEqual(mainAreaNames[1]);
  });

  test('should not update if the course does not exist', async () => {
    courseMainAreasRepository.findOne.mockReturnValue(null);

    const updateInput = new UpdateCourseMainAreaInput();
    updateInput.courseId = 'TDDD99';
    updateInput.mainAreaNames = ['Datateknik'];

    await expect(
      courseMainAreasService.updateCourseMainArea(updateInput),
    ).rejects.toThrow('Course with ID TDDD99 not found');
  });

  test('should not update if a main area does not exist', async () => {
    // First, ensure the course is found
    courseRepositoryMock.findOneBy.mockReturnValue(webCourse);

    const updateInput = new UpdateCourseMainAreaInput();
    updateInput.courseId = 'TDDD97';
    updateInput.mainAreaNames = ['Datateknik'];

    await expect(
      courseMainAreasService.updateCourseMainArea(updateInput),
    ).rejects.toThrow('MainArea with name Datateknik not found');
  });

  test('should throw an error if the database operation fails', async () => {
    // First, ensure the course is found
    courseRepositoryMock.findOneBy.mockReturnValue(webCourse);

    // Mock a database error
    courseMainAreasRepository.delete.mockImplementation(() => {
      throw new Error('Database operation failed');
    });

    const updateInput = new UpdateCourseMainAreaInput();
    updateInput.courseId = 'TDDD97';
    updateInput.mainAreaNames = ['Datateknik'];

    await expect(
      courseMainAreasService.updateCourseMainArea(updateInput),
    ).rejects.toThrow('Database operation failed');
  });
});
