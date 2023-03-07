import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CourseEducations } from 'src/entities';
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
