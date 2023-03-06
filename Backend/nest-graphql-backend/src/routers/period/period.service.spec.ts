import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Period } from 'src/entities';
import { Repository } from 'typeorm';
import { PeriodService } from './period.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let periodsService: PeriodService;

const periodsRepository: MockType<Repository<Period>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      PeriodService,
      {
        provide: getRepositoryToken(Period),
        useValue: periodsRepository,
      },
    ],
  }).compile();

  periodsService = module.get(PeriodService);
});

afterEach(() => {
  periodsRepository.findOne.mockClear();
});

describe('PeriodsService', () => {
  test('should be defined', () => {
    expect(periodsService).toBeDefined();
  });
});
