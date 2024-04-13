import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileResolver } from './master-profile.resolver';

describe('MasterProfileResolver', () => {
  let resolver: MasterProfileResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProfileResolver],
    }).compile();

    resolver = module.get<MasterProfileResolver>(MasterProfileResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
