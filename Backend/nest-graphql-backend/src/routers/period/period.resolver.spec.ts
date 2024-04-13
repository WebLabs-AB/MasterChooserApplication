import { Test, TestingModule } from '@nestjs/testing';
import { PeriodResolver } from './period.resolver';

describe('PeriodResolver', () => {
  let resolver: PeriodResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodResolver],
    }).compile();

    resolver = module.get<PeriodResolver>(PeriodResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
