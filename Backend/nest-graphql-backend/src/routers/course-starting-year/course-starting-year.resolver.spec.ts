import { Test, TestingModule } from '@nestjs/testing';
import { CourseStartingYearResolver } from './course-starting-year.resolver';

describe('CourseStartingYearResolver', () => {
  let resolver: CourseStartingYearResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseStartingYearResolver],
    }).compile();

    resolver = module.get<CourseStartingYearResolver>(CourseStartingYearResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
