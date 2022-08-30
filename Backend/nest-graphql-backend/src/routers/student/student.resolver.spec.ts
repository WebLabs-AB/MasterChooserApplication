import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
  studentRepository.save.mockClear();
  studentRepository.findOne.mockClear();
  studentRepository.find.mockClear();
  studentRepository.create.mockClear();

  educationRepository.save.mockClear();
  educationRepository.findOne.mockClear();
  educationRepository.find.mockClear();
  educationRepository.create.mockClear();

  universityRepository.findOneByOrFail.mockClear();
  universityRepository.find.mockClear();
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
    university.Students = null;

    const education = new Education();
    education.id = 'dhjadl-23';
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.Students = [];
    education.university = university;

    university.Educations = [education];

    const SALT = await bcrypt.genSalt(10);

    const student = new Student();
    student.createdAt = new Date();
    student.education = education;
    student.email = 'erikbirgersson@gmail.com';
    student.password = await bcrypt.hash('password', SALT);
    student.startingYear = 2019;
    student.university = university;

    studentRepository.save.mockReturnValue(education);
    studentRepository.create.mockReturnValue(education);
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
    expect(newStudent).toEqual({});
  });
});
