import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

// Own files.
import { Repository } from 'typeorm';
import { Teacher } from 'src/entities';
import { TeacherService } from './teacher.service';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

let teacherService: TeacherService;
const teacherRepository: MockType<Repository<Teacher>> = {
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
      TeacherService,
      {
        provide: getRepositoryToken(Teacher),
        useValue: teacherRepository,
      },
    ],
  }).compile();

  teacherService = module.get(TeacherService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('TeacherService', () => {
  test('should be defined', () => {
    expect(teacherService).toBeDefined();
  });
});

describe('Test createTeacher func', () => {
  test('should create and return a teacher', async () => {
    const teacher = new Teacher();
    teacher.email = 'bengt@liu.se';
    teacher.password = 'LIUsnabelA9';
    teacher.firstName = 'Bengt';
    teacher.lastName = 'Larsson';
    teacher.MasterProfiles = [];
    teacher.courses = [];

    teacherRepository.create.mockReturnValue(teacher);
    teacherRepository.save.mockReturnValue(teacher);

    const newTeacher = await teacherService.createTeacher({
      email: teacher.email,
      password: teacher.password,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
    });

    expect(teacherRepository.save).toBeCalledTimes(1);
    expect(teacherRepository.create).toBeCalledTimes(1);
    expect(newTeacher).toEqual(teacher);
  });

  test('should create an error when creating a duplicate teacher', async () => {
    const teacher = new Teacher();
    teacher.email = 'bengt@liu.se';
    teacher.password = 'LIUsnabelA9';
    teacher.firstName = 'Bengt';
    teacher.lastName = 'Larsson';
    teacher.MasterProfiles = [];
    teacher.courses = [];

    teacherRepository.create.mockReturnValue(teacher);
    teacherRepository.save.mockReturnValue(teacher);

    const newTeacher = await teacherService.createTeacher({
      email: teacher.email,
      password: teacher.password,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
    });

    teacherRepository.findOne.mockReturnValue(teacher);
    await expect(
      teacherService.createTeacher({
        email: teacher.email,
        password: teacher.password,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
      }),
    ).rejects.toThrowError(Error);

    expect(teacherRepository.save).toBeCalledTimes(1);
    expect(teacherRepository.create).toBeCalledTimes(1);
    expect(newTeacher).toEqual(teacher);
  });
});
