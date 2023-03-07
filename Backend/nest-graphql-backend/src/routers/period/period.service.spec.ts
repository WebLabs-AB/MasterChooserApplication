import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
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
  periodsRepository.findOne.mockReturnValue(null);
});

describe('PeriodsService', () => {
  test('should be defined', () => {
    expect(periodsService).toBeDefined();
  });
});

describe('Test createPeriod func', () => {
  test('should create a new period', async () => {
    const period = new Period();
    period.value = 1;

    periodsRepository.save.mockReturnValue(period);
    periodsRepository.create.mockReturnValue(period);

    const newPeriod = await periodsService.createPeriod(period);
    expect(periodsRepository.create).toHaveBeenCalledTimes(1);
    expect(newPeriod).toEqual(period);
  });

  test('should throw an error when creating a duplicate period', async () => {
    const period = new Period();
    period.value = 1;

    periodsRepository.save.mockReturnValue(period);
    periodsRepository.create.mockReturnValue(period);

    await periodsService.createPeriod(period);

    periodsRepository.findOne.mockReturnValue(period);

    await expect(periodsService.createPeriod(period)).rejects.toThrowError(
      UserInputError,
    );
  });
});

describe('Test findall func', () => {
  test('should retrieve all periods', async () => {
    const period = new Period();
    period.value = 1;

    periodsRepository.save.mockReturnValue(period);
    periodsRepository.create.mockReturnValue(period);

    const newPeriod = await periodsService.createPeriod(period);

    const period2 = new Period();
    period2.value = 2;

    periodsRepository.save.mockReturnValue(period2);
    periodsRepository.create.mockReturnValue(period2);

    const newPeriod2 = await periodsService.createPeriod(period2);

    periodsRepository.find.mockReturnValue([newPeriod, newPeriod2]);

    const allPeriods = await periodsService.findAll();
    expect(allPeriods).toEqual([newPeriod, newPeriod2]);
  });
});
