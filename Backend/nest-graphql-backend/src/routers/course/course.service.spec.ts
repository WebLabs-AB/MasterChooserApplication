import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Course,
  CourseEducations,
  CourseMainAreas,
  CoursePeriods,
  CourseStartingYears,
  Education,
  Student,
  Teacher,
  University,
} from 'src/entities';
import { Repository } from 'typeorm';
import { CourseEducationsService } from '../course-educations/course-educations.service';
import { CourseMainareasService } from '../course-mainareas/course-mainareas.service';
import { CoursePeriodsService } from '../course-periods/course-periods.service';
import { CourseStartingYearsService } from '../course-starting-years/course-starting-years.service';
import { EducationService } from '../education/education.service';
import { StudentService } from '../student/student.service';
import { TeacherService } from '../teacher/teacher.service';
import { UniversityService } from '../university/university.service';
import { CourseService } from './course.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let courseService: CourseService;

const courseRepository: MockType<Repository<Course>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const studentRepository: MockType<Repository<Student>> = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const universityRepository: MockType<Repository<University>> = {
  findOne: jest.fn(),
};

const educationRepository: MockType<Repository<Education>> = {
  findOne: jest.fn(),
};

const teacherRepository: MockType<Repository<Teacher>> = {
  findOne: jest.fn(),
};

const courseEducationsRepository: MockType<Repository<CourseEducations>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const coursePeriodsRepository: MockType<Repository<CoursePeriods>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const courseMainAreasRepository: MockType<Repository<CourseMainAreas>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const courseStartingYearsRepository: MockType<Repository<CourseStartingYears>> =
  {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CourseService,
      {
        provide: getRepositoryToken(Course),
        useValue: courseRepository,
      },
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
      TeacherService,
      {
        provide: getRepositoryToken(Teacher),
        useValue: teacherRepository,
      },
      CourseEducationsService,
      {
        provide: getRepositoryToken(CourseEducations),
        useValue: courseEducationsRepository,
      },
      CoursePeriodsService,
      {
        provide: getRepositoryToken(CoursePeriods),
        useValue: coursePeriodsRepository,
      },
      CourseMainareasService,
      {
        provide: getRepositoryToken(CourseMainAreas),
        useValue: courseMainAreasRepository,
      },
      CourseStartingYearsService,
      {
        provide: getRepositoryToken(CourseStartingYears),
        useValue: courseStartingYearsRepository,
      },
    ],
  }).compile();

  courseService = module.get(CourseService);
});

afterEach(() => {
  universityRepository.findOne.mockClear();
});

describe('CourseService', () => {
  test('should be defined', () => {
    expect(courseService).toBeDefined();
  });
});
