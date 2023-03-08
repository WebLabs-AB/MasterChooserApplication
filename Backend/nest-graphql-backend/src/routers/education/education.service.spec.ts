import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';

// Own files.
import { Education } from 'src/entities/NormalTypes/Education.entity';
import { Student } from 'src/entities/NormalTypes/Student.entity';
import { University } from 'src/entities/NormalTypes/University.entity';
import { Repository } from 'typeorm';
import { UniversityService } from '../university/university.service';
import { EducationService } from './education.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let educationService: EducationService;
const educationRepository: MockType<Repository<Education>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

const universityRepository: MockType<Repository<University>> = {
  find: jest.fn(),
  findOneByOrFail: jest.fn(),
};

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      EducationService,
      {
        provide: getRepositoryToken(Education),
        useValue: educationRepository,
      },
      UniversityService,
      {
        provide: getRepositoryToken(University),
        useValue: universityRepository,
      },
    ],
  }).compile();

  educationService = module.get(EducationService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('EducationService', () => {
  test('should be defined', () => {
    expect(educationService).toBeDefined();
  });
});

describe('Test createEducation func', () => {
  test('should create a new education', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education = new Education();
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    educationRepository.save.mockReturnValue(education);
    educationRepository.create.mockReturnValue(education);
    universityRepository.findOneByOrFail.mockReturnValue(university);

    const newEducation = await educationService.createEducation({
      educationName: 'Datateknik',
      symbol: 'D',
      universityName: 'Chalmers',
    });

    university.Educations = [newEducation];

    expect(educationRepository.create).toHaveBeenCalledTimes(1);
    expect(newEducation).toEqual(education);
  });

  test('should throw an error when creating a duplicate education', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education = new Education();
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    educationRepository.save.mockReturnValue(education);
    educationRepository.create.mockReturnValue(education);
    universityRepository.findOneByOrFail.mockReturnValue(university);

    await educationService.createEducation({
      educationName: 'Datateknik',
      symbol: 'D',
      universityName: 'Chalmers',
    });

    university.Educations = [education];

    await expect(
      educationService.createEducation({
        educationName: 'Datateknik',
        symbol: 'D',
        universityName: 'Chalmers',
      }),
    ).rejects.toThrowError(UserInputError);
  });
});

describe('Test getAllStudents func', () => {
  test('should retrieve all students that studies a specific education', async () => {
    const university = new University();
    university.universityName = 'Chalmers';
    universityRepository.findOneByOrFail.mockReturnValue(university);

    const education = new Education();
    education.id = 'dhjadl-23';
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    university.Educations = [education];

    const student = new Student();
    student.createdAt = new Date();
    student.education = education;
    student.email = 'erikbirgersson@gmail.com';
    student.password = 'Blaaaaaaa2312';
    student.startingYear = 2019;
    student.university = university;

    education.Students = [student];

    const foundStudents = await educationService.getAllStudents(
      'Datateknik',
      'Chalmers',
    );

    expect(universityRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    expect(universityRepository.findOneByOrFail).toHaveBeenCalledWith({
      universityName: university.universityName,
    });
    expect(foundStudents).toContainEqual(student);
  });
});

describe('Test getUniversity func', () => {
  test('should retrieve what university a education belongs to', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education = new Education();
    education.id = 'dhjadl-23';
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    educationRepository.save.mockReturnValue(education);
    educationRepository.create.mockReturnValue(education);
    universityRepository.findOneByOrFail.mockReturnValue(university);

    const newEducation = await educationService.createEducation({
      educationName: 'Datateknik',
      symbol: 'D',
      universityName: 'Chalmers',
    });

    university.Educations = [newEducation];

    const foundUniversity = await educationService.getUniversity(
      education.university.universityName,
    );

    expect(foundUniversity).toEqual(university);
    expect(foundUniversity.Educations).toEqual([newEducation]);
  });
});

describe('Test findall func', () => {
  test('should retrieve all educations', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education = new Education();
    education.id = 'dhjadl-23';
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    const education2 = new Education();
    education.id = 'dha233';
    education.educationName = 'Mjukvaruteknik';
    education.symbol = 'U';
    education.university = university;

    educationRepository.save.mockReturnValue(education);
    educationRepository.create.mockReturnValue(education);
    universityRepository.findOneByOrFail.mockReturnValue(university);

    const newEducation = await educationService.createEducation({
      educationName: 'Datateknik',
      symbol: 'D',
      universityName: 'Chalmers',
    });
    expect(educationRepository.create).toHaveBeenCalledTimes(1);
    expect(newEducation).toEqual(education);

    educationRepository.save.mockReturnValue(education2);
    educationRepository.create.mockReturnValue(education2);

    const newEducation2 = await educationService.createEducation({
      educationName: 'Mjuvkaruteknik',
      symbol: 'U',
      universityName: 'Chalmers',
    });
    expect(educationRepository.create).toHaveBeenCalledTimes(2);
    expect(newEducation2).toEqual(education2);

    university.Educations = [newEducation, newEducation2];

    educationRepository.find.mockReturnValue([newEducation, newEducation2]);
    const allEducations = await educationService.findAll();
    expect(allEducations).toEqual([newEducation, newEducation2]);
  });
});

describe('Test findEducationsFromUniversity func', () => {
  test('should retrieve all educations from an university', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education = new Education();
    education.id = 'dhjadl-23';
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    const education2 = new Education();
    education.id = 'dha233';
    education.educationName = 'Mjukvaruteknik';
    education.symbol = 'U';
    education.university = university;

    educationRepository.save.mockReturnValue(education);
    educationRepository.create.mockReturnValue(education);
    universityRepository.findOneByOrFail.mockReturnValue(university);

    const newEducation = await educationService.createEducation({
      educationName: 'Datateknik',
      symbol: 'D',
      universityName: 'Chalmers',
    });
    expect(educationRepository.create).toHaveBeenCalledTimes(1);
    expect(newEducation).toEqual(education);

    educationRepository.save.mockReturnValue(education2);
    educationRepository.create.mockReturnValue(education2);

    const newEducation2 = await educationService.createEducation({
      educationName: 'Mjuvkaruteknik',
      symbol: 'U',
      universityName: 'Chalmers',
    });
    expect(educationRepository.create).toHaveBeenCalledTimes(2);
    expect(newEducation2).toEqual(education2);

    university.Educations = [newEducation, newEducation2];
    universityRepository.findOneByOrFail.mockReturnValue(university);

    const allEducations = await educationService.findEducationsFromUniversity(
      university.universityName,
    );
    expect(allEducations).toEqual([newEducation, newEducation2]);
  });
});
