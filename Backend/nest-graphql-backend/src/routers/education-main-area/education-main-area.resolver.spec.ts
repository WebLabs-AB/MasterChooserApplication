import { Test, TestingModule } from '@nestjs/testing';
import { EducationMainAreaResolver } from './education-main-area.resolver';

describe('EducationMainAreaResolver', () => {
  let resolver: EducationMainAreaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationMainAreaResolver],
    }).compile();

    resolver = module.get<EducationMainAreaResolver>(EducationMainAreaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
