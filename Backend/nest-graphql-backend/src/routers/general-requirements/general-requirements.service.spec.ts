import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { GeneralRequirements, University } from 'src/entities';
import { Repository } from 'typeorm';
import { UniversityService } from '../university/university.service';
import { GeneralRequirementsService } from './general-requirements.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let generalRequirementsService: GeneralRequirementsService;

const generalRequirementsRepository: MockType<Repository<GeneralRequirements>> =
  {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

const universityRepository: MockType<Repository<University>> = {
  findOne: jest.fn(),
  findOneByOrFail: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      GeneralRequirementsService,
      {
        provide: getRepositoryToken(GeneralRequirements),
        useValue: generalRequirementsRepository,
      },
      UniversityService,
      {
        provide: getRepositoryToken(University),
        useValue: universityRepository,
      },
    ],
  }).compile();

  generalRequirementsService = module.get(GeneralRequirementsService);
});

afterEach(() => {
  universityRepository.findOne.mockClear();
});

describe('GeneralRequirementsService', () => {
  test('should be defined', () => {
    expect(generalRequirementsService).toBeDefined();
  });
});

describe('Test createGeneralRequirement func', () => {
  test('should create a new general requirement', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const generalRequirement = new GeneralRequirements();
    generalRequirement.A1XHp = 60;
    generalRequirement.MainAreaHp = 30;
    generalRequirement.university = university;

    generalRequirementsRepository.save.mockReturnValue(generalRequirement);
    generalRequirementsRepository.create.mockReturnValue(generalRequirement);
    universityRepository.findOne.mockReturnValue(university);

    const newGeneralRequirements =
      await generalRequirementsService.createGeneralRequirement(
        generalRequirement,
      );

    expect(generalRequirementsRepository.create).toHaveBeenCalledTimes(1);
    expect(newGeneralRequirements).toEqual(generalRequirement);
  });

  test('should throw an error when creating a duplicate general requirement', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const generalRequirement = new GeneralRequirements();
    generalRequirement.A1XHp = 60;
    generalRequirement.MainAreaHp = 30;
    generalRequirement.university = university;

    generalRequirementsRepository.save.mockReturnValue(generalRequirement);
    generalRequirementsRepository.create.mockReturnValue(generalRequirement);
    universityRepository.findOne.mockReturnValue(university);

    await generalRequirementsService.createGeneralRequirement(
      generalRequirement,
    );

    generalRequirementsRepository.findOne.mockReturnValue(generalRequirement);

    await expect(
      generalRequirementsService.createGeneralRequirement(generalRequirement),
    ).rejects.toThrowError(UserInputError);
  });
});

describe('Test findall func', () => {
  test('should retrieve all general requirements', async () => {
    const university1 = new University();
    university1.universityName = 'Chalmers';

    const university2 = new University();
    university2.universityName = 'LIU';

    const generalRequirement = new GeneralRequirements();
    generalRequirement.A1XHp = 60;
    generalRequirement.MainAreaHp = 30;
    generalRequirement.university = university1;

    const generalRequirementLIU = new GeneralRequirements();
    generalRequirementLIU.A1XHp = 60;
    generalRequirementLIU.MainAreaHp = 30;
    generalRequirementLIU.university = university2;

    generalRequirementsRepository.find.mockReturnValue([
      generalRequirement,
      generalRequirementLIU,
    ]);

    const allGeneralRequirements = await generalRequirementsService.findAll();
    expect(allGeneralRequirements).toEqual([
      generalRequirement,
      generalRequirementLIU,
    ]);
  });
});

describe('Test deleteGeneralRequirements func', () => {
  test('should delete general requirement for LIU', async () => {
    const university1 = new University();
    university1.universityName = 'Chalmers';

    const university2 = new University();
    university2.universityName = 'LIU';

    const generalRequirement = new GeneralRequirements();
    generalRequirement.A1XHp = 60;
    generalRequirement.MainAreaHp = 30;
    generalRequirement.university = university1;

    const generalRequirementLIU = new GeneralRequirements();
    generalRequirementLIU.A1XHp = 60;
    generalRequirementLIU.MainAreaHp = 30;
    generalRequirementLIU.university = university2;

    generalRequirementsRepository.findOne.mockReturnValue([
      generalRequirementLIU,
    ]);
    generalRequirementsRepository.delete.mockReturnValue([
      generalRequirementLIU,
    ]);

    const allGeneralRequirements =
      await generalRequirementsService.deleteGeneralRequirements(
        generalRequirementLIU.university.universityName,
      );
    expect(allGeneralRequirements).toEqual([generalRequirementLIU]);
  });

  test('should throw error when deleting general requirement for LIU', async () => {
    const university1 = new University();
    university1.universityName = 'Chalmers';

    const university2 = new University();
    university2.universityName = 'LIU';

    const generalRequirement = new GeneralRequirements();
    generalRequirement.A1XHp = 60;
    generalRequirement.MainAreaHp = 30;
    generalRequirement.university = university1;

    const generalRequirementLIU = new GeneralRequirements();
    generalRequirementLIU.A1XHp = 60;
    generalRequirementLIU.MainAreaHp = 30;
    generalRequirementLIU.university = university2;

    generalRequirementsRepository.findOne.mockReturnValue([
      generalRequirementLIU,
    ]);
    generalRequirementsRepository.delete.mockReturnValue([
      generalRequirementLIU,
    ]);

    const allGeneralRequirements =
      await generalRequirementsService.deleteGeneralRequirements(
        generalRequirementLIU.university.universityName,
      );
    expect(allGeneralRequirements).toEqual([generalRequirementLIU]);

    generalRequirementsRepository.findOne.mockReturnValue(null);

    await expect(
      generalRequirementsService.deleteGeneralRequirements(
        generalRequirementLIU.university.universityName,
      ),
    ).rejects.toThrowError(UserInputError);
    expect(allGeneralRequirements).toEqual([generalRequirementLIU]);
  });
});
