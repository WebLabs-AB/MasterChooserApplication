import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseStartingYears } from 'src/entities';
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
});

describe('CourseStartingYearsService', () => {
  test('should be defined', () => {
    expect(courseStartingYearsService).toBeDefined();
  });
});
