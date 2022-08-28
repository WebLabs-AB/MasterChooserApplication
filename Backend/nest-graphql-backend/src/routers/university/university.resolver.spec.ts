import { Test, TestingModule } from '@nestjs/testing';
import { University } from 'src/entities/NormalTypes/University.entity';

import { CreateUniversityInput } from 'src/inputTypes/create-university.input';
import { UniversityResolver } from './university.resolver';
import { UniversityService } from './university.service';

describe('EducationResolver', () => {
  let universityResolver: UniversityResolver;

  const mockUniversity = {
    universityName: 'Chalmers',
  };

  function mockFindOne(universityName: string): University {
    const university = new University();
    university.universityName = universityName;
    return university;
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniversityResolver,
        {
          provide: UniversityService,
          useFactory: () => ({
            createUniversity: jest.fn(
              (createUniversityInput: CreateUniversityInput) => ({
                ...createUniversityInput,
              }),
            ),
            findAll: jest.fn(() => [
              {
                universityName: 'Chalmers',
              },

              {
                universityName: 'Linköpings universitet',
              },
            ]),
            findOne: jest.fn((universityName: string) =>
              mockFindOne(universityName),
            ),
          }),
        },
      ],
    }).compile();

    universityResolver = module.get<UniversityResolver>(UniversityResolver);
  });

  describe('UniversityResolver', () => {
    it('should be defined', () => {
      expect(universityResolver).toBeDefined();
    });

    it('should find and return a list of universities', async () => {
      const universityList = await universityResolver.universities();
      expect(universityList).toContainEqual({
        universityName: 'Chalmers',
      });
    });

    it('should find a specific university', async () => {
      const university = await universityResolver.findOne(
        'Varbergs universitet',
      );
      expect(university).toEqual({
        universityName: 'Varbergs universitet',
      });
    });

    it('should create a new university', async () => {
      const newUniversity = await universityResolver.createNewUniversity(
        mockUniversity,
      );
      expect(newUniversity).toEqual(mockUniversity);
    });
  });
});
