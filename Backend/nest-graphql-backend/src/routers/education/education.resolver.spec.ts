import { Test, TestingModule } from '@nestjs/testing';
import { Education } from 'src/entities/NormalTypes/Education.entity';
import { University } from 'src/entities/NormalTypes/University.entity';
import { CreateEducationInput } from 'src/inputTypes/create-education.input';
import { RemoveOptions, SaveOptions } from 'typeorm';
import { EducationResolver } from './education.resolver';
import { EducationService } from './education.service';

describe('EducationResolver', () => {
  let educationResolver: EducationResolver;

  function findEducationFromUniversity(universityName: string): Education {
    const education = new Education();
    education.educationName = 'Datateknik';
    education.symbol = 'D';
    education.universityName = universityName;
    return education;
  }

  function getUniversity(universityName: string): University {
    const education = new University();
    education.universityName = universityName;
    return education;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EducationResolver,
        {
          provide: EducationService,
          useFactory: () => ({
            createEducation: jest.fn(
              (createEducationInput: CreateEducationInput) => ({
                ...createEducationInput,
              }),
            ),
            findAll: jest.fn(() => [
              {
                educationName: 'Datateknik',
                symbol: 'D',
                universityName: 'Chalmers',
              },

              {
                educationName: 'Mjukvaruteknik',
                symbol: 'U',
                universityName: 'Linköpings universitet',
              },
            ]),
            findEducationFromUniversity: jest.fn((universityName: string) =>
              findEducationFromUniversity(universityName),
            ),
            getUniversity: jest.fn((universityName: string) =>
              getUniversity(universityName),
            ),
          }),
        },
      ],
    }).compile();

    educationResolver = module.get<EducationResolver>(EducationResolver);
  });

  describe('EducationResolver', () => {
    it('should be defined', () => {
      expect(educationResolver).toBeDefined();
    });

    it('should create and return a new education', async () => {
      const newEducation = await educationResolver.createNewEducation({
        educationName: 'Datateknik',
        symbol: 'D',
        universityName: 'Chalmers',
      });

      expect(newEducation).toEqual({
        educationName: 'Datateknik',
        symbol: 'D',
        universityName: 'Chalmers',
      });
    });

    it('should find and return a list of educations', async () => {
      const educationsList = await educationResolver.educations();
      expect(educationsList).toContainEqual({
        educationName: 'Datateknik',
        symbol: 'D',
        universityName: 'Chalmers',
      });
    });

    it('returns all educations that belong to a specific university', async () => {
      const educationsList = await educationResolver.educationFromUniversity(
        'Chalmers',
      );
      expect(educationsList).toEqual({
        educationName: 'Datateknik',
        symbol: 'D',
        universityName: 'Chalmers',
      });
    });

    it('Find out what univiersity the education belongs to', async () => {
      const university = await educationResolver.university({
        educationName: 'Datateknik',
        symbol: 'D',
        universityName: 'Chalmers',
        university: new University(),
        hasId: function (): boolean {
          throw new Error('Function not implemented.');
        },
        save: function (options?: SaveOptions): Promise<Education> {
          throw new Error('Function not implemented.');
        },
        remove: function (options?: RemoveOptions): Promise<Education> {
          throw new Error('Function not implemented.');
        },
        softRemove: function (options?: SaveOptions): Promise<Education> {
          throw new Error('Function not implemented.');
        },
        recover: function (options?: SaveOptions): Promise<Education> {
          throw new Error('Function not implemented.');
        },
        reload: function (): Promise<void> {
          throw new Error('Function not implemented.');
        },
      });

      expect(university).toEqual({
        universityName: 'Chalmers',
      });
    });
  });
});
