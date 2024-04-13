import { Test, TestingModule } from '@nestjs/testing';
import { CoursePeriodResolver } from './course-period.resolver';

describe('CoursePeriodResolver', () => {
  let resolver: CoursePeriodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursePeriodResolver],
    }).compile();

    resolver = module.get<CoursePeriodResolver>(CoursePeriodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
