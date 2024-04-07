import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';

// Own files.
import { University } from 'src/entities/NormalTypes/deprecated/University.entity';
import { Repository } from 'typeorm';
import { UniversityService } from './university.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let universityService: UniversityService;
const universityRepository: MockType<Repository<University>> = {
  save: jest.fn(),
  findOneByOrFail: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UniversityService,
      {
        provide: getRepositoryToken(University),
        useValue: universityRepository,
      },
    ],
  }).compile();

  universityService = module.get(UniversityService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('UniversityService', () => {
  test('should be defined', () => {
    expect(universityService).toBeDefined();
  });
});

describe('Test createUniversity func', () => {
  test('should create and return an university', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    universityRepository.create.mockReturnValue(university);
    universityRepository.save.mockReturnValue(university);

    const newUniversity = await universityService.createUniversity({
      universityName: university.universityName,
    });

    expect(universityRepository.save).toBeCalledTimes(1);
    expect(universityRepository.create).toBeCalledTimes(1);
    expect(newUniversity).toEqual(university);
  });
});

describe('Test findAll func', () => {
  test('should find all universities', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    universityRepository.create.mockReturnValue(university);
    universityRepository.save.mockReturnValue(university);
    universityRepository.find.mockReturnValue(university);

    await universityService.createUniversity({
      universityName: university.universityName,
    });

    const universities = await universityService.findAll();

    expect(universityRepository.save).toBeCalledTimes(1);
    expect(universityRepository.create).toBeCalledTimes(1);
    expect(universityRepository.find).toBeCalledTimes(1);
    expect(universities).toEqual(university);
  });
});

describe('Test findOne func', () => {
  test('should find a specific university', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    universityRepository.findOneByOrFail.mockReturnValue(university);

    const foundUniversity = await universityService.findOne('Chalmers');

    expect(universityRepository.findOneByOrFail).toBeCalledTimes(1);
    expect(foundUniversity).toEqual(university);
  });

  test('should throw an error when searching for a specific university', async () => {
    universityRepository.findOneByOrFail.mockReturnValue(NotFoundError);

    const university = await universityService.findOne('Chalmers');

    expect(universityRepository.findOneByOrFail).toBeCalledTimes(1);
    expect(university).toEqual(NotFoundError);
  });
});

describe('Test deleteUniversity func', () => {
  test('should find a specific university and delete it', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    universityRepository.findOne.mockReturnValue(university);

    const foundUniversity = await universityService.deleteUniversity(
      'Chalmers',
    );

    expect(universityRepository.findOne).toBeCalledTimes(1);
    expect(foundUniversity).toEqual(university);
  });

  test('should throw an error when trying to delete an university that does not exist', async () => {
    await expect(
      universityService.deleteUniversity('Chalmers'),
    ).rejects.toThrowError(Error);

    expect(universityRepository.findOne).toBeCalledTimes(1);
  });
});
