import { Test, TestingModule } from '@nestjs/testing';
import { Education } from 'src/entities/NormalTypes/Education.entity';
import { Student } from 'src/entities/NormalTypes/Student.entity';
import { University } from 'src/entities/NormalTypes/University.entity';

import { CreateUniversityInput } from 'src/inputTypes/create-university.input';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

describe('StudentResolver', () => {
  let studentResolver: StudentResolver;

  const mockStudentEmail = 'erikbirgersson98@gmail.com';
  const mockStudent1 = {
    email: mockStudentEmail,
    password: 'Brummer98',
    startingYear: 2019,
    universityName: 'Chalmers',
    educationName: 'Datateknik',
  };

  const mockStudent2 = {
    email: 'erikbirgersson@live.se',
    password: 'Brummer',
    startingYear: 2019,
    universityName: 'Linköpings universitet',
    educationName: 'Datateknik',
  };

  function mockGetUniversity(universityName: string): University {
    const university = new University();
    university.universityName = universityName;
    return university;
  }

  function mockGetEducation(
    educationName: string,
    universityName: string,
  ): Education {
    const university = new University();
    university.universityName = universityName;

    const education = new Education();
    education.educationName = educationName;
    education.university = university;
    education.symbol = 'D';
    return education;
  }

  function mockFindOne(email: string): Student {
    const university = new University();
    university.universityName = mockStudent1.universityName;

    const education = new Education();
    education.educationName = mockStudent1.educationName;

    const student = new Student();
    student.email = email;
    student.password = mockStudent1.password;
    student.startingYear = mockStudent1.startingYear;
    student.education = education;
    student.university = university;
    return student;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentResolver,
        {
          provide: StudentService,
          useFactory: () => ({
            createRegularuser: jest.fn(
              (createUniversityInput: CreateUniversityInput) => ({
                ...createUniversityInput,
              }),
            ),
            findAll: jest.fn(() => [mockStudent1, mockStudent2]),
            findOne: jest.fn((email: string) => mockFindOne(email)),
            getUniversity: jest.fn((universityName: string) =>
              mockGetUniversity(universityName),
            ),
            getEducation: jest.fn(
              (educationName: string, universityName: string) =>
                mockGetEducation(educationName, universityName),
            ),
          }),
        },
      ],
    }).compile();

    studentResolver = module.get<StudentResolver>(StudentResolver);
  });

  describe('RegularuserResolver', () => {
    it('should be defined', () => {
      expect(studentResolver).toBeDefined();
    });

    it('should find and return a list of students', async () => {
      const university = new University();
      university.universityName = mockStudent2.universityName;

      const education = new Education();
      education.educationName = mockStudent2.educationName;

      const student = new Student();
      student.email = mockStudent2.email;
      student.password = mockStudent2.password;
      student.startingYear = mockStudent2.startingYear;
      student.education = education;
      student.university = university;

      const regularusersList = await studentResolver.students();
      expect(regularusersList[0]).toEqual(student);
    });

    it('should find a specific student', async () => {
      const regularuser = await studentResolver.getStudent(mockStudentEmail);
      expect(regularuser).toEqual(mockStudent1);
    });

    it('should create a new student', async () => {
      const newRegularuser = await studentResolver.createNewRegularuser(
        mockStudent1,
      );
      expect(newRegularuser).toEqual(mockStudent1);
    });

    it('should find what university a student goes to', async () => {
      const university = await studentResolver.university({
        email: mockStudentEmail,
        password: 'Brummer98',
        startingYear: 2019,
        university: new University(),
        education: new Education(),
        createdAt: undefined,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      });
      expect(university).toEqual({ universityName: 'Chalmers' });
    });

    it('should find what education a regularuser goes to', async () => {
      const newUniversity = new University();
      newUniversity.universityName = 'Chalmers';

      const newEducation = new Education();
      newEducation.educationName = 'Datateknik';

      const education = await studentResolver.education({
        email: mockStudentEmail,
        password: 'Brummer98',
        startingYear: 2019,
        university: new University(),
        education: new Education(),
        createdAt: undefined,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Student> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      });
      expect(education).toEqual({
        educationName: 'Datateknik',
        Symbol: 'D',
        universityName: 'Chalmers',
      });
    });
  });
});
