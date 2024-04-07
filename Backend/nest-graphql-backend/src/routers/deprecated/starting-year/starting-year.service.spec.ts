import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StartingYear } from 'src/entities/NormalTypes/deprecated/StartingYear.entity';
import { Repository } from 'typeorm';
import { StartingYearService } from './starting-year.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let startingYearService: StartingYearService;
const startingYearRepository: MockType<Repository<StartingYear>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      StartingYearService,
      {
        provide: getRepositoryToken(StartingYear),
        useValue: startingYearRepository,
      },
    ],
  }).compile();

  startingYearService = module.get(StartingYearService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('StartingYearService', () => {
  test('should be defined', () => {
    expect(startingYearService).toBeDefined();
  });
});

describe('Test createStartingYear func', () => {
  test('should create and return a starting year', async () => {
    const startingYear2019 = new StartingYear();
    startingYear2019.startingYear = 2019;

    startingYearRepository.save.mockReturnValue(startingYear2019);
    startingYearRepository.create.mockReturnValue(startingYear2019);

    const newStartingYear = await startingYearService.createStartingYear(
      startingYear2019,
    );

    expect(newStartingYear).toMatchObject(startingYear2019);
    expect(startingYearRepository.save).toHaveBeenCalledWith(startingYear2019);
  });
});

describe('test findAll func', () => {
  test('should find and return a list of starting-years', async () => {
    const startingYear2019 = new StartingYear();
    startingYear2019.startingYear = 2019;

    const startingYear2020 = new StartingYear();
    startingYear2020.startingYear = 2020;

    const startingYears = [startingYear2019, startingYear2020];

    startingYearRepository.find.mockReturnValue(startingYears);
    const foundStartingYears = await startingYearService.findAll();

    expect(foundStartingYears).toEqual([startingYear2019, startingYear2020]);
    expect(startingYearRepository.find).toHaveBeenCalledTimes(1);
  });
});
