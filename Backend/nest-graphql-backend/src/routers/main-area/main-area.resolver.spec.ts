import { Test, TestingModule } from '@nestjs/testing';
import { MainAreaResolver } from './main-area.resolver';

describe('MainAreaResolver', () => {
  let resolver: MainAreaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainAreaResolver],
    }).compile();

    resolver = module.get<MainAreaResolver>(MainAreaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
