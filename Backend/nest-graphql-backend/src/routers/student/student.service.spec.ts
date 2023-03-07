import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';

// Own files.
import { Education } from 'src/entities/NormalTypes/Education.entity';
import { Student } from 'src/entities/NormalTypes/Student.entity';
import { University } from 'src/entities/NormalTypes/University.entity';
import { Repository } from 'typeorm';
import { EducationService } from '../education/education.service';
import { UniversityService } from '../university/university.service';
import { StudentService } from './student.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let studentService: StudentService;
const studentRepository: MockType<Repository<Student>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

const universityRepository: MockType<Repository<University>> = {
  find: jest.fn(),
  findOneByOrFail: jest.fn(),
};

const educationRepository: MockType<Repository<Education>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      StudentService,
      {
        provide: getRepositoryToken(Student),
        useValue: studentRepository,
      },
      UniversityService,
      {
        provide: getRepositoryToken(University),
        useValue: universityRepository,
      },

      EducationService,
      {
        provide: getRepositoryToken(Education),
        useValue: educationRepository,
      },
    ],
  }).compile();

  studentService = module.get(StudentService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('UniversityService', () => {
  test('should be defined', () => {
    expect(studentService).toBeDefined();
  });
});

describe('Test createStudent', () => {
  test('should create a new student', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education = new Education();
    education.id = 'dhjadl-23';
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    const SALT = await bcrypt.genSalt(10);

    const student = new Student();
    student.createdAt = new Date();
    student.education = education;
    student.email = 'erikbirgersson@gmail.com';
    student.password = await bcrypt.hash('password', SALT);
    student.startingYear = 2019;
    student.university = university;

    studentRepository.save.mockReturnValue(student);
    studentRepository.create.mockReturnValue(student);
    studentRepository.findOne.mockReturnValue(null);

    universityRepository.findOneByOrFail.mockReturnValue(university);

    const newStudent = await studentService.createStudent({
      email: student.email,
      password: student.password,
      educationName: education.educationName,
      universityName: university.universityName,
      startingYear: 2019,
    });

    expect(universityRepository.findOneByOrFail).toBeCalledTimes(2);
    expect(studentRepository.create).toBeCalledTimes(1);
    expect(studentRepository.save).toBeCalledTimes(1);
    expect(newStudent).toEqual(student);
  });

  test('should throw an error when creating student', async () => {
    const university = new University();
    university.universityName = 'Chalmers';

    const education = new Education();
    education.id = 'dhjadl-23';
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.university = university;

    const SALT = await bcrypt.genSalt(10);

    const student = new Student();
    student.createdAt = new Date();
    student.education = education;
    student.email = 'erikbirgersson@gmail.com';
    student.password = await bcrypt.hash('password', SALT);
    student.startingYear = 2019;
    student.university = university;

    studentRepository.findOne.mockReturnValue(student);

    await expect(
      studentService.createStudent({
        email: student.email,
        password: student.password,
        educationName: education.educationName,
        universityName: university.universityName,
        startingYear: 2019,
      }),
    ).rejects.toThrowError(UserInputError);

    expect(studentRepository.findOne).toBeCalledTimes(1);
  });
});
