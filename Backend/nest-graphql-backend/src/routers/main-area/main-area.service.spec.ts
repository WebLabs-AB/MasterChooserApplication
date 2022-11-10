import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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

describe('MainAreaService', () => {
  test('should be defined', () => {
    expect(mainareaService).toBeDefined();
  });
});
