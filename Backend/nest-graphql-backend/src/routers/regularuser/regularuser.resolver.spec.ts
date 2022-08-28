import { Test, TestingModule } from '@nestjs/testing';
import { Education } from 'src/entities/NormalTypes/Education.entity';
import { RegularUser } from 'src/entities/NormalTypes/RegularUser.entity';
import { University } from 'src/entities/NormalTypes/University.entity';

import { CreateUniversityInput } from 'src/inputTypes/create-university.input';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { RegularuserResolver } from './regularuser.resolver';
import { RegularuserService } from './regularuser.service';

describe('EducationResolver', () => {
  let regularuserResolver: RegularuserResolver;

  const mockUserEmail = 'erikbirgersson98@gmail.com';
  const mockUser1 = {
    email: mockUserEmail,
    password: 'Brummer98',
    startingYear: 2019,
    universityName: 'Chalmers',
    educationName: 'Datateknik',
  };

  const mockUser2 = {
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

  function mockGetEducation(educationName: string): University {
    const education = new Education();
    education.educationName = educationName;
    return education;
  }

  function mockFindOne(email: string): RegularUser {
    const user = new RegularUser();
    user.email = email;
    user.password = 'Brummer98';
    user.startingYear = 2019;
    user.universityName = 'Chalmers';
    user.educationName = 'Datateknik';
    return user;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegularuserResolver,
        {
          provide: RegularuserService,
          useFactory: () => ({
            createRegularuser: jest.fn(
              (createUniversityInput: CreateUniversityInput) => ({
                ...createUniversityInput,
              }),
            ),
            findAll: jest.fn(() => [mockUser1, mockUser2]),
            findOne: jest.fn((email: string) => mockFindOne(email)),
            getUniversity: jest.fn((universityName: string) =>
              mockGetUniversity(universityName),
            ),
            getEducation: jest.fn((educationName: string) =>
              mockGetEducation(educationName),
            ),
          }),
        },
      ],
    }).compile();

    regularuserResolver = module.get<RegularuserResolver>(RegularuserResolver);
  });

  describe('RegularuserResolver', () => {
    it('should be defined', () => {
      expect(regularuserResolver).toBeDefined();
    });

    it('should find and return a list of universities', async () => {
      const regularusersList = await regularuserResolver.regularusers();
      expect(regularusersList).toContainEqual(mockUser2);
    });

    it('should find a specific regularuser', async () => {
      const regularuser = await regularuserResolver.getRegularuser(
        mockUserEmail,
      );
      expect(regularuser).toEqual(mockUser1);
    });

    it('should create a new regularuser', async () => {
      const newRegularuser = await regularuserResolver.createNewRegularuser(
        mockUser1,
      );
      expect(newRegularuser).toEqual(mockUser1);
    });

    it('should find what university a regularuser goes to', async () => {
      const university = await regularuserResolver.university({
        email: mockUserEmail,
        password: 'Brummer98',
        startingYear: 2019,
        universityName: 'Chalmers',
        educationName: 'Datateknik',
        university: new University(),
        education: new Education(),
        createdAt: undefined,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      });
      expect(university).toEqual({ universityName: 'Chalmers' });
    });

    it('should find what education a regularuser goes to', async () => {
      const education = await regularuserResolver.education({
        email: mockUserEmail,
        password: 'Brummer98',
        startingYear: 2019,
        universityName: 'Chalmers',
        educationName: 'Datateknik',
        university: new University(),
        education: new Education(),
        createdAt: undefined,
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<RegularUser> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      });
      expect(education).toEqual({ educationName: 'Datateknik' });
    });
  });
});
