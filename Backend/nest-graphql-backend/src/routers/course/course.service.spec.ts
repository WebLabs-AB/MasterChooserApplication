import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { Repository } from 'typeorm';
import {
  Course,
  CourseMainArea,
  CoursePeriod,
  CourseStartingYear,
  Education,
  EducationCourse,
  MainArea,
  Period,
  StartingYear,
  Student,
  Teacher,
  University,
} from 'src/entities';
import { StudentService } from '../student/student.service';
import { UniversityService } from '../university/university.service';
import { EducationService } from '../education/education.service';
import { TeacherService } from '../teacher/teacher.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EducationCourseService } from '../education-course/education-course.service';
import { CoursePeriodService } from '../course-period/course-period.service';
import { CourseMainAreaService } from '../course-main-area/course-main-area.service';
import { CourseStartingYearService } from '../course-starting-year/course-starting-year.service';
import { MainAreaService } from '../main-area/main-area.service';

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

const educationCourseRepository: MockType<Repository<EducationCourse>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const coursePeriodRepository: MockType<Repository<CoursePeriod>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const courseMainAreaRepository: MockType<Repository<CourseMainArea>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const courseStartingYearRepository: MockType<Repository<CourseStartingYear>> = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

const mainAreaRepository: MockType<Repository<MainArea>> = {
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
      EducationCourseService,
      {
        provide: getRepositoryToken(EducationCourse),
        useValue: educationCourseRepository,
      },
      CoursePeriodService,
      {
        provide: getRepositoryToken(CoursePeriod),
        useValue: coursePeriodRepository,
      },
      CourseMainAreaService,
      {
        provide: getRepositoryToken(CourseMainArea),
        useValue: courseMainAreaRepository,
      },
      CourseStartingYearService,
      {
        provide: getRepositoryToken(CourseStartingYear),
        useValue: courseStartingYearRepository,
      },
      MainAreaService,
      {
        provide: getRepositoryToken(MainArea),
        useValue: mainAreaRepository,
      },
    ],
  }).compile();

  courseService = module.get(CourseService);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('CourseService', () => {
  test('should be defined', () => {
    expect(courseService).toBeDefined();
  });
});

describe('Test findall func', () => {
  test('should retrieve all courses', async () => {
    const university = new University();
    university.name = 'LIU';

    const teacher = new Teacher();
    teacher.email = 'lars.olofsson@liu.se';
    teacher.password = 'Olofärbäst9';
    teacher.firstName = 'Lars';
    teacher.lastName = 'Olofsson';

    const course = new Course();
    course.courseId = 'TDDD97';
    course.name = 'Webbprogrammering';
    course.hp = 6;
    course.teacher = teacher;

    const education = new Education();
    education.name = 'Mjukvaruteknik';
    education.symbol = 'U';
    education.university = university;
    education.Students = [];

    const courseEducation = new EducationCourse();
    courseEducation.courseId = course.courseId;
    courseEducation.educationId = education.educationId;
    courseEducation.course = course;
    courseEducation.education = education;
    education.courseBelongsToEducation = [courseEducation];

    const period = new Period();
    period.value = 1;

    const coursePeriod = new CoursePeriod();
    coursePeriod.course = course;
    coursePeriod.period = period;
    coursePeriod.courseId = course.courseId;
    coursePeriod.periodValue = period.value;
    period.courseBelongsToPeriod = [coursePeriod];

    const mainArea = new MainArea();
    mainArea.name = 'Datavetenskap';

    const courseMainArea = new CourseMainArea();
    courseMainArea.course = course;
    courseMainArea.mainArea = mainArea;
    courseMainArea.courseId = course.courseId;
    courseMainArea.mainAreaName = mainArea.name;
    mainArea.courseBelongsToMainArea = [courseMainArea];

    const startingYear = new StartingYear();
    startingYear.year = 2019;

    const courseStartingYear = new CourseStartingYear();
    courseStartingYear.course = course;
    courseStartingYear.startingYear = startingYear;
    courseStartingYear.courseId = course.courseId;
    courseStartingYear.startYear = startingYear.year;
    // courseStartingYear.hp = 6; Should there be a HP, investigate.
    courseStartingYear.level = 2; // TEMPORARY CHANGE TO STRING LATER.
    courseStartingYear.schemaBlock = 1; // TEMPORARY CHANGE TO STRING TOO.

    startingYear.courseBelongsToStartingYear = [courseStartingYear];

    universityRepository.findOneByOrFail.mockReturnValue(university);
    teacherRepository.findOne.mockReturnValue(teacher);

    educationCourseRepository.findOne.mockReturnValue(null);
    educationCourseRepository.save.mockReturnValue(courseEducation);

    coursePeriodRepository.findOne.mockReturnValue(null);
    coursePeriodRepository.save.mockReturnValue(coursePeriod);

    courseMainAreaRepository.findOne.mockReturnValue(null);
    courseMainAreaRepository.save.mockReturnValue(courseMainArea);

    courseStartingYearRepository.findOne.mockReturnValue(null);
    courseStartingYearRepository.save.mockReturnValue(courseStartingYear);

    course.courseBelongsToStartingYear = [courseStartingYear];
    course.courseBelongsToEducation = [courseEducation];
    course.courseBelongsToMainArea = [courseMainArea];
    course.courseBelongsToPeriod = [coursePeriod];

    courseRepository.find.mockReturnValue([course]);

    const allCourses = await courseService.findAll();
    expect(allCourses).toEqual([course]);
  });
});
