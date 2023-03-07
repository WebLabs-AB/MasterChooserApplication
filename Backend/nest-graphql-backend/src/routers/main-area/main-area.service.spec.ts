import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { MainArea } from 'src/entities/NormalTypes/MainArea.entity';
import { Repository } from 'typeorm';
import { MainAreaService } from './main-area.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let mainareaService: MainAreaService;

const mainAreaRepository: MockType<Repository<MainArea>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      MainAreaService,
      {
        provide: getRepositoryToken(MainArea),
        useValue: mainAreaRepository,
      },
    ],
  }).compile();

  mainareaService = module.get(MainAreaService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('MainAreaService', () => {
  test('should be defined', () => {
    expect(mainareaService).toBeDefined();
  });
});

describe('Test createMainArea func', () => {
  test('should create a new main area', async () => {
    const mainArea = new MainArea();
    mainArea.type = 'Datavetenskap';

    mainAreaRepository.save.mockReturnValue(mainArea);
    mainAreaRepository.create.mockReturnValue(mainArea);

    const newMainArea = await mainareaService.createMainArea(mainArea);
    expect(mainAreaRepository.create).toHaveBeenCalledTimes(1);
    expect(newMainArea).toEqual(mainArea);
  });

  test('should throw an error when creating a duplicate main area', async () => {
    const mainArea = new MainArea();
    mainArea.type = 'Datavetenskap';

    mainAreaRepository.save.mockReturnValue(mainArea);
    mainAreaRepository.create.mockReturnValue(mainArea);

    await mainareaService.createMainArea(mainArea);

    mainAreaRepository.findOne.mockReturnValue(mainArea);

    await expect(mainareaService.createMainArea(mainArea)).rejects.toThrowError(
      UserInputError,
    );
  });
});

describe('Test findall func', () => {
  test('should retrieve all periods', async () => {
    const mainArea = new MainArea();
    mainArea.type = 'Datavetenskap';

    mainAreaRepository.save.mockReturnValue(mainArea);
    mainAreaRepository.create.mockReturnValue(mainArea);

    const newMainArea = await mainareaService.createMainArea(mainArea);

    const mainArea2 = new MainArea();
    mainArea2.type = 'Systemvetenskap';

    mainAreaRepository.save.mockReturnValue(mainArea2);
    mainAreaRepository.create.mockReturnValue(mainArea2);

    const newMainArea2 = await mainareaService.createMainArea(mainArea2);

    mainAreaRepository.find.mockReturnValue([newMainArea, newMainArea2]);

    const allPeriods = await mainareaService.findAll();
    expect(allPeriods).toEqual([newMainArea, newMainArea2]);
  });
});
