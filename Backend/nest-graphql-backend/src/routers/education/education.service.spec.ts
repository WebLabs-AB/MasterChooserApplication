import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import exp from 'constants';
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
  universityRepository.save.mockClear();
  universityRepository.findOneByOrFail.mockClear();
  universityRepository.find.mockClear();
  universityRepository.create.mockClear();
});

describe('EducationService', () => {
  test('should be defined', () => {
    expect(educationService).toBeDefined();
  });
});

describe('Test createEducation func', () => {
  test('should get create a new education', async () => {
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

    expect(educationRepository.create).toHaveBeenCalledTimes(1);
    expect(newEducation).toEqual(education);
  });

  test('should throw an error', async () => {
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

    await expect(
      educationService.createEducation({
        educationName: 'Datateknik',
        symbol: 'D',
        universityName: 'Chalmers',
      }),
    ).rejects.toThrowError(BadRequestException);
  });
});

describe('Test findEducationsFromUniversity func', () => {
  test('should find 0 programs from the education table that matches an university name', async () => {
    const university = new University();
    university.universityName = 'Chalmers';
    university.Educations = [];
    universityRepository.findOneByOrFail.mockReturnValue(university);

    const educations = await educationService.findEducationsFromUniversity(
      university.universityName,
    );

    expect(universityRepository.findOneByOrFail).toBeCalledTimes(1);
    expect(educations).toEqual([]);
  });

  test('should find 2 programs from the education table that matches an university name', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education1 = new Education();
    education1.educationName = 'Datateknik';
    education1.symbol = 'D';
    education1.university = university;

    const education2 = new Education();
    education2.educationName = 'Mjukvaruteknik';
    education2.symbol = 'U';
    education2.university = university;

    university.Educations = [education1, education2];

    universityRepository.findOneByOrFail.mockReturnValue(university);
    const educations = await educationService.findEducationsFromUniversity(
      university.universityName,
    );

    expect(universityRepository.findOneByOrFail).toBeCalledTimes(1);
    expect(educations).toEqual([education1, education2]);
  });
});

describe('Test getUniversity func', () => {
  test('should get a specific university', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    universityRepository.findOneByOrFail.mockReturnValue(university);

    const foundUniversity = await educationService.getUniversity('Chalmers');

    expect(universityRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    expect(universityRepository.findOneByOrFail).toHaveBeenCalledWith(
      university,
    );
    expect(foundUniversity).toEqual(university);
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
