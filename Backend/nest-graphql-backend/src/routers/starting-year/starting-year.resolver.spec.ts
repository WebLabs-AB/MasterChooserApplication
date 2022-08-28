import { Test, TestingModule } from '@nestjs/testing';
import { CreateStartingYearInput } from 'src/inputTypes/create-startingYear.input';
import { StartingYearResolver } from './starting-year.resolver';
import { StartingYearService } from './starting-year.service';

describe('EducationResolver', () => {
  let startingYearResolver: StartingYearResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StartingYearResolver,
        {
          provide: StartingYearService,
          useFactory: () => ({
            createStartingYear: jest.fn(
              (createStartingYearInput: CreateStartingYearInput) => ({
                ...createStartingYearInput,
              }),
            ),
            findAll: jest.fn(() => [
              {
                startingYear: 2019,
              },

              {
                startingYear: 2020,
              },
            ]),
          }),
        },
      ],
    }).compile();

    startingYearResolver =
      module.get<StartingYearResolver>(StartingYearResolver);
  });

  describe('StartingYearResolver', () => {
    it('should be defined', () => {
      expect(startingYearResolver).toBeDefined();
    });

    it('should create and return a starting year', async () => {
      const startingYear = await startingYearResolver.createNewStartingYear({
        startingYear: 2019,
      });
      expect(startingYear).toEqual({ startingYear: 2019 });
    });

    it('should find and return a list of starting-years', async () => {
      const startingYearsList = await startingYearResolver.startingYears();
      expect(startingYearsList).toContainEqual({ startingYear: 2019 });
    });
  });
});
