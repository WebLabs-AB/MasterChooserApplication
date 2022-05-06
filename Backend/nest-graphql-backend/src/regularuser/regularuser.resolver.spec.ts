import { Test, TestingModule } from '@nestjs/testing';
import { RegularuserResolver } from './regularuser.resolver';

describe('RegularuserResolver', () => {
  let resolver: RegularuserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegularuserResolver],
    }).compile();

    resolver = module.get<RegularuserResolver>(RegularuserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
