import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  Course,
  CourseEducations,
  CourseMainAreas,
  CoursePeriods,
  CourseStartingYears,
  Education,
  MainArea,
  Period,
  StartingYear,
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
  findOneByOrFail: jest.fn(),
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

describe('Test createGeneralRequirement func', () => {
  test('should create a new course', async () => {
    const university = new University();
    university.universityName = 'LIU';

    const teacher = new Teacher();
    teacher.email = 'lars.olofsson@liu.se';
    teacher.password = 'Olofärbäst9';
    teacher.firstName = 'Lars';
    teacher.lastName = 'Olofsson';

    const course = new Course();
    course.courseId = 'TDDD97';
    course.courseName = 'Webbprogrammering';
    course.courseLink = 'https://www.ida.liu.se/~TDDD97/';
    course.teacher = teacher;
    course.university = university;

    const education = new Education();
    education.id = 'd23';
    education.educationName = 'Mjukvaruteknik';
    education.symbol = 'U';
    education.university = university;
    education.Students = [];

    const courseEducation = new CourseEducations();
    courseEducation.courseId = course.courseId;
    courseEducation.educationId = education.id;
    courseEducation.course = course;
    courseEducation.education = education;
    education.courseConnection = [courseEducation];

    const period = new Period();
    period.value = 1;

    const coursePeriod = new CoursePeriods();
    coursePeriod.course = course;
    coursePeriod.period = period;
    coursePeriod.courseId = course.courseId;
    coursePeriod.periodValue = period.value;
    period.courseConnection = [coursePeriod];

    const mainArea = new MainArea();
    mainArea.type = 'Datavetenskap';

    const courseMainArea = new CourseMainAreas();
    courseMainArea.course = course;
    courseMainArea.mainArea = mainArea;
    courseMainArea.courseId = course.courseId;
    courseMainArea.type = mainArea.type;
    mainArea.courseConnection = [courseMainArea];

    const startingYear = new StartingYear();
    startingYear.startingYear = 2019;

    const courseStartingYear = new CourseStartingYears();
    courseStartingYear.course = course;
    courseStartingYear.year = startingYear;
    courseStartingYear.courseId = course.courseId;
    courseStartingYear.yearTaught = startingYear.startingYear;
    courseStartingYear.hp = 6;
    courseStartingYear.level = 'A1X';
    courseStartingYear.schemaBlock = 'A';
    startingYear.courseToStartingYear = [courseStartingYear];

    universityRepository.findOneByOrFail.mockReturnValue(university);
    teacherRepository.findOne.mockReturnValue(teacher);

    courseEducationsRepository.findOne.mockReturnValue(null);
    courseEducationsRepository.save.mockReturnValue(courseEducation);

    coursePeriodsRepository.findOne.mockReturnValue(null);
    coursePeriodsRepository.save.mockReturnValue(coursePeriod);

    courseMainAreasRepository.findOne.mockReturnValue(null);
    courseMainAreasRepository.save.mockReturnValue(courseMainArea);

    courseStartingYearsRepository.findOne.mockReturnValue(null);
    courseStartingYearsRepository.save.mockReturnValue(courseStartingYear);

    course.courseToStartingYear = [courseStartingYear];
    course.educationConnection = [courseEducation];
    course.mainAreaConnection = [courseMainArea];
    course.periodConnection = [coursePeriod];

    courseRepository.save.mockReturnValue(course);
    courseRepository.create.mockReturnValue(course);

    const newCourse = await courseService.createCourse(
      {
        teacherEmail: teacher.email,
        universityName: university.universityName,
        courseId: course.courseId,
        courseName: course.courseName,
        courseLink: course.courseLink,
      },
      [
        {
          courseId: course.courseId,
          educationId: education.id,
        },
      ],
      [{ courseId: course.courseId, periodValue: period.value }],
      [{ courseId: course.courseId, type: mainArea.type }],
      [
        {
          courseId: course.courseId,
          yearTaught: startingYear.startingYear,
          hp: courseStartingYear.hp,
          level: courseStartingYear.level,
          schemaBlock: courseStartingYear.schemaBlock,
        },
      ],
    );

    expect(courseRepository.create).toHaveBeenCalledTimes(1);
    expect(newCourse).toEqual(course);
  });

  test('should throw an error when creating a duplicate course', async () => {});
});
