import { Test, TestingModule } from '@nestjs/testing';
import { StartingYearResolver } from './starting-year.resolver';

describe('StartingYearResolver', () => {
  let resolver: StartingYearResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartingYearResolver],
    }).compile();

    resolver = module.get<StartingYearResolver>(StartingYearResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
