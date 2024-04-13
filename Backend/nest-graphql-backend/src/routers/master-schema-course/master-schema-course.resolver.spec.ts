import { Test, TestingModule } from '@nestjs/testing';
import { MasterSchemaCourseResolver } from './master-schema-course.resolver';

describe('MasterSchemaCourseResolver', () => {
  let resolver: MasterSchemaCourseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterSchemaCourseResolver],
    }).compile();

    resolver = module.get<MasterSchemaCourseResolver>(MasterSchemaCourseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
